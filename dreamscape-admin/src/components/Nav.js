import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Home from './Home'
import AllDataTable from './AllData'
import FindUser from './FindPatient'
import Logo from '../logo.png'

export default function ButtonAppBar() {
    let Page
    switch(window.location.pathname) {
        case '/':
            Page = Home
            break;
        case '/findpatient':
            Page = FindUser
            break;
        case '/alldata':
            Page = AllDataTable
            break;
    }



  return (
    <>
    <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ background: '#19173D', flexGrow: 1 }}>
        <Toolbar>
            <img src={Logo} style={{ height: '50px', width: '60px' }} />
            <h1>DreamScape</h1>
            <h1 style={{ color: '#5A6BFF' }}> Admin</h1>
            <div style={{ marginLeft: 'auto' }}>
            <a href="/">
                <Button
                style={{
                    color: Page === Home ? '#5A6BFF' : 'inherit',
                }}
                >
                Home
                </Button>
            </a>
            <a href="/alldata">
                <Button
                style={{
                    color: Page === AllDataTable ? '#5A6BFF' : 'inherit',
                }}
                >
                All Data
                </Button>
            </a>
            <a href="/findpatient">
                <Button
                style={{
                    color: Page === FindUser ? '#5A6BFF' : 'inherit',
                }}
                >
                Find Patient
                </Button>
            </a>
            <Button color="inherit">Profile</Button>
            </div>
        </Toolbar>
        </AppBar>
    </Box>
    <Page />
    </>
  );
}