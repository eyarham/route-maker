import React, { createContext, useContext, useEffect, useState } from 'react';
import Spinner from '../_utils/Spinner';
import { ConfigsApiContext } from './ConfigsApiContextProvider';

export const ConfigContext = createContext();
const ConfigContextProvider = ({ children }) => {
  const [config, setConfig] = useState();
  const { getActiveConfigSub } = useContext(ConfigsApiContext);
  useEffect(() => {
    return getActiveConfigSub(doc => setConfig(doc.data()))
  }, [getActiveConfigSub])
  if (!config) return <Spinner />
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigContextProvider