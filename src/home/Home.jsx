import { Button, Container } from '@mui/material';
import { parse } from 'papaparse';
import React, { useEffect, useState } from 'react';
import Results from '../results/Results';
import Upload from '../upload/Upload';
import Header from './Header';
import Instructions from './Instructions';
import { getDataWithCoords } from './testData';

const Home = () => {
  const [parsedData, setParsedData] = useState([]);
  const [coorArr, setCoorArr] = useState([]);


  useEffect(() => {
    if ((parsedData.filter(d => !d.long || !d.lat)).length === 0) {
      setCoorArr(parsedData.map(d => {
        if (d.long && d.lat)
          return [d.long, d.lat];
        return null;
      }));
    }
    else {
      setCoorArr([]);
    }
  }, [parsedData])

  const handleChange = e => {
    const file = e.target.files[0]
    parse(file, {
      complete: updateData,
      header: true
    });
  }
  const updateData = result => {
    setParsedData(result.data);
  }


  const onLookupClick = async () => {
    if (parsedData && parsedData.length > 0 && parsedData.length < 10)//hard limit of ten to prevent big loops
    {
      const parsedDataWithCoords = await getDataWithCoords(parsedData);
      setParsedData(parsedDataWithCoords)
    }
  }
  return (
    <Container maxWidth="md">
      <Header />
      <Instructions />
      <Upload onChange={handleChange} />
      {parsedData && parsedData.length > 0 && coorArr && coorArr.length === 0 &&
        <div>
          <Button onClick={onLookupClick}>lookup coordinates</Button>
        </div>
      }
      <Results parsedData={parsedData} />

    </Container>
  )
}

export default Home