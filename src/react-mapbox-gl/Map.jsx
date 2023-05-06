import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

const Map = ({ mapBoxAccessToken, children }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-81.577167);
  const [lat, setLat] = useState(41.508132);
  const [zoom, setZoom] = useState(11);
  const [ready, setReady] = useState();

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('styledata', function () {
      setReady(true)
    });
  })

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
    setReady(true)
  }

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: 250 }} >
        {ready && children}
      </div>
      <Button onClick={onRefreshClick}>refresh</Button>
    </div>
  )
}

export default Map