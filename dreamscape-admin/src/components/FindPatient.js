import { useState } from 'react';
import Search from './Search';
import PatientData from './PatientData';
import Divider from '@mui/material/Divider';

export default function FindPatient() {
  const [patientData, setPatientData] = useState([]);

  const handleData = (results) => {
    setPatientData(results);
  };

  return (
    <div className="table-container">
        <h1>All Data</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Search onDataReceived={handleData} />
          <Divider orientation="vertical" flexItem sx={{padding:"10px"}}/>
          <PatientData patientData={patientData}/>
        </div>
    </div>
  );
}