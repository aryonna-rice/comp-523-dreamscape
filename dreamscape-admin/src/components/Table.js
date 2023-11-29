import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import Button from '@mui/material/Button';


const AllDataTable = () => {
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        axios
          .get('http://localhost:8000/api/user/list')
          .then((response) => {
            // Handle success (e.g., display search results)
            console.log('All patients:', response.data);
            setAllData(response.data);
            // You can handle the search results as needed for your application
          })
          .catch((error) => {
            // Handle error
            alert('Error retrieving patients. Please try again.');
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
      }, []);
    
      
      const columns = useMemo(
        () => [
          {
            accessorKey: 'id', 
            header: 'Patient ID',
            size: 3,
          },
          {
            accessorKey: 'device_id', 
            header: 'Device ID',
            size: 3,
          },
          {
            accessorKey: 'first_name', 
            header: 'First Name',
            size: 20,
          },
          {
            accessorKey: 'last_name', 
            header: 'Last Name',
            size: 20,
          },
          {
            accessorKey: 'dob', 
            header: 'DOB',
            size: 10,
          },
          {
            accessorKey: 'gender', //access nested data with dot notation
            header: 'Gender',
            size: 10,
          },
        ],
        [],
      );
    
      const table = useMaterialReactTable({
        columns,
        data: allData,
        muiTableHeadCellProps: {
          style: {
            backgroundColor: '#6373ff',
            color: 'white',
          },
        },
        muiTableFooterCellProps: {
          style: {
            backgroundColor: '#6373ff',
            color: 'white',
          },
        },
        renderTopToolbarCustomActions: () => (
          <Button
            onClick={handleExportData}
          ><FileDownloadIcon/> Export All</Button>
        ),
        
      });

      const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
      });

      const handleExportData = () => {
        const csv = generateCsv(csvConfig)(allData);
        download(csvConfig)(csv);
      };

    return(
        <MaterialReactTable table={table}/>
    )
}


export default AllDataTable;