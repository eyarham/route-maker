import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, Container, CssBaseline } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { parse } from 'papaparse';
import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import StopsMap from '../map/StopsMap';
import Header from './Header';
import Instructions from './Instructions';
import { getDataWithCoords, getSampleDocument, getSampleDocumentNoCoords, getTemplate } from './testData';

const Home = () => {
  const [parsedData, setParsedData] = useState([]);
  const [coorArr, setCoorArr] = useState([]);
  const columns = [
    { field: 'name', headerName: 'name', width: 200 },
    { field: 'address', headerName: 'address', width: 200 },
    { field: 'cans', headerName: 'cans', width: 100 },
    { field: 'long', headerName: 'long', width: 200 },
    { field: 'lat', headerName: 'lat', width: 200 }
  ]

  useEffect(()=>{
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
  },[parsedData])

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

  const getRowId = row => {
    return crypto.randomUUID();
  }

  const onLookupClick = async () => {
    if (parsedData && parsedData.length > 0 && parsedData.length < 10)//hard limit of ten to prevent big loops
    {
      const parsedDataWithCoords = await getDataWithCoords(parsedData);
        setParsedData(parsedDataWithCoords)
    }
  }

  const templateData = getTemplate();
  const sampleData = getSampleDocument();
  const sampleDataNoCoor = getSampleDocumentNoCoords();
  return (
    <Container maxWidth="md">
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Header />
      <Instructions />
      <div><CSVLink data={templateData} filename={"template.csv"}>Download Template</CSVLink></div>
      <div><CSVLink data={sampleData} filename={"sample.csv"}>Download Sample Doc</CSVLink></div>
      <div><CSVLink data={sampleDataNoCoor} filename={"sampleNoCoor.csv"}>Download Sample Doc No Coords</CSVLink></div>
      <div>
        <input
          className="csv-input"
          type="file"
          name="file"
          placeholder={null}
          onChange={handleChange}
        />
      </div>
      {parsedData && parsedData.length > 0 &&
        <div><CSVLink data={parsedData} filename={"routes.csv"}>Download Results</CSVLink></div>
      }
      {parsedData && parsedData.length > 0 &&
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={getRowId}
            rows={parsedData}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[7]}
            checkboxSelection
          />
        </div>
      }
      {parsedData && parsedData.length > 0 && coorArr &&
        <div>
          {coorArr.length === 0 && <Button onClick={onLookupClick}>lookup coordinates</Button>}
          {coorArr && coorArr.length > 0 && <StopsMap pinCoords={coorArr} />}
        </div>
      }
    </Container>
  )
}

export default Home