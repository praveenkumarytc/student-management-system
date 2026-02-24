const School = require('../models/school');

// Get All Schools
const getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    res.json(schools);
  } catch (err) {
    console.error('Error fetching schools:', err);
    res.status(500).json({
      error: 'Failed to fetch schools',
      details: err.message
    });
  }
};

// Create School
const createSchool = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, board, address, est_in } = req.body;

    const schoolId = await School.create({
      name,
      board,
      address,
      est_in
    });

    res.status(201).json({
      message: 'School created successfully',
      schoolId: schoolId
    });

  } catch (err) {
    console.error('Error creating school:', err);
    res.status(500).json({
      error: 'Failed to create school',
      details: err.message
    });
  }
};

// Get School By ID
const getSchoolById = async (req, res) => {
  try {
    const schoolId = req.params.schoolId;

    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.json(school);

  } catch (err) {
    console.error('Error fetching school:', err);
    res.status(500).json({
      error: 'Failed to fetch school',
      details: err.message
    });
  }
};

// Update School
const updateSchool = async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const { name, board, address, est_in } = req.body;

    const affectedRows = await School.update(schoolId, {
      name,
      board,
      address,
      est_in
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.json({ message: 'School updated successfully' });

  } catch (err) {
    console.error('Error updating school:', err);
    res.status(500).json({
      error: 'Failed to update school',
      details: err.message
    });
  }
};

// Delete School
const deleteSchool = async (req, res) => {
  try {
    const schoolId = req.params.schoolId;

    const affectedRows = await School.delete(schoolId);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.json({ message: 'School deleted successfully' });

  } catch (err) {
    console.error('Error deleting school:', err);
    res.status(500).json({
      error: 'Failed to delete school',
      details: err.message
    });
  }
};

module.exports = {
  getAllSchools,
  createSchool,
  getSchoolById,
  updateSchool,
  deleteSchool
};