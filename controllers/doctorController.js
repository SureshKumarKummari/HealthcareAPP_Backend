const Doctor = require('../models/Doctor');
const errorHandler = require('../utils/errorHandler');

exports.createDoctor = async (req, res) => {
const { name } = req.body;
if (!name) return errorHandler(res, 400, 'Doctor name is required');
try {
const doctor = new Doctor(req.body);
await doctor.save();
res.status(201).json(doctor);
} catch (err) {
errorHandler(res, 500, 'Error creating doctor');
}
};

exports.getDoctors = async (req, res) => {
try {
const doctors = await Doctor.find();
res.json(doctors);
} catch (err) {
errorHandler(res, 500, 'Error fetching doctors');
}
};

exports.getDoctorById = async (req, res) => {
try {
const doctor = await Doctor.findById(req.params.id);
if (!doctor) return errorHandler(res, 404, 'Doctor not found');
res.json(doctor);
} catch (err) {
errorHandler(res, 500, 'Error fetching doctor');
}
};

exports.updateDoctor = async (req, res) => {
try {
const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!doctor) return errorHandler(res, 404, 'Doctor not found');
res.json(doctor);
} catch (err) {
errorHandler(res, 500, 'Error updating doctor');
}
};

exports.deleteDoctor = async (req, res) => {
try {
const doctor = await Doctor.findByIdAndDelete(req.params.id);
if (!doctor) return errorHandler(res, 404, 'Doctor not found');
res.json({ message: 'Doctor deleted' });
} catch (err) {
errorHandler(res, 500, 'Error deleting doctor');
}
};