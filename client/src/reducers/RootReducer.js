import { combineReducers } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer } from "./userReducer";
import { patientCreateReducer, patientListReducer, patientTriageVisitCreateReducer, postDoctorTreatmentReducer, postPatientVitalsReducer, triageListReducer } from "./patientReducer";

export const rootReducer = combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    createPatient:patientCreateReducer,
    createTriageVisit:patientTriageVisitCreateReducer,
    patientList:patientListReducer,
    triageList:triageListReducer,
    postPatientVitals:postPatientVitalsReducer,
    postDoctorTreatment:postDoctorTreatmentReducer
});