const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
name: { type: String, required: true },
age: Number,
disease: String,
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Patient', PatientSchema);