const express=require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

router.post('/create', patientController.createPatient);
router.post("/triage-visit", patientController.createTriageVisit);
router.get('/get-patient-list', patientController.getPatientList);
router.get('/get-triage-visits', patientController.getTriageVisitList);
router.post('/post-patient-vitals', patientController.postPatientVitals);
router.post('/post-doctor-treatment', patientController.postDoctorTreatment);
module.exports = router;