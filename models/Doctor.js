const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
name: { type: String, required: true },
specialization: { type: String },
experience_years: Number
});
module.exports = mongoose.model('Doctor', DoctorSchema);