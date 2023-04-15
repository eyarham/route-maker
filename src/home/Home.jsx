import { DataGrid } from '@mui/x-data-grid';
import { parse } from 'papaparse';
import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import { getTemplate, getTestDocument } from './testData';
import { CssBaseline } from '@mui/material';
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
    <div>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
<a href='https://github.com/eyarham/route-maker' target="_blank">code</a>
      <div><CSVLink data={templateData}>Download Template</CSVLink></div>
      <div><CSVLink data={sampleData}>Download Sample Doc</CSVLink></div>
      <div> <input
        className="csv-input"
        type="file"
        name="file"
        placeholder={null}
        onChange={handleChange}
      /></div>
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
    </div>
  )
}

export default Home