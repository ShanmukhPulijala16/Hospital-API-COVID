const ReportModel = require("../models/ReportModel");

const statusControllers = {
    reportsBasedOnStatus: async (req, res) => {
        let status = req.params.status;
        if (typeof status !== 'string') {
            status = status.toString();
        }
        const statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
        if (!statusArray.includes(status)) {
            return res.status(400).json({ message: "Invalid status!", statusOptions: "['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']" });
        }
        const reportsArray = await ReportModel.find({});
        let reportsBasedOnStatus = reportsArray.filter((report) => {
            return report.status === status
        });
        res.status(200).json({ statusOptions: "['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']", reportsBasedOnStatus });
    }
};

module.exports = statusControllers;