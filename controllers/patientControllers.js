const DoctorModel = require("../models/DoctorModel");
const PatientModel = require("../models/PatientModel");
const ReportModel = require("../models/ReportModel");

const patientControllers = {
    createReport: async (req, res) => {
        try {
            const patient = await PatientModel.findById(req.params.id);
            if (!patient) {
                return res.status(400).json({ message: "No such patient exists!" });
            }
            const doctor = await DoctorModel.findById(req.user.sub);
            const status = req.body.status;
            if (!status) {
                return res.status(400).json({ message: "Please ensure the 'status' field is included in the request body!", statusOptions: "['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']" });
            }
            const report = await ReportModel.create({
                patient: req.params.id,
                createdByDoctor: req.user.sub,
                status: req.body.status
            });
            // await doctor.updateOne(
            //     { $push: { reports: report._id } }
            // );
            await doctor.reports.push(report._id);
            await doctor.save();
            patient.reports.push(report._id);
            await patient.save();
            return res.status(201).json({ message: "Report created successfully!", statusOptions: "['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']", report });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error!", statusOptions: "['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']" });
        }
    },
    allReports: async (req, res) => {
        try {
            const patient = await PatientModel.findById(req.params.id).populate({
                path: 'reports',
                model: 'Report',
                populate: [
                    {
                        path: 'patient',
                        model: "Patient"
                    },
                    {
                        path: 'createdByDoctor',
                        model: "Doctor"
                    }
                ]
            }).exec();
            return res.status(200).json({ patient });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error!" });
        }
    },
    register: async (req, res) => {
        try {
            const { name, phoneNumber } = req.body;
            if (!name || !phoneNumber) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            const patient = await PatientModel.findOne({ phoneNumber });
            if (patient) {
                return res.status(200).json({ message: "Patient already exists!", patient });
            }
            const patientNew = await PatientModel.create({
                name,
                phoneNumber
            });
            return res.status(201).json({ message: "Patient registered successfully!", patient: patientNew });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error!" });
        }
    },
}

module.exports = patientControllers;