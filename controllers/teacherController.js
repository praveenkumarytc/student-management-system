const Teacher = require('../models/teacher');

// Create Teacher
const createTeacher = async (req, res) => {
  try {
    const { school_id, name, subject } = req.body;

    const teacherId = await Teacher.create({
      school_id,
      name,
      subject
    });

    res.status(201).json({
      message: 'Teacher created successfully',
      teacherId: teacherId
    });

  } catch (err) {
    console.error('Error creating teacher:', err);
    res.status(500).json({
      error: 'Failed to create teacher',
      details: err.message
    });
  }
};

// Get All Teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({
      error: 'Failed to fetch teachers',
      details: err.message
    });
  }
};

// Get Teachers By School
const getTeachersBySchool = async (req, res) => {
  try {
    const schoolId = req.params.schoolId;

    const teachers = await Teacher.findBySchool(schoolId);

    res.json(teachers);

  } catch (err) {
    console.error('Error fetching teachers by school:', err);
    res.status(500).json({
      error: 'Failed to fetch teachers',
      details: err.message
    });
  }
};

// Get Teacher By ID
const getTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);

  } catch (err) {
    console.error('Error fetching teacher:', err);
    res.status(500).json({
      error: 'Failed to fetch teacher',
      details: err.message
    });
  }
};

// Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const { school_id, name, subject } = req.body;

    const affectedRows = await Teacher.update(teacherId, {
      school_id,
      name,
      subject
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher updated successfully' });

  } catch (err) {
    console.error('Error updating teacher:', err);
    res.status(500).json({
      error: 'Failed to update teacher',
      details: err.message
    });
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const affectedRows = await Teacher.delete(teacherId);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully' });

  } catch (err) {
    console.error('Error deleting teacher:', err);
    res.status(500).json({
      error: 'Failed to delete teacher',
      details: err.message
    });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeachersBySchool,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};