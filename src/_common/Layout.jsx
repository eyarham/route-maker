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
import Header from './Header';
import UploadedDataContextProvider from '../results/UploadedDataContextProvider';
const Layout = () => {
  return (
    <Container maxWidth="md">
      <Header />
      <FirebaseContextProvider>
        <ConfigsApiContextProvider>
          <ConfigContextProvider>
            <UploadedDataContextProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Container maxWidth="xl">
                <Outlet />
              </Container>
            </UploadedDataContextProvider>
          </ConfigContextProvider>
        </ConfigsApiContextProvider>
      </FirebaseContextProvider>
    </Container>
  )
}

export default Layout