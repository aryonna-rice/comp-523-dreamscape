import React, { useState, useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import Search from './Search';

const PatientData = ({patientData}) => {
      const columns = useMemo(
        () => [
          {
            accessorKey: 'TimeStamp', //access nested data with dot notation
            header: 'Timestamp',
            size: 10,
          },
          {
            accessorKey: 'Theta_TP9', //access nested data with dot notation
            header: 'Theta_TP9',
            size: 10,
          },
          {
            accessorKey: 'Theta_AF7', //access nested data with dot notation
            header: 'Theta_AF7',
            size: 10,
          },
          {
            accessorKey: 'Theta_TP10', //access nested data with dot notation
            header: 'Theta_TP10',
            size: 10,
          },
        ],
        [],
      );
    
      const table = useMaterialReactTable({
        columns,
        data: patientData,
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
            <MaterialReactTable table={table} />
        </Stack>
        </>
    )
}


export default PatientData;