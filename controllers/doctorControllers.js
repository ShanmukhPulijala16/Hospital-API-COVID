const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DoctorModel = require('../models/DoctorModel');

const doctorControllers = {
    login: async (req, res) => {
        try {
            let { username, password } = req.body;
            const doctor = await DoctorModel.findOne({ username });
            if (!doctor) {
                return res.status(401).json({ message: "No such doctor found!" });
            }
            if (typeof password !== 'string') {
                password = password.toString();
            }
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials!" });
            }
            const payload = {
                sub: doctor.id,
                name: doctor.username
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60
            });
            return res.status(201).json({ message1: "Logged in successfully!", message2: "Token is sent and stored in cookie!" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error!" });
        }
    },
    register: async (req, res) => {
        try {
            let { username, password } = req.body;
            if (typeof password !== 'string') {
                password = password.toString();
            }
            const doctor = await DoctorModel.findOne({ username });
            if (doctor) {
                return res.status(200).json({ message: "Doctor already exists!", doctor });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const doctorNew = await DoctorModel.create({
                username,
                password: hashedPassword
            });
            return res.status(201).json({ message: "Doctor sucessfully registered!", doctor: doctorNew });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error!" });
        }
    },
    logout: (req, res) => {
        // Clear the JWT cookie
        res.clearCookie('jwt').json({ message: 'Logged out successfully!' });

        // Send a response indicating successful logout
        // res.json({ message: 'Logged out successfully!' });
    }
};

module.exports = doctorControllers;