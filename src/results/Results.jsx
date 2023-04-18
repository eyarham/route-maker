import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import Spinner from '../_utils/Spinner';
import HomeAccordion from '../home/HomeAccordion';
import StopsMap from '../map/StopsMap';
import SummaryPanel from './SummaryPanel';

const Results = ({ parsedData }) => {
  const [coorArr, setCoorArr] = useState([]);

  useEffect(() => {
    if (parsedData && (parsedData.filter(d => !d.long || !d.lat)).length === 0) {
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
  const getRowId = row => {
    return crypto.randomUUID();
  }
  const columns = [
    { field: 'name', headerName: 'name', width: 200 },
    { field: 'address', headerName: 'address', width: 200 },
    { field: 'cans', headerName: 'cans', width: 100 },
    { field: 'long', headerName: 'long', width: 200 },
    { field: 'lat', headerName: 'lat', width: 200 }
  ]
  if (!parsedData) return <Spinner />
  return (
    <div>
      <div><CSVLink data={parsedData} filename={"routes.csv"}>Download Results</CSVLink></div>
      <SummaryPanel data={parsedData} />
      <HomeAccordion name="results grid" defaultExpanded>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={getRowId}
            rows={parsedData}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[7]}
          />
        </div>

      </HomeAccordion>
      {coorArr && coorArr.length > 0 &&
        <StopsMap pinCoords={coorArr} />
      }
    </div>
  )
}

export default Results