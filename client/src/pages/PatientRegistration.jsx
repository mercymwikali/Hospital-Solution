import { Button, DatePicker, Input, Select, Form , message,Spin} from "antd";
import {
  relationshipOptions,
  PatientypeOptions,
  InsuranceOptions,
} from "../constants/DropDownConstants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPatient, createTriageVisit } from "../actions/patientActions";

const PatientRegistration = () => {
  const dispatch = useDispatch();
  const createPatientState = useSelector((state) => state.createPatient);
  const { loading, error, success,payload } = createPatientState;


  const createTriageVisitState = useSelector((state) => state.createTriageVisit);
  const { loading: visitLoading, error: visitError, success: visitSuccess,payload: visitPayload } = createTriageVisitState;

  const [newPatient, setNewPatient] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    idNumber: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    kinName: "",
    kinRelationship: "",
    kinPhoneNumber: "",
    patientType: "",
    insurance: "",
    memberName: "",
    memberNumber: "",
  });

  const [patientId, setPatientId] = useState(null);

  // Handle input changes for controlled inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select and date changes
  const handleSelectChange = (name, value) => {
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  // Dispatch the create patient action
  const handleSubmit = async () => {
    const patientID = await dispatch(createPatient(newPatient)); // Get the patient ID after dispatching
    if (patientID) {
      setPatientId(patientID);
      console.log("Patient ID:", patientID);
    }
  };

  const handleCreateVisit = () => {
    if (!patientId) {
        message.error("Please create a patient before creating a visit.");
        return;
    }
    dispatch(createTriageVisit(patientId));
if (visitSuccess) {
    setNewPatient({
        ...newPatient,
        firstName: "",
        middleName: "",
        lastName: "",
        idNumber: "",
        gender: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        kinName: "",
        kinRelationship: "",
        kinPhoneNumber: "",
        patientType: "",
        insurance: "",
        memberName: "",
        memberNumber: "",
    })
    
}

  };

    // Effect to handle messages based on success or error
    useEffect(() => {
        if (error) {
          message.error(error);
        }
        if (success) {
          message.success("Patient created successfully!");
        }
      }, [error, success]);

  return (
    <div className="card py-2 px-2">
      <div className="card-header d-flex justify-content-between">
        <h5 className="card-title">Patient Registration</h5>
        <a href="/Nurse/Patient-list" className="btn btn-link ps-0">
          Patient List
        </a>
      </div>
      <div className="card-body">
      

        <Form layout="vertical" >
          <div className="row g-3 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">First Name:</label>
              <Input
                placeholder="Enter First Name"
                name="firstName"
                value={newPatient.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Middle Name:</label>
              <Input
                placeholder="Enter Middle Name"
                name="middleName"
                value={newPatient.middleName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row g-3 my-1 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Surname Name:</label>
              <Input
                placeholder="Enter Surname Name"
                name="lastName"
                value={newPatient.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">ID/Passport/Birth No:</label>
              <Input
                placeholder="Enter ID No"
                name="idNumber"
                value={newPatient.idNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row g-3 my-1 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Gender:</label>
              <Select
                placeholder="Select Gender"
                className="w-100"
                value={newPatient.gender}
                onChange={(value) => handleSelectChange("gender", value)}
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Date of Birth:</label>
              <DatePicker
                className="w-100"
                placeholder="Select Date of Birth"
                value={newPatient.dateOfBirth}
                onChange={(value) => handleSelectChange("dateOfBirth", value)}
              />
            </div>
          </div>

          <div className="row g-3 my-1 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Phone Number:</label>
              <Input
                placeholder="254 0000 00000"
                name="phoneNumber"
                value={newPatient.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Email:</label>
              <Input
                placeholder="Enter Email Address"
                name="email"
                value={newPatient.email}
                onChange={handleInputChange}
                type="email"
              />
            </div>
          </div>
          <div className="row g-3 my-1 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Next of Kin Name:</label>
              <Input
                placeholder="Enter Next of Kin Name"
                name="kinName"
                value={newPatient.kinName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Next of Kin Relationship:</label>
              <Select
                placeholder="Select Relationship"
                className="w-100"
                options={relationshipOptions}
                value={newPatient.kinRelationship}
                onChange={(value) =>
                  handleSelectChange("kinRelationship", value)
                }
              ></Select>
            </div>
          </div>
          <div className="row g-3 my-1 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Next of Kin Phone Number:</label>
              <Input
                placeholder="254 0000 00000"
                name="kinPhoneNumber"
                value={newPatient.kinPhoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Patient Type:</label>
              <Select
                placeholder="Select Patient Type"
                className="w-100"
                options={PatientypeOptions}
                value={newPatient.patientType}
                onChange={(value) => handleSelectChange("patientType", value)}
              ></Select>
            </div>
          </div>
          <div className="row g-3 my-1 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Insurance:</label>
              <Select
                placeholder="Select Insurance Type"
                className="w-100"
                options={InsuranceOptions}
                value={newPatient.insurance}
                onChange={(value) => handleSelectChange("insurance", value)}
              ></Select>
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Member Name:</label>
              <Input
                placeholder="Enter Member Name"
                name="memberName"
                value={newPatient.memberName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row g-3 my-1 align-items-center justify-content-start">
          
          <div className="col-12 col-md-6 text-primary">
            <label className="form-label">Member No:</label>
           <Input placeholder="Enter Member No" name="memberNumber" value={newPatient.memberNumber} onChange={handleInputChange} />
          </div>
        </div>
          <div className="d-flex justify-content-center my-5 gap-3">
            <Button type="primary" htmlType="submit" onClick={handleSubmit} loading={loading}>
              Save Patient Details
            </Button>
            <Button htmlType="submit"  onClick={handleCreateVisit}  loading={visitLoading} style={{backgroundColor:"green", color:"white", border:"none"}}>
             Create Patient Visit
            </Button>
          </div>
         
        </Form>

      
      </div>
    </div>
  );
};

export default PatientRegistration;
