export const getDirections = async (origin, destinations, mapBoxAccessToken) => {

  const url = getUrl([origin, ...destinations, origin], mapBoxAccessToken)
  const query = await fetch(url);
  const json = await query.json();
  return json;
}


const getUrl = (coors, mapBoxAccessToken) => {
  if (!coors) return;
  //const coorString = '-81.673584,41.512393;-81.577167,41.508132'
  const coorString =  coors.join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coorString}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapBoxAccessToken}`
  return url;
}