import { Container, CssBaseline } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { parse } from 'papaparse';
import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import Header from './Header';
import Instructions from './Instructions';
import { getTemplate, getTestDocument } from './testData';
const Home = () => {
  const [parsedData, setParsedData] = useState([]);
  const columns = [
    { field: 'name', headerName: 'name', width: 200 },
    { field: 'address', headerName: 'address', width: 200 },
    { field: 'cans', headerName: 'cans', width: 100 }
  ]
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
  const templateData = getTemplate();
  const sampleData = getTestDocument();
  return (
    <Container maxWidth="md">
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Header />
      <Instructions />
      <div><CSVLink data={templateData} filename={"template.csv"}>Download Template</CSVLink></div>
      <div><CSVLink data={sampleData} filename={"sample.csv"}>Download Sample Doc</CSVLink></div>
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
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={getRowId}
            rows={parsedData}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[7]}
            checkboxSelection
          />
        </div>}
    </Container>
  )
}

export default Home