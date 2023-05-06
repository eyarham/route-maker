import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ConfigContext } from '../config/ConfigContextProvider';

const StopsMap = ({ pinCoords }) => {
  const { mapBoxAccessToken } = useContext(ConfigContext);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-81.577167);
  const [lat, setLat] = useState(41.508132);
  const [zoom, setZoom] = useState(11);
  const [styleLoaded, setStyleLoaded] = useState();

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('styledata', function () {
      setStyleLoaded(true)
    });
  })

  useEffect(() => {
    if (!map.current || !styleLoaded) return; // wait for map to initialize
    const addPinsToMap = (coordsArr) => {
      const pointFeatures = coordsArr.map(getFeature)
      const pointFeatureColl = {
        type: 'FeatureCollection',
        features: pointFeatures
      };
      if (map.current.getLayer('end')) {
        map.current.getSource('end').setData(pointFeatureColl);
      } else {
        map.current.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: pointFeatureColl
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
    }
    pinCoords && addPinsToMap(pinCoords);
  }, [pinCoords, styleLoaded])


  const getFeature = geometry => {
    const feature = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: geometry
      }
    }
    return feature
  }


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: mapBoxAccessToken,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const onRefreshClick = () => {
    setStyleLoaded(true)
  }

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: 250 }} />
      <Button onClick={onRefreshClick}>refresh</Button>
      {/* <Map mapBoxAccessToken={mapBoxAccessToken}/> */}
    </div>
  )
}

export default StopsMap