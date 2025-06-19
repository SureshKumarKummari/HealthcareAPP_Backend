const Patient = require('../models/Patient');
const errorHandler = require('../utils/errorHandler');

exports.createPatient = async (req, res) => {
const { name, age, disease } = req.body;
if (!name) return errorHandler(res, 400, 'Patient name is required');
try {
const patient = new Patient({ name, age, disease, user: req.user.id });
await patient.save();
res.status(201).json(patient);
} catch (err) {
errorHandler(res, 500, 'Failed to create patient');
}
};

exports.getPatients = async (req, res) => {
try {
const patients = await Patient.find({ user: req.user.id });
res.json(patients);
} catch (err) {
errorHandler(res, 500, 'Error fetching patients');
}
};

exports.getPatientById = async (req, res) => {
try {
const patient = await Patient.findById(req.params.id);
if (!patient) return errorHandler(res, 404, 'Patient not found');
res.json(patient);
} catch (err) {
errorHandler(res, 500, 'Error fetching patient');
}
};

exports.updatePatient = async (req, res) => {
try {
const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!patient) return errorHandler(res, 404, 'Patient not found');
res.json(patient);
} catch (err) {
errorHandler(res, 500, 'Error updating patient');
}
};

exports.deletePatient = async (req, res) => {
try {
const patient = await Patient.findByIdAndDelete(req.params.id);
if (!patient) return errorHandler(res, 404, 'Patient not found');
res.json({ message: 'Patient deleted' });
} catch (err) {
errorHandler(res, 500, 'Error deleting patient');
}
};