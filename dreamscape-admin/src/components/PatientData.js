import React, { useState, useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const PatientData = () => {
    const [allData, setAllData] = useState([]);
    
      
      const columns = useMemo(
        () => [
          {
            accessorKey: 'id', //access nested data with dot notation
            header: 'Date',
            size: 10,
          },
          {
            accessorKey: 'device_id', //access nested data with dot notation
            header: 'Time',
            size: 3,
          },
          {
            accessorKey: 'first_name', //access nested data with dot notation
            header: 'Gamma',
            size: 20,
          },
          {
            accessorKey: 'last_name', //access nested data with dot notation
            header: 'Alpha',
            size: 20,
          },
          {
            accessorKey: 'dob', //access nested data with dot notation
            header: 'Theta',
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
        
      });
    return(
        <>
        <Stack>
            <h3>WILL BE PATIENT DATA</h3>
            <MaterialReactTable table={table} />
        </Stack>
        </>
    )
}


export default PatientData;