import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ConfigContext } from '../config/ConfigContextProvider';

const DeliveryMap = ({ pinCoords, routeCoords }) => {
  const { mapBoxAccessToken } = useContext(ConfigContext);
  mapboxgl.accessToken = mapBoxAccessToken
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
    routeCoords && addRouteToMap(routeCoords);
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
  }, [pinCoords,routeCoords, styleLoaded])

  const addRouteToMap = (coordinates) => {
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    };
    if (map.current.getLayer('route')) {
      map.current.getSource('route').setData(geojson);
    } else {
    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
    }
  }

  const getFeature = geometry => {
    const feature = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: geometry.location
      }
    }
    return feature
  }


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
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

  const onRefreshClick= ()=>{    
    setStyleLoaded(true)
  }

  return (
    <div>
    <div
      ref={mapContainer}
      className="map-container"
      style={{ height: 250 }} />
      <Button onClick={onRefreshClick}>refresh</Button>
      </div>
  )
}

export default DeliveryMap