const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentTeacherController');

router.post('/assign', controller.assignTeacher);
router.get('/student/:studentId', controller.getTeachersByStudent);
router.get('/teacher/:teacherId', controller.getStudentsByTeacher);
router.delete('/remove', controller.removeAssignment);

module.exports = router;