const Mapping = require('../models/Mapping');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const errorHandler = require('../utils/errorHandler');

exports.createMapping = async (req, res) => {
const { patient, doctor } = req.body;
if (!patient || !doctor) return errorHandler(res, 400, 'Patient and Doctor are required');
try {
const mapping = new Mapping({ patient, doctor });
await mapping.save();
res.status(201).json(mapping);
} catch (err) {
errorHandler(res, 500, 'Error creating mapping');
}
};

exports.getAllMappings = async (req, res) => {
try {
const mappings = await Mapping.find().populate('patient doctor');
res.json(mappings);
} catch (err) {
errorHandler(res, 500, 'Error fetching mappings');
}
};

exports.getDoctorsByPatient = async (req, res) => {
try {
const mappings = await Mapping.find({ patient: req.params.patient_id }).populate('doctor');
res.json(mappings);
} catch (err) {
errorHandler(res, 500, 'Error fetching patient’s doctors');
}
};

exports.deleteMapping = async (req, res) => {
try {
const mapping = await Mapping.findByIdAndDelete(req.params.id);
if (!mapping) return errorHandler(res, 404, 'Mapping not found');
res.json({ message: 'Mapping deleted' });
} catch (err) {
errorHandler(res, 500, 'Error deleting mapping');
}
};