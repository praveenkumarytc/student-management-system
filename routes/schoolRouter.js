const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/', schoolController.getAllSchools);
router.post('/', schoolController.createSchool);
router.get('/:schoolId', schoolController.getSchoolById);
router.put('/:schoolId', schoolController.updateSchool);
router.delete('/:schoolId', schoolController.deleteSchool);

module.exports = router;