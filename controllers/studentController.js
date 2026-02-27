const Student = require("../models/student");
const db = require("../utils/database_utils");
const { notifyStudentEvent } = require("../utils/webhook");

const createStudent = async (
  req,
  res,
) => {
  const connection =
    await db.getConnection();

  try {
    const {
      school_id,
      name,
      classes,
      roll_number,
      dob,
      teacher_ids = [],
    } = req.body;

    await connection.beginTransaction();

    // 1️⃣ Create Student
    const studentSql = `
      INSERT INTO students
      (school_id, name, classes, roll_number, dob, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(6), NOW(6))
    `;

    const [studentResult] =
      await connection.query(
        studentSql,
        [
          school_id,
          name,
          classes,
          roll_number,
          dob,
        ],
      );

    const studentId =
      studentResult.insertId;

    // 2️⃣ Assign Multiple Teachers

    console.log(
      "Assigning teachers to student:",
    );
    console.log(teacher_ids);
    if (teacher_ids.length > 0) {
      const assignSql = `
        INSERT INTO student_teacher
        (student_id, teacher_id, created_at, updated_at)
        VALUES (?, ?, NOW(6), NOW(6))
      `;

      for (const teacher_id of teacher_ids) {
        await connection.query(
          assignSql,
          [studentId, teacher_id],
        );
      }
    }

    await connection.commit();
    connection.release();

    const payload = {
      id: studentId,
      school_id,
      name,
      classes,
      roll_number,
      dob,
      teacher_ids,
    };
    notifyStudentEvent("student.created", payload);

    res.status(201).json({
      message:
        "Student created and teachers assigned successfully",
      studentId,
    });
  } catch (err) {
    await connection.rollback();
    connection.release();

    console.error(
      "Error creating student:",
      err,
    );
    res.status(500).json({
      error: "Failed to create student",
      details: err.message,
    });
  }
};

// Get All Students
const getAllStudents = async (
  req,
  res,
) => {
  try {
    const students =
      await Student.findAll();
    res.json(students);
  } catch (err) {
    console.error(
      "Error fetching students:",
      err,
    );
    res.status(500).json({
      error: "Failed to fetch students",
      details: err.message,
    });
  }
};

// Get Students By School
const getStudentsBySchool = async (
  req,
  res,
) => {
  try {
    const schoolId =
      req.params.schoolId;
    const students =
      await Student.findBySchool(
        schoolId,
      );
    res.json(students);
  } catch (err) {
    console.error(
      "Error fetching students:",
      err,
    );
    res.status(500).json({
      error: "Failed to fetch students",
      details: err.message,
    });
  }
};

// Get Student By ID
const getStudentById = async (
  req,
  res,
) => {
  try {
    const studentId =
      req.params.studentId;
    const student =
      await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.json(student);
  } catch (err) {
    console.error(
      "Error fetching student:",
      err,
    );
    res.status(500).json({
      error: "Failed to fetch student",
      details: err.message,
    });
  }
};

const updateStudent = async (
  req,
  res,
) => {
  const connection =
    await db.getConnection();

  try {
    const studentId =
      req.params.studentId;

    const {
      school_id,
      name,
      classes,
      roll_number,
      dob,
      teacher_ids = [],
    } = req.body;

    await connection.beginTransaction();

    // 1️⃣ Update Student Details
    const updateStudentSql = `
      UPDATE students
      SET school_id = ?,
          name = ?,
          classes = ?,
          roll_number = ?,
          dob = ?,
          updated_at = NOW(6)
      WHERE id = ?
    `;

    const [result] =
      await connection.query(
        updateStudentSql,
        [
          school_id,
          name,
          classes,
          roll_number,
          dob,
          studentId,
        ],
      );

    if (result.affectedRows === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        error: "Student not found",
      });
    }

    // 2️⃣ Remove Existing Teacher Assignments
    await connection.query(
      `DELETE FROM student_teacher WHERE student_id = ?`,
      [studentId],
    );

    // 3️⃣ Insert New Teacher Assignments
    if (teacher_ids.length > 0) {
      const assignSql = `
        INSERT INTO student_teacher
        (student_id, teacher_id, created_at, updated_at)
        VALUES (?, ?, NOW(6), NOW(6))
      `;

      for (const teacher_id of teacher_ids) {
        await connection.query(
          assignSql,
          [studentId, teacher_id],
        );
      }
    }

    await connection.commit();
    connection.release();

    notifyStudentEvent("student.updated", {
      id: parseInt(studentId, 10),
      school_id,
      name,
      classes,
      roll_number,
      dob,
      teacher_ids,
    });

    res.json({
      message:
        "Student and teacher assignments updated successfully",
    });
  } catch (err) {
    await connection.rollback();
    connection.release();

    console.error(
      "Error updating student:",
      err,
    );
    res.status(500).json({
      error: "Failed to update student",
      details: err.message,
    });
  }
};

// Delete Student
const deleteStudent = async (
  req,
  res,
) => {
  try {
    const studentId =
      req.params.studentId;

    const affectedRows =
      await Student.delete(studentId);

    if (affectedRows === 0) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    notifyStudentEvent("student.deleted", { id: parseInt(studentId, 10) });

    res.json({
      message:
        "Student deleted successfully",
    });
  } catch (err) {
    console.error(
      "Error deleting student:",
      err,
    );
    res.status(500).json({
      error: "Failed to delete student",
      details: err.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentsBySchool,
  getStudentById,
  updateStudent,
  deleteStudent,
};
