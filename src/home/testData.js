const getTestDocument = () => {
  const data = getTemplate();
  for (var i = 0; i < 150; i++) {
    data.push(["test", "123 fake st", "5"])
  }
  return data;
}


export const getSampleDocument = () => {
  return [
    ["name", "address", "cans", "long", "lat"],
    ["boyd", "869 Ravine Drive, Cleveland Heights, Ohio 44112, United States", 3, -81.5644634, 41.5365342],
    ["denison", "1015 Quarry Drive, Cleveland Heights, Ohio 44121, United States", 6, -81.5319582, 41.5345663],
    ["cumberland", "1740 Cumberland Road, Cleveland Heights, Ohio 44118, United States", 7, -81.5697606, 41.5123942],
    ["cain", "2004 South Taylor Road, Cleveland Heights, Ohio 44118, United States", 1, -81.5593926, 41.5068079],
    ["forest hills", "1 Monticello Boulevard, Cleveland Heights, Ohio 44118, United States", 54, -81.578608, 41.5222813]
  ]
}

const getTemplate = () => {
  return [["name", "address", "cans"]];
}
export const getOriginCoords = () => {
  return [-81.673584, 41.512393]
}

export const getOrders = () => {
  const dataRows = [
    {
      id: 1, timeReady: new Date("2/22/2023 18:12:00"),
      lastName: "Forest",
      coords: [-81.578608, 41.5222813]
    },
    {
      id: 2, timeReady: new Date("2/22/2023 10:33:00"),
      lastName: "Cain",
      coords: [-81.5593926, 41.5068079]
    },
    {
      id: 3, timeReady: new Date("2/23/2023 06:07:00"),
      lastName: "Cumberland",
      coords: [-81.5697606, 41.5123942]
    },
    {
      id: 4, timeReady: new Date("2/24/2023 17:24:00"),
      lastName: "Boyd",
      coords: [-81.5644634, 41.5365342]
    },
    {
      id: 5, timeReady: new Date("2/26/2023 09:30:00"),
      lastName: "Denison",
      coords: [-81.5319582, 41.5345663]
    },
  ];
  return dataRows
}

export const confirmAddress = async (inputValue) => {
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&polygon_geojson=1&addressdetails=1&limit=1`
  const responseString = await fetch(nominatimUrl);
  const response = await responseString.json();
  if (response && response.length > 0) {
    const address = response[0];
    return address;
  }
}

export { getTemplate, getTestDocument };

