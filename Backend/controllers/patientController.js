const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPatient = asyncHandler(async (req, res) => {
  try {
    const { ...patientData } = req.body;

    // Check if the patient already exists based on email or idNumber
    const existingPatient = await prisma.patient.findFirst({
      where: {
        OR: [{ email: patientData.email }, { idNumber: patientData.idNumber }],
      },
    });

    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    // Create a new patient
    const newPatient = await prisma.patient.create({
      data: patientData,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Patient created successfully",
        data: newPatient,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the patient." });
  }
});

const createTriageVisit = asyncHandler(async (req, res) => {
    try {
        const {
            patientId,
            vitals = {},
            symptoms = {},
          
        } = req.body;

        // Check if the patient exists
        const existingPatient = await prisma.patient.findUnique({
            where: { id: patientId },
        });

        if (!existingPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Create a new triage visit
        const newVisit = await prisma.triage.create({
            data: {
                vitals: vitals, // Pass the vitals object
                symptoms: symptoms, // Pass the symptoms object               
                patient: { connect: { id: patientId } }, // Connect to the existing patient
            }
        });

        res.status(201).json({
            success: true,
            message: "Triage visit created successfully",
            data: newVisit,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the triage visit." });
    }
});


const getPatientList = asyncHandler(async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      select: {
       id: true,
       firstName: true,
       lastName: true,
       middleName: true,
       gender: true,
       email: true,
       patientType: true,
       insurance: true,
        idNumber: true,
        phoneNumber: true,
        createdAt: true,
      },
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// triage visit list
const getTriageVisitList = asyncHandler(async (req, res) => {
    try {
      const triageVisits = await prisma.triage.findMany({
        include: {
          patient: { // Use the relation field defined in the Triage model
            select: {
              id: true,
              firstName: true,
              lastName: true,
              middleName: true,
              gender: true,
              email: true,
              patientType: true,
              insurance: true,
              idNumber: true,
              phoneNumber: true,
              createdAt: true,
            },
          },
        },
      });
  
      // Format the response to include relevant fields
      const formattedTriageVisits = triageVisits.map(visit => ({
        id: visit.id,
        patientId: visit.patientId,
        vitals: visit.vitals,
        symptoms: visit.symptoms,
        doctorNotes: visit.doctorNotes,
        diagnosis: visit.diagnosis,
        recommendedTreatment: visit.recommendedTreatment,
        additionalNotes: visit.additionalNotes,
        consultationDate: visit.consultationDate,
        createdAt: visit.createdAt,
        patient: visit.patient, // Include patient details directly
      }));
  
      res.json(formattedTriageVisits);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// New method to update vitals in triage visit
const postDoctorTreatment = asyncHandler(async (req, res) => {
    try {
      const { triageId, vitals, symptoms, doctorNotes, diagnosis, recommendedTreatment, additionalNotes, consultationDate  } = req.body;
  
      // Check if the triage visit exists
      const existingTriage = await prisma.triage.findUnique({
        where: { id: triageId },
      });
  
      if (!existingTriage) {
        return res.status(404).json({ message: "Patient visit not found" });
      }
  
      // Update the triage visit with the provided vitals
      const updatedTriage = await prisma.triage.update({
        where: { id: triageId },
        data: { vitals: vitals,
                 symptoms: symptoms,
                 doctorNotes: doctorNotes,
                 diagnosis: diagnosis,
                 recommendedTreatment: recommendedTreatment,
                 additionalNotes: additionalNotes,
                 consultationDate: consultationDate,
                //  followUpRequired: followUpRequired,
                //  doctor: { connect: { id: doctorId } },


         },
      });
  
      res.status(200).json({
        success: true,
        message: "Treatment updated successfully",
        data: updatedTriage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the triage visit." });
    }
  });
 // New method to update vitals in triage visit
const postPatientVitals = asyncHandler(async (req, res) => {
    try {
      const { triageId, vitals } = req.body;
  
      // Check if the triage visit exists
      const existingTriage = await prisma.triage.findUnique({
        where: { id: triageId },
      });
  
      if (!existingTriage) {
        return res.status(404).json({ message: "Patient visit not found" });
      }
  
      // Update the triage visit with the provided vitals
      const updatedTriage = await prisma.triage.update({
        where: { id: triageId },
        data: { vitals: vitals },
      });
  
      res.status(200).json({
        success: true,
        message: "Triage visit updated successfully",
        data: updatedTriage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the triage visit." });
    }
  }); 


module.exports = { createPatient, createTriageVisit, getPatientList, postPatientVitals, getTriageVisitList, postDoctorTreatment };
