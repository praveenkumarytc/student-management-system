const StudentTeacher = require('../models/studentTeacher');

// Assign Teacher to Student
const assignTeacher = async (req, res) => {
  try {
    const { student_id, teacher_id } = req.body;

    const id = await StudentTeacher.assign({
      student_id,
      teacher_id
    });

    res.status(201).json({
      message: 'Teacher assigned to student successfully',
      id
    });

  } catch (err) {
    console.error('Error assigning teacher:', err);
    res.status(500).json({
      error: 'Failed to assign teacher',
      details: err.message
    });
  }
};

// Get Teachers of Student
const getTeachersByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const teachers = await StudentTeacher.getTeachersByStudent(studentId);
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Students of Teacher
const getStudentsByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const students = await StudentTeacher.getStudentsByTeacher(teacherId);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove Assignment
const removeAssignment = async (req, res) => {
  try {
    const { student_id, teacher_id } = req.body;

    const affectedRows = await StudentTeacher.remove(student_id, teacher_id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ message: 'Assignment removed successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  assignTeacher,
  getTeachersByStudent,
  getStudentsByTeacher,
  removeAssignment
};