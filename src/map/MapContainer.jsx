import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getDirections } from '../_common/directions'
import Spinner from '../_utils/Spinner'
import { ConfigContext } from '../config/ConfigContextProvider'
import DeliveryMap from './DeliveryMap'
import Instructions from './Instructions'

const MapContainer = ({ destinations, originCoords }) => {
  const [legs, setLegs] = useState()
  const [pinCoords, setPinCoords] = useState()
  const [routeCoords, setRouteCoords] = useState()
  const [hasRendered, setHasRendered] = useState(false)
  const { mapBoxAccessToken } = useContext(ConfigContext);
  useEffect(() => {
    if (!destinations || hasRendered) return
    const eff = async () => {
      const data = await getDirections(originCoords, destinations, mapBoxAccessToken);
      const { routes, waypoints } = data;
      const { legs, geometry } = routes[0];
      setPinCoords(waypoints);
      setRouteCoords(geometry.coordinates);
      setLegs(legs);
      setHasRendered(true);
    }
    eff();
  }, [destinations, hasRendered, originCoords, mapBoxAccessToken])
  if (!destinations || !pinCoords || !routeCoords) return <Spinner />
  return (
    <Grid container spacing={1} sx={{ height: 200 }}>
      <Grid item xs={6} xl={6}>
        <DeliveryMap pinCoords={pinCoords} />
      </Grid>
      <Grid item xs={6} xl={6}>
        <Instructions legs={legs} />
      </Grid>
    </Grid>
  )
}

export default MapContainer