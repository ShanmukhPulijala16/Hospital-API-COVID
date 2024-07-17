const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
}, {
    timestamps: true
});

const DoctorModel = mongoose.model('Doctor', doctorSchema);
module.exports = DoctorModel;