import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './pages/Home';
import PrivateRoute from './private/PrivateRoute';
import { Roles } from './utils/role';
import AdminPage from './pages/AdminPage';
import AdminLayout from './Layouts/AdminLayout';
import DocLayout from './Layouts/DocLayout';
import NurseLayout from './Layouts/NurseLayout';
import PatientRegistration from './pages/PatientRegistration';
import Patientlist from './pages/Patientlist';
import NurseObservation from './pages/NurseObservation';
import NewPatients from './pages/NewPatients';
import OutpatientList from './pages/OutpatientList';
import DoctorDetailsForm from './pages/DocDetailsForm';
import NurseOutpatientList from './pages/NurseOutpatientList';
import PatientAdmissions from './pages/PatientAdmissions';
import DoctorAdmissionList from './pages/DoctorAdmissionList';
import InpatientList from './pages/InpatientList';
import DischargeList from './pages/DischargeList';
import DischargeRequestList from './pages/DischargeRequestList';
import PharmacyOutPatient from './pages/PharmacyOutPatient';
import BedManager from './pages/BedManager';
import NurseDashboard from './Dashboards/NurseDashboard';
import DoctorDashboard from './Dashboards/DoctorDashboard';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin?.userInfo;

  return (
    <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route element={<PrivateRoute allowedRoles={[Roles.Admin]} />}>
      <Route path='/admin' element={<AdminLayout />} /> {/* Admin page route */}
    </Route>
    <Route element={<PrivateRoute allowedRoles={[Roles.Nurse]} />}>
      <Route path='/Nurse' element={<NurseLayout />} >
      <Route index element={<NurseDashboard />} />
      <Route path='/Nurse/PatientRegistration' element={<PatientRegistration />} />
      <Route path='/Nurse/Patient-list' element={<Patientlist />} />
      <Route path='/Nurse/New-Patients' element={<NewPatients />} />
      <Route path="/Nurse/Observation-Room/:id" element={<NurseObservation />} />
      <Route path='/Nurse/Outpatient-list' element={<NurseOutpatientList />} />
      <Route path='/Nurse/Patient-admissions' element={<PatientAdmissions />} />
      <Route path='/Nurse/BedManagement' element={<BedManager />} />

      <Route path='/Nurse/Discharge-list' element={<DischargeRequestList />} />

      </Route>
    </Route>
    <Route element={<PrivateRoute allowedRoles={[Roles.Doctor]} />}>
      <Route path='/Doctor' element={<DocLayout />} >
      <Route index element={<DoctorDashboard />} />

      <Route path='/Doctor/PatientRegistration' element={<PatientRegistration />} />
      <Route path='/Doctor/Outpatient-list' element={<OutpatientList />} />
      <Route path="/Doctor/Doc-Observation-Room/:id" element={<DoctorDetailsForm />} />
      <Route path='/Doctor/Patient-admissions' element={<DoctorAdmissionList />} />
      <Route path='/Doctor/Inpatient-list' element={<InpatientList />} />
      <Route path='/Doctor/Discharge-list' element={<DischargeList />} />
      <Route path='/Doctor/Pharmacy-OutPatient' element={<PharmacyOutPatient />} />

</Route>
    </Route>
  </Routes>
  );
}

export default App;
