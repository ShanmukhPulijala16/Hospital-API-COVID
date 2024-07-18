# Hospital API for Doctors (COVID-19) with Node.js & MongoDB
This project demonstrates building a Node.js backend with MongoDB for a hospital API. Doctors can register patients, create reports with statuses (Negative, Travelled-Quarantine, etc.), and manage patient data.

## Live Demo
Hosted Link: http://hospitalapi.shanmukhdev.online
Video Walkthrough: Hospital API | Coding Ninjas Skill Test

Project Links
GitHub Repository: https://github.com/ShanmukhPulijala16/HospitalAPI

Features
User Types: Doctors and Patients
Authentication: Secure JWT-based login for doctors
Patient Management:
Register Patients: Add new patients using their phone number. If the patient already exists, the API returns the existing information.
Create Reports: Generate reports after patient checkups.
Report Statuses
Negative
Travelled-Quarantine: Requires quarantine after travel.
Symptoms-Quarantine: Requires quarantine due to symptoms.
Positive-Admit: Requires hospitalization.
Secure Access
JWT authentication ensures secure access for doctors.

API Endpoints
Doctors:
POST /doctors/register: Register a new doctor.
POST /doctors/login: Login for doctors, returning a JWT for secure access to other endpoints.
Patients:
POST /patients/register: Register a new patient using their phone number.
POST /patients/:id/create_report: Create a new report for a specific patient (identified by ID).
GET /patients/:id/all_reports: Retrieve all reports for a specific patient, ordered from oldest to latest.
Reports:
GET /reports/:status: Filter and retrieve all reports based on a specific patient status (Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit).
How to Use
Register as a doctor and log in.
Register patients, create patient reports, and manage report data using Postman or similar tools.
Setup Instructions
Clone the repository:

bash
