import { Button, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { UploadedDataContext } from './UploadedDataContextProvider';

const Groups = ({ selectedRows }) => {
  const { uploadedData, setUploadedData } = useContext(UploadedDataContext);
  const [groups, setGroups] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  useEffect(() => {
    if (uploadedData) {

      var groupsListToSet = [];
      const groups = uploadedData.reduce((groupArr, data) => {
        const { group } = data;
        if (group) {

          groupArr[group] = groupArr[group] ?? [];
          groupArr[group].push(data);
          groupsListToSet.indexOf(group) < 0 && groupsListToSet.push(group);
        }
        return groupArr;
      }, {})
      setGroups(groups);
      setGroupsList(groupsListToSet);
      // setGroups(uploadedData.map(d => {
      //   if (d && d.group)
      //     return { group: d.group, data: d }
      //   return null
      // }))
    }
    else {
      setGroups([]);
      setGroupsList([]);
    }
  }, [uploadedData])
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
  return (
    <div>
      <div>
        <Select label="group" onChange={onSelectGroupChange} value=''>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
        <Button disabled={!selectedGroup} onClick={onAddToGroupClick}>add to group {selectedGroup}</Button>

      </div>
      {groupsList && groupsList.map((g, i) => {
        if (g && groups && groups[g]) {
          return (
            <div key={i}><CSVLink data={groups[g]} filename={`Group${g}Data.csv`}>Download Group {g} Data</CSVLink></div>
          )
        }
        return <div key={i}>?</div>
      })}


    </div>
  )
}

export default Groups