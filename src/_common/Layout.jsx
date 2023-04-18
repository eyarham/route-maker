import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline } from '@mui/material';
import React from 'react';
import ConfigContextProvider from '../config/ConfigContextProvider';
import ConfigsApiContextProvider from '../config/ConfigsApiContextProvider';

import { Outlet } from 'react-router-dom';
import FirebaseContextProvider from '../firebase/FirebaseContextProvider';
const Layout = () => {
  return (
    <FirebaseContextProvider>
      <ConfigsApiContextProvider>
        <ConfigContextProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Container maxWidth="xl">
            <Outlet />
          </Container>

        </ConfigContextProvider>
      </ConfigsApiContextProvider>
    </FirebaseContextProvider>
  )
}

export default Layout