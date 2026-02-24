const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create Student
router.post('/', studentController.createStudent);

// Get All Students
router.get('/', studentController.getAllStudents);

// Get Students By School
router.get('/school/:schoolId', studentController.getStudentsBySchool);

// Get Student By ID
router.get('/:studentId', studentController.getStudentById);

// Update Student
router.put('/:studentId', studentController.updateStudent);

// Delete Student
router.delete('/:studentId', studentController.deleteStudent);

module.exports = router;