const express = require('express');
const router = express.Router();
const {
createMapping,
getAllMappings,
getDoctorsByPatient,
deleteMapping
} = require('../controllers/mappingController'); 

const authenticate=require('../middleware/auth');

router.post('/',authenticate, createMapping);


router.get('/',authenticate, getAllMappings);


router.get('/:patient_id',authenticate, getDoctorsByPatient);

router.delete('/:id',authenticate, deleteMapping);

module.exports = router;