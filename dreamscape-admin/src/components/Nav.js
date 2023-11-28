import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Home from './Home'
import AllDataTable from './AllDataTable'
import FindUser from './FindUser'



export default function ButtonAppBar() {
    let Page
    switch(window.location.pathname) {
        case '/':
            Page = Home
            break;
        case '/finduser':
            Page = FindUser
            break;
        case '/alldata':
            Page = AllDataTable
            break;
    }

  return (
    <>
    <Box sx={{ flexGrow: 1}}>
    <AppBar position="static" style={{background: '#19173D', flexGrow:1}}>
        <Toolbar>
            <h1>DreamScape</h1><h1 style = {{color: '#5A6BFF'}}> Admin</h1>
            <div style={{ marginLeft: 'auto' }}>
                <a href="/"><Button color="inherit">Home</Button></a>
                <a href="/alldata"><Button color="inherit">All Data</Button></a>
                <a href="/finduser"><Button color="inherit">Find User</Button></a>
                <Button color="inherit">Profile</Button>
            </div>
        </Toolbar>
    </AppBar>
    </Box>
    <Page />
    </>
  );
}