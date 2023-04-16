import React, { createContext, useContext } from 'react';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import Spinner from '../_utils/Spinner';
import configsApi from './_api';

export const ConfigsApiContext = createContext();
const ConfigsApiContextProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const api = configsApi(db);
  if(!api) return <Spinner />
  return (
    <ConfigsApiContext.Provider value={api}>
      {children}
    </ConfigsApiContext.Provider>
  )
}

export default ConfigsApiContextProvider