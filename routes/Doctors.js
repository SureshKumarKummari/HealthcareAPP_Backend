const express = require('express');
const router = express.Router();
const {
createDoctor,
getDoctors,
getDoctorById,
updateDoctor,
deleteDoctor
} = require('../controllers/doctorController'); 

const authenticate = require('../middleware/auth');

router.post('/',authenticate, createDoctor);


router.get('/',authenticate, getDoctors);


router.get('/:id',authenticate, getDoctorById);

router.put('/:id',authenticate, updateDoctor);

router.delete('/:id',authenticate, deleteDoctor);

module.exports = router;