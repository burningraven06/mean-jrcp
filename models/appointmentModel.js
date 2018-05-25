const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
	with_person:  {
		type: String,
		required: true,
  },
	appointment_date: {
		type: Date,
    default: Date.now,
		required: true
  },
  notes:{
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);