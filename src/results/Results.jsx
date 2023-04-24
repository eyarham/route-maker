import { Button, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import Spinner from '../_utils/Spinner';
import HomeAccordion from '../home/HomeAccordion';
import { getDataWithCoords } from '../home/testData';
import StopsMap from '../map/StopsMap';
import SummaryPanel from './SummaryPanel';
import { UploadedDataContext } from './UploadedDataContextProvider';

const Results = () => {
  const { uploadedData, setUploadedData } = useContext(UploadedDataContext);
  const [coorArr, setCoorArr] = useState([]);
  const [lookupInProgress, setLookupInProgress] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedRows, setSelectedRows] = useState();

  useEffect(() => {
    if (uploadedData && (uploadedData.filter(d => !d.long || !d.lat)).length === 0) {
      setCoorArr(uploadedData.map(d => {
        if (d.long && d.lat)
          return [d.long, d.lat];
        return null;
      }));
    }
    else {
      setCoorArr([]);
    }
  }, [uploadedData])

  const getHasCoor = params => {
    if ((params.row.long && true) && (params.row.lat && true))
      return 'yes'
    return 'no'
  }

  const renderActionCell = () => {
    return <div><Button>hi</Button></div>
  }
  const columns = [
    { field: 'name', headerName: 'name', width: 200 },
    { field: 'address', headerName: 'address', width: 200 },
    { field: 'cans', headerName: 'cans', width: 100 },
    { field: 'hasCoor', headerName: 'gps?', width: 100, valueGetter: getHasCoor },
    { field: 'group', headerName: 'group', width: 100 },
    { field: 'actions', headerName: '', width: 100, renderCell: renderActionCell }
  ]

  const onLookupClick = async () => {
    if (uploadedData && uploadedData.length > 0 && uploadedData.length < 10)//hard limit of ten to prevent big loops
    {
      setLookupInProgress(true);
      const parsedDataWithCoords = await getDataWithCoords(uploadedData);
      setUploadedData(parsedDataWithCoords)
      setLookupInProgress(false);
    }
  }
  const onSelectGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  }
  const onAddToGroupClick = () => {
    if (uploadedData && selectedGroup) {
      const dataWithGroup = uploadedData.map(d => {
        if (selectedRows.indexOf(d.id) > -1) {
          d.group = selectedGroup;
        }
        return d;
      });
      setUploadedData(dataWithGroup)

    }
  }
  const onRowSelectionModelChange = e => {
    setSelectedRows(e);
  }
  if (!uploadedData) return <div></div>
  return (
    <div>
      <div></div>
      <HomeAccordion name="results grid" defaultExpanded>
        <SummaryPanel data={uploadedData} />
        {uploadedData && uploadedData.length > 0 && coorArr && coorArr.length === 0 &&
          <div>
            <Button onClick={onLookupClick} disabled={lookupInProgress}>lookup coordinates</Button>
            {lookupInProgress && <Spinner />}
          </div>
        }
        <CSVLink data={uploadedData} filename={"routes.csv"}>Download Results</CSVLink>
        <div style={{ height: 400, width: '100%' }}>
          <Select label="group" onChange={onSelectGroupChange} value=''>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
          <Button onClick={onAddToGroupClick}>add to group {selectedGroup}</Button>
          <DataGrid
            rows={uploadedData}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[7]}
            checkboxSelection
            onRowSelectionModelChange={onRowSelectionModelChange}
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