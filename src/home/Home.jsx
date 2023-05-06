import { Box } from '@mui/material';
import React from 'react';
import Results from '../results/Results';
import Upload from '../upload/Upload';
import HomeAccordion from './HomeAccordion';
import Instructions from './Instructions';
import Templates from '../upload/Templates';

const Home = () => {
  return (
    <Box>
      <HomeAccordion name="instructions">
        <Instructions />
      </HomeAccordion>
      <HomeAccordion name="templates">
        <Templates />
      </HomeAccordion>
      <HomeAccordion name="upload" defaultExpanded>
        <Upload />
      </HomeAccordion>
      <Results />
    </Box>
  )
}

export default Home