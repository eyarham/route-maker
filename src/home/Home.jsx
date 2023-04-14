import { DataGrid } from '@mui/x-data-grid';
import { parse } from 'papaparse';
import React, { useState } from 'react';
import { CSVLink } from "react-csv";
const Home = () => {
  const [parsedData, setParsedData] = useState([]);
  const columns = [
    { field: 'name', headerName: 'name', width: 200 },
    { field: 'address', headerName: 'address', width: 200 },
    { field: 'cans', headerName: 'cans', width: 100 }
  ]
  const csvData = [
    ["name", "address", "cans"],
    ["test", "123 fake st", "6", "boff"]]
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
  return (
    <div>
      <div>
        <CSVLink data={csvData}>Download Template</CSVLink></div>
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
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>}
    </div>
  )
}

export default Home