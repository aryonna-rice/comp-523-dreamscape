
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../App.css';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material';

const Search = () => {
    const [deviceId, setDeviceId] = useState('');
    const[searchLast, setSearchLast] = useState('');
    const [searchResults, setSearchResults] = useState({});

    const handleSearch = () => {
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
              alert('No Results', 'No matching results found.');
            } else {
              // Update search results state
              console.log('Search results:', response.data);
              if (deviceId) {
                setSearchResults(response.data);
              }
              else if (searchLast) {
                setSearchResults(response.data[0]);
              }
            }
            // You can handle the search results as needed for your application
          })
          .catch((error) => {
            // Handle error
            alert('No user found with that Device ID. Please try again.');
            if (error.response) {
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

      const listItems = [
        { label: 'ID', value: searchResults.id },
        { label: 'First Name', value: searchResults.first_name },
        { label: 'Last Name', value: searchResults.last_name },
        { label: 'Date of Birth', value: searchResults.dob },
        { label: 'Gender', value: searchResults.gender },
        { label: 'Device ID', value: searchResults.device_id },
      ];

    return (
        <>
        <div>
        <form className='search-form'>
        <Stack spacing={1} sx={{ width: 300 }}>
            <h3 className="header2">Find Patient</h3>
            <TextField 
                color='primary'
                label="Device ID" 
                variant="standard"
                value={deviceId}    
                onChange={(e) => {
                    if (searchLast === '') {
                        if (isNaN(e.target.value)) {
                            alert('Device ID must be a number');
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
            </List>
        </form>
        </div>
        </>
            
    );
}


export default Search;