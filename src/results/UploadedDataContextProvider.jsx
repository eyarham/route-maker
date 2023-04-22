import React, { createContext, useEffect, useState } from 'react';
import Spinner from '../_utils/Spinner';

export const UploadedDataContext = createContext();
const UploadedDataContextProvider = ({ children }) => {
  const [uploadedData, setUploadedData] = useState();

  const [value, setValue] = useState({ setUploadedData });

  useEffect(() => {
    setValue({ setUploadedData, uploadedData })
  }, [uploadedData])
  if (!setUploadedData) return <Spinner />
  return (
    <UploadedDataContext.Provider value={value}>
      {children}
    </UploadedDataContext.Provider>
  )
}

export default UploadedDataContextProvider