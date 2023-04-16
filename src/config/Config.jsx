import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_utils/Spinner';
import configApi from './_api';

const Config = () => {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState();
  const [updatedMapBoxAccessToken, setUpdatedMapBoxAccessToken] = useState();
  const [existingConfig, setExistingConfig] = useState();
  const { db } = useContext(FirebaseContext);
  const { getActiveConfigSub, updateConfigValue } = configApi(db);
  useEffect(() => {
    if (user && user.isAdmin) { setIsAdmin(true) }
  }, [user]);

  useEffect(() => {
    getActiveConfigSub(setExistingConfig);
  }, [getActiveConfigSub])

  const onChangeApiKey = e => {
    setUpdatedMapBoxAccessToken(e.target.value);
  }

  const onSaveClick = async () => {
    await updateConfigValue({ mapBoxAccessToken: updatedMapBoxAccessToken });
    alert("saved successfully");
  }

  if (!isAdmin) return <div>you are not authorized</div>
  if (!existingConfig) return <Spinner />
  const { mapBoxAccessToken } = existingConfig.data();
  return (
    <Box sx={{ m: 1 }}>
      <h3>config</h3>
      <div>
        mapBoxAccessToken: <TextField placeholder="mapBoxAccessToken" defaultValue={mapBoxAccessToken} onChange={onChangeApiKey}></TextField>
      </div>
      <Button variant="contained" onClick={onSaveClick}>Save</Button>
    </Box>
  )
}

export default Config