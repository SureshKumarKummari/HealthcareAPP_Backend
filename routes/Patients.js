const express = require('express');
const router = express.Router();
const {
createPatient,
getPatients,
getPatientById,
updatePatient,
deletePatient
} = require('../controllers/patientController'); 

const authenticate = require('../middleware/auth'); 

router.post('/', authenticate, createPatient);


router.get('/', authenticate, getPatients);


router.get('/:id', authenticate, getPatientById);

router.put('/:id', authenticate, updatePatient);

router.delete('/:id', authenticate, deletePatient);

module.exports = router;