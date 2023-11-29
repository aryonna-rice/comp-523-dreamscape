import * as React from 'react';
import Search from './Search';
import PatientData from './PatientData';
import Divider from '@mui/material/Divider';

export default function FindPatient() {

  return (
    <div className="table-container">
        <h1>All Data</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Search />
          <Divider orientation="vertical" flexItem sx={{padding:"10px"}}/>
          <PatientData/>
        </div>
    </div>
  );
}