const mongoose = require('mongoose');
const MappingSchema = new mongoose.Schema({
patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }
});
module.exports = mongoose.model('Mapping', MappingSchema);