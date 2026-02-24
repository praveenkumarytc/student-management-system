const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/', teacherController.createTeacher);
router.get('/', teacherController.getAllTeachers);
router.get('/school/:schoolId', teacherController.getTeachersBySchool);
router.get('/:teacherId', teacherController.getTeacherById);
router.put('/:teacherId', teacherController.updateTeacher);
router.delete('/:teacherId', teacherController.deleteTeacher);

module.exports = router;