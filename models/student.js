const db = require("../utils/database_utils");

class Student {
  // Create Student
  static async create(data) {
    const {
      school_id = null,
      name,
      classes,
      roll_number,
      dob = null,
    } = data;

    const sql = `
      INSERT INTO students
      (school_id, name, classes, roll_number, dob, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(6), NOW(6))
    `;

    const [result] = await db.query(
      sql,
      [
        school_id,
        name,
        classes,
        roll_number,
        dob,
      ],
    );

    return result.insertId;
  }

  // Get All Students
  static async findAll() {
    const sql = `
    SELECT 
      s.id AS student_id,
      s.school_id,
      s.name,
      s.classes,
      s.roll_number,
      s.dob,
      s.created_at,
      s.updated_at,
      t.id AS teacher_id,
      t.name AS teacher_name,
      t.subject AS teacher_subject
    FROM students s
    LEFT JOIN student_teacher st ON s.id = st.student_id
    LEFT JOIN teachers t ON st.teacher_id = t.id
    ORDER BY s.id DESC
  `;

    const [rows] = await db.query(sql);

    console.log('rows:', rows);

    // Group teachers under each student
    const studentsMap = {};

    for (const row of rows) {
      if (
        !studentsMap[row.student_id]
      ) {
        studentsMap[row.student_id] = {
          id: row.student_id,
          school_id: row.school_id,
          name: row.name,
          classes: row.classes,
          roll_number: row.roll_number,
          dob: row.dob,
          created_at: row.created_at,
          updated_at: row.updated_at,
          teachers: [],
        };
      }

      if (row.teacher_id) {
        studentsMap[
          row.student_id
        ].teachers.push({
          id: row.teacher_id,
          name: row.teacher_name,
          subject: row.teacher_subject,
        });
      }
    }

    return Object.values(studentsMap);
  }

  // Get Students By School
  static async findBySchool(school_id) {
    const sql = `
      SELECT * FROM students
      WHERE school_id = ?
      ORDER BY created_at DESC
    `;

    const [rows] = await db.query(sql, [
      school_id,
    ]);
    return rows;
  }

  // Get Student By ID
  static async findById(id) {
    const sql = `
      SELECT * FROM students
      WHERE id = ?
    `;

    const [rows] = await db.query(sql, [
      id,
    ]);
    return rows[0];
  }

  // Update Student
  static async update(id, data) {
    const {
      school_id,
      name,
      classes,
      roll_number,
      dob,
    } = data;

    const sql = `
      UPDATE students
      SET school_id = ?,
          name = ?,
          classes = ?,
          roll_number = ?,
          dob = ?,
          updated_at = NOW(6)
      WHERE id = ?
    `;

    const [result] = await db.query(
      sql,
      [
        school_id,
        name,
        classes,
        roll_number,
        dob,
        id,
      ],
    );

    return result.affectedRows;
  }

  // Delete Student
  static async delete(id) {
    const sql = `
      DELETE FROM students
      WHERE id = ?
    `;

    const [result] = await db.query(
      sql,
      [id],
    );
    return result.affectedRows;
  }
}

module.exports = Student;
