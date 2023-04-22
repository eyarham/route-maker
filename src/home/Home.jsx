import { Container } from '@mui/material';
import React from 'react';
import Results from '../results/Results';
import Upload from '../upload/Upload';
import Header from './Header';
import HomeAccordion from './HomeAccordion';
import Instructions from './Instructions';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Header />
      <HomeAccordion name="instructions">
        <Instructions />
      </HomeAccordion>
      <HomeAccordion name="upload" defaultExpanded>
        <Upload />
      </HomeAccordion>
      <Results />
    </Container>
  )
}

export default Home