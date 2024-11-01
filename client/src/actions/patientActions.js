import axios from "axios";
import { PATIENT_REGISTER_FAIL, PATIENT_REGISTER_REQUEST, PATIENT_REGISTER_SUCCESS, TRIAGE_VISIT_FAIL, TRIAGE_VISIT_REQUEST, TRIAGE_VISIT_SUCCESS, PATIENT_LIST_REQUEST, PATIENT_LIST_SUCCESS, PATIENT_LIST_FAIL, PATIENT_LIST_RESET, TRIAGE_VISIT_LIST_REQUEST, TRIAGE_VISIT_LIST_SUCCESS, TRIAGE_VISIT_LIST_FAIL, POST_PATIENT_VITALS_REQUEST, POST_PATIENT_VITALS_SUCCESS, POST_PATIENT_VITALS_FAIL, POST_DOCTOR_TREATMENT_REQUEST, POST_DOCTOR_TREATMENT_SUCCESS, POST_DOCTOR_TREATMENT_FAIL } from "../constants/patientConstants";
import { message } from "antd";

const API = "http://localhost:5000/"
console.log("Base URL: ", API)
export const createPatient = (patient) => async (dispatch, getState) => {
    try {

        dispatch({ type: PATIENT_REGISTER_REQUEST });

        const {
            userLogin: { userInfo },
          } = getState();
      
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

        const data = await axios.post(`${API}patient/create`, patient, config); 
        dispatch({ type: PATIENT_REGISTER_SUCCESS, payload: data });    
        console.log(data);

        const patientID = data.data.data.id; // Accessing nested data correctly
    console.log("Patient ID:", patientID);

    return patientID; // Return the patient ID

    } catch (error) {
        dispatch({ type: PATIENT_REGISTER_FAIL, payload: error.message });
        message.error(error.message, 5);
    }
}

export const createTriageVisit = (patientId) => async (dispatch, getState) => {
    try {
        dispatch({ type: TRIAGE_VISIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };

        const { data } = await axios.post(`${API}patient/triage-visit`, { patientId }, config);
        dispatch({ type: TRIAGE_VISIT_SUCCESS, payload: data });

        message.success(data.message, 5 );
    } catch (error) {
        dispatch({ type: TRIAGE_VISIT_FAIL, payload: error.message });
        message.error(error.message, 5);
    }
}


export const listPatients = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PATIENT_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

        const { data } = await axios.get(`${API}patient/get-patient-list`, config);

        dispatch({ type: PATIENT_LIST_SUCCESS, payload: data });

    } catch (error) {   
        dispatch({ type: PATIENT_LIST_FAIL, payload: error.message });
    }
}

export const triageList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: TRIAGE_VISIT_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

        const { data } = await axios.get(`${API}patient/get-triage-visits`, config);

        dispatch({ type: TRIAGE_VISIT_LIST_SUCCESS, payload: data });

    } catch (error) {   
        dispatch({ type: TRIAGE_VISIT_LIST_FAIL, payload: error.message });
    }
}

export const postDoctorTreatment = (triageId, vitals, symptoms, doctorNotes, diagnosis, recommendedTreatment, additionalNotes) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_DOCTOR_TREATMENT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };

        // Combine all data correctly for the API call
        const { data } = await axios.post(`${API}patient/post-doctor-treatment`, {
            triageId,
            vitals,               // This should be an object containing vitals
            symptoms,
            doctorNotes,
            diagnosis,
            recommendedTreatment,
            additionalNotes
        }, config);
        
        dispatch({ type: POST_DOCTOR_TREATMENT_SUCCESS, payload: data });

        message.success(data.message, 5);
    } catch (error) {
        dispatch({ type: POST_DOCTOR_TREATMENT_FAIL, payload: error.message });
        message.error(error.message, 5);
    }
};

export const postPatientVitals = (triageId, vitals) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_PATIENT_VITALS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };

        // Update the API request to include both triageId and vitals
        const { data } = await axios.post(`${API}patient/post-patient-vitals`, { triageId, ...vitals }, config);
        
        dispatch({ type: POST_PATIENT_VITALS_SUCCESS, payload: data });

        message.success(data.message, 5);
    } catch (error) {
        dispatch({ type:POST_PATIENT_VITALS_FAIL, payload: error.message });
        message.error(error.message, 5);
    }
};
