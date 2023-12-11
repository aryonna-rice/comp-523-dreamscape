import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../App.css';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';  


const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [alert, setAlert] = useState(null);

    const formatDOB = (input) => {
        if (input.length <= 10) {
          // Remove any non-numeric characters
          const numericInput = input.replace(/\D/g, '');
    
          if (numericInput.length <= 2) {
            // Format as MM
            return numericInput;
          } else if (numericInput.length <= 4) {
            // Format as MM/DD
            return `${numericInput.slice(0, 2)}/${numericInput.slice(2)}`;
          } else {
            // Format as MM/DD/YYYY
            return `${numericInput.slice(0, 2)}/${numericInput.slice(2, 4)}/${numericInput.slice(4, 8)}`;
          }
        }
        return input.slice(0, 10);
      };
      const handleSubmit = () => {
        const patientData = {
          id : Math.floor(Math.random() * 200),
          first_name: firstName,
          last_name:lastName,
          device_id: Math.floor(Math.random() * 200),
          dob,
          gender,
        };
    
        console.log('Submitting patientData:', patientData);
        setFirstName('');
        setLastName('');
        setDOB('');
        setGender('');
    
        axios.post('http://localhost:8000/api/user', patientData)
        .then(response => {
          // Handle success (e.g., show a success message, navigate to a new screen)
          console.log('Patient registered:', response.data);
          window.location.reload();
          setAlert({ severity: 'success', message: 'Patient registered successfully! Device ID:' + response.data.device_id });
        })
        .catch(error => {
          // Handle error (e.g., show an error message)
          setAlert({ severity: 'warning', message: 'Error creating patient. Please try again.' });
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with non-2xx status:', error.response.status);
            console.error('Response data:', error.response.data);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server');
            console.error('Request data:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
          }
          console.error('Full error object:', error);
        });
      };

      const handleCloseAlert = () => {
        setAlert(null);
      };

    return (
        <form className= "form">
        <Stack spacing={1} sx={{ width: 300 }}>
        {alert && (
          <Alert severity={alert.severity} onClose={handleCloseAlert}>
            {alert.message}
          </Alert>
        )}
        <h2 className="header2">Register a Patient</h2>
        <TextField 
            color='primary'
            label="First Name" 
            variant="standard"
            value={firstName}
            onChange={event => setFirstName(event.target.value)} 
        />
        <TextField
            label="Last Name"
            variant="standard"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
        />
        <TextField
            label="DOB: (MM/DD/YYYY)"
            variant="standard"
            value={formatDOB(dob)}
            onChange={event => setDOB(formatDOB(event.target.value))}
        />
        <TextField
            label="Gender"
            variant="standard"
            value={gender}
            onChange={event => setGender(event.target.value)}
        />
        <Button variant="contained" color="secondary" sx={{backgroundColor:"#5A6BFF"}} onClick={handleSubmit}>Submit</Button>
        </Stack>
      </form>
    );
}


export default Register;
