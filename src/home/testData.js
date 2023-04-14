const getTestDocument = () => {
  const data = getTemplate();
  for (var i = 0; i < 150; i++) {
    data.push(["test", "123 fake st", "5"])
  }
  return data;
}

const getTemplate = () => {
  return [["name", "address", "cans"]];
}

export { getTemplate, getTestDocument };

