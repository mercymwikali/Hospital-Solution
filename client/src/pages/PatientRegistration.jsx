import {
  Button,
  DatePicker,
  Input,
  Select,
  Form,
  message,
  Spin,
  Switch,
} from "antd";
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
  const { loading, error, success, payload } = createPatientState;

  const createTriageVisitState = useSelector(
    (state) => state.createTriageVisit
  );
  const {
    loading: visitLoading,
    error: visitError,
    success: visitSuccess,
    payload: visitPayload,
  } = createTriageVisitState;

  const [newPatient, setNewPatient] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    idNumber: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    paymentMode: 0,
    kinName: "",
    kinRelationship: "",
    kinPhoneNumber: "",
    patientType: "",
    insurance: "",
    memberName: "",
    memberNumber: "",
    nationality: "",
    county: "",
    isPrincipalMember: false,
    schemeName: "",
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

  const handleDateChange = (date, dateString) => {
    setNewPatient((prev) => ({ ...prev, dateOfBirth: dateString }));
  };

  const handleSwitchChange = (name, value) => {
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
      });
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
        <h5 className="card-title" style={{ color: "#ac8342" }}>
          Patient Registration
        </h5>
        <a
          href="/Nurse/Patient-list"
          className="btn btn-link ps-0 text-success"
        >
          Patient List
        </a>
      </div>
      <div className="card-body">
        <Form layout="vertical">
          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">First Name:</label>
              <Input
                placeholder="Enter First Name"
                name="firstName"
                value={newPatient.firstName}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Middle Name:</label>
              <Input
                placeholder="Enter Middle Name"
                name="middleName"
                value={newPatient.middleName}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Surname Name:</label>
              <Input
                placeholder="Enter Surname Name"
                name="lastName"
                value={newPatient.lastName}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Gender:</label>
              <Select
                placeholder="Select Gender"
                className="w-100, custom-select"
                value={newPatient.gender}
                onChange={(value) => handleSelectChange("gender", value)}
                variant="borderless"
                size="large"
              >
                <Select.Option value="">--Select Gender--</Select.Option>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Date of Birth:</label>
              <DatePicker
                className="w-100, custom-select"
                placeholder="Select Date of Birth"
                value={newPatient.dateOfBirth}
                onChange={(value) => handleSelectChange("dateOfBirth", value)}
                variant="borderless"
                size="large"
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">ID/Passport/Birth No:</label>
              <Input
                placeholder="Enter ID No"
                name="idNumber"
                value={newPatient.idNumber}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
          </div>
          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Nationality:</label>
              <Select
                placeholder="Select Nationality"
                className="w-100, custom-select"
                //  options={relationshipOptions}
                value={newPatient.nationality}
                onChange={(value) => handleSelectChange("nationality", value)}
                variant="borderless"
                size="large"
              >
                <Select.Option value="">--Select Nationality--</Select.Option>
              </Select>
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">County:</label>
              <Select
                placeholder="Select County"
                className="w-100, custom-select"
                //  options={relationshipOptions}
                value={newPatient.county}
                onChange={(value) => handleSelectChange("county", value)}
                variant="borderless"
                size="large"
              ></Select>
            </div>
          </div>
          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Phone Number:</label>
              <Input
                placeholder="254 0000 00000"
                name="phoneNumber"
                value={newPatient.phoneNumber}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Payment Mode:</label>
              <Input
                placeholder="Enter Payment Mode"
                name="paymentMode"
                value={newPatient.paymentMode}
                onChange={handleInputChange}
                type="number"
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Next of Kin Name:</label>
              <Input
                placeholder="Enter Next of Kin Name"
                name="kinName"
                value={newPatient.kinName}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Next of Kin Relationship:</label>
              <Select
                placeholder="Select Relationship"
                className="w-100, custom-select"
                options={relationshipOptions}
                value={newPatient.kinRelationship}
                onChange={(value) =>
                  handleSelectChange("kinRelationship", value)
                }
                variant="borderless"
                size="large"
              ></Select>
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Next of Kin Phone Number:</label>
              <Input
                placeholder="254 0000 00000"
                name="kinPhoneNumber"
                value={newPatient.kinPhoneNumber}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Patient Type:</label>
              <Select
                placeholder="Select Patient Type"
                className="w-100, custom-select"
                options={PatientypeOptions}
                value={newPatient.patientType}
                onChange={(value) => handleSelectChange("patientType", value)}
                variant="borderless"
                size="large"
              ></Select>
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Insurance Name:</label>
              <Select
                placeholder="Select Insurance"
                className="w-100, custom-select"
                options={InsuranceOptions}
                value={newPatient.insurance}
                onChange={(value) => handleSelectChange("insurance", value)}
                variant="borderless"
                size="large"
              ></Select>
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">
                Insurance Principal Member Name:
              </label>
              <Input
                placeholder="Enter Member Name"
                name="memberName"
                value={newPatient.memberName}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
          </div>

          <div className="row g-3 my-2 align-items-center ">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Insurance No:</label>
              <Input
                placeholder="Enter Member No"
                name="memberNumber"
                value={newPatient.memberNumber}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label d-block">
                Is Principal Member ?
              </label>
              <Switch
                checked={newPatient.isPrincipalMember}
                onChange={(checked) =>
                  handleSwitchChange("isPrincipalMember", checked)
                }
                size="large"
                style={{ margin: "0 10px" }}
              />
            </div>
          </div>
          <div className="row g-3 my-2 align-items-center ">
            <div className="col-12 col-md-6 text-primary">
              <label className="form-label">Scheme Name:</label>
              <Input
                placeholder="Enter Scheme Name"
                name="schemeName"
                value={newPatient.schemeName}
                onChange={handleInputChange}
                className="custom-input"
                variant="borderless"
                size="large"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center my-5 gap-3">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              type="primary"
              size="large"
            >
              {loading ? <Spin /> : "Save Patient Details"}
            </Button>
            <Button
              onClick={handleCreateVisit}
              disabled={visitLoading}
              type="primary"
              size="large"
            >
              {visitLoading ? <Spin /> : "Create Triage Visit"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PatientRegistration;
