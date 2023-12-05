import { useState, useEffect} from 'react';
import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../App.css';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Alert } from '@mui/material';  


const Search = ({onDataReceived}) => {
    const [deviceId, setDeviceId] = useState('');
    const[searchLast, setSearchLast] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [searchSuccess, setSearchSuccess] = useState(false);
    const [alert, setAlert] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [fileinfo, setFileInfo] = useState({patient_id: '', date: ''});
    const [data, setData] = useState();

    const handleSearch = ({ }) => {
        setSelectedFileName('');
        onDataReceived('');
        setFileInfo({patient_id: '', date: ''});
        let apiUrl = '';
        if (deviceId) {
          apiUrl = `http://localhost:8000/api/user?device_id=${deviceId}`;
        } else if (searchLast) {
          apiUrl = `http://localhost:8000/api/user/search?last_name=${searchLast}`;
        }
    
        console.log('Searching for patient with:', deviceId ? 'Device ID ' + deviceId : 'Last Name ' + searchLast);
        axios
          .get(apiUrl)
          .then((response) => {
            // Handle success (e.g., display search results)
            if (response.data === null || response.data.length === 0) {
              // If response data is null or empty, display an alert
              setAlert({ severity: 'warning', message: 'No matching results found.' });
            } else {
              // Update search results state
              console.log('Search results:', response.data);
              if (deviceId) {
                setSearchResults(response.data);
                setSearchSuccess(true);
              }
              else if (searchLast) {
                setSearchResults(response.data[0]);
                setSearchSuccess(true);
              }
            }
            // You can handle the search results as needed for your application
          })
          .catch((error) => {
            // Handle error
            setAlert({ severity: 'error', message: 'No user found with that Device ID. Please try again.' });

            if (error.response) {
              setSearchSuccess(false);
              console.error('Server responded with non-2xx status:', error.response.status);
              console.error('Response data:', error.response.data);
              console.error('Response headers:', error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              setSearchSuccess(false);
              console.error('No response received from the server');
              console.error('Request data:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              setSearchSuccess(false);
              console.error('Error setting up the request:', error.message);
            }
            setSearchSuccess(false);
            console.error('Full error object:', error);
          });
      };

      function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
      
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
      
        const formattedDate = `${day}-${month}-${year}-${hour}-${minute}-${second}`;
        return formattedDate;
      }
    

      const handleUploadCSV = async (event) => { 
        try {
          const file = event.target.files[0];
          function readFile(file) {
            const reader = new FileReader();
    
            reader.onload = (evt) => {
              const contents = evt.target.result;
              console.log('File contents:', contents);
    
              // Assuming the content is CSV, you can parse it
              const rows = contents.split('\n');
              const header = rows[0].split(',');
    
              const data = rows.slice(1).map(row => {
                const values = row.split(',');
              
                // Check if values array is not empty and has the expected length
                if (values.length === header.length) {
                  return header.reduce((obj, key, index) => {
                    // Check if values[index] is not undefined before accessing 'trim'
                    obj[key.trim()] = values[index] ? values[index].trim() : '';
                    return obj;
                  }, {});
                } else {
                  // Handle the case where the row does not have the expected number of columns
                  console.warn('Invalid row:', row);
                  return null; // or handle it according to your requirements
                }
              }).filter(row => row !== null); // Remove null entries caused by invalid rows
    
              // Log the parsed data    
              // Now you can format and display the data as a table
              // (you can use a library like Material-UI Table for better styling)
              setData(data);
              onDataReceived(data);
              console.table(data);
              // index the data in the first row:
              console.log(data[0]["TimeStamp"]);
              console.log(data.length);
             
            };
            reader.readAsText(file);
          }

          if (file) {
            console.log('Selected file:', file);
            setSelectedFileName(file.name);
            setFileInfo({patient_id: searchResults.id, date: formatTimestamp(file.lastModified)});
            // may want to use FileReader or another library to read the xcontents of the file
            // console.log('File contents:', readFile(file));
            readFile(file);
          }
    
        } catch (err) {
          // Handle errors
          console.error(err);
        }
      };
      
      
      useEffect(() => {
        console.log('File Info:', fileinfo);
      }, [fileinfo]);

      const handleCloseAlert = () => {
        setAlert(null);
      };


      const listItems = [
        { label: 'ID', value: searchResults.id },
        { label: 'First Name', value: searchResults.first_name },
        { label: 'Last Name', value: searchResults.last_name },
        { label: 'Date of Birth', value: searchResults.dob },
        { label: 'Gender', value: searchResults.gender },
        { label: 'Device ID', value: searchResults.device_id },
      ];

      const actions = [
        { icon: <UploadFileIcon />, name: 'Upload CSV' },
      ];

    return (
        <>
        <div>
        <form className='search-form'>
        <Stack spacing={1} sx={{ width: 300 }}>
        {alert && (
          <Alert severity={alert.severity} onClose={handleCloseAlert}>
            {alert.message}
          </Alert>
        )}
            <h3 className="header2">Find Patient</h3>
            <TextField 
                color='primary'
                label="Device ID" 
                variant="standard"
                value={deviceId}    
                onChange={(e) => {
                    if (searchLast === '') {
                        if (isNaN(e.target.value)) {
                            return;
                        }
                        setDeviceId(e.target.value);
                    }
                }}
            />
            <p style={{color:"black"}}>OR</p>
            <TextField 
                color='primary'
                label="Last Name" 
                variant="standard"
                value={searchLast}
                onChange={(e) => {
                    if (deviceId === '') {
                        setSearchLast(e.target.value);
                    }
                }}
            />
            <Button variant="contained" color="secondary" sx={{backgroundColor:"#5A6BFF"}} onClick={handleSearch}>Search</Button>
            <br></br>
            </Stack>
        </form>
        <br></br>
        <form className='patient-info'>
            <List component="nav" aria-label="search results list">
                {listItems.map((item, index) => (
                    <ListItem key={index}>
                    <ListItemText primary={item.label} secondary={item.value} />
                    </ListItem>
                ))}
                <ListItem>
                    {selectedFileName && (
                        <p style={{ color:"black" }}>
                          Selected File: {selectedFileName}
                        </p>
                  )}
                </ListItem>
                {searchSuccess && (
                  <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  icon={<SpeedDialIcon />}
                >
                  <input
                    type="file"
                    onChange={handleUploadCSV}
                    accept=".csv"
                    style={{ display: 'none' }} // Hide the input element
                    ref={fileInputRef} // Reference to the input element
                  />
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => fileInputRef.current.click()}
                    />
                  ))}
                </SpeedDial>
                )}
            </List>
        </form>
        </div>
        </>
            
    );
}


export default Search;