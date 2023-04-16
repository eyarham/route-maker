export const getReadableTime = dateTime => {
  if (!dateTime) return "?"
  if (dateTime.seconds > 0)//is nt
    dateTime = getTimeFromNt(dateTime);
  const returnString = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}, ${getTwoDigit(dateTime.getHours())}:${getTwoDigit(dateTime.getMinutes())}`;
  return returnString;
}
const getTwoDigit = num => {
  if (num > 9) return num
  else return `0${num}`
}

const getTimeFromNt = nt => {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(nt.seconds);
  return t;
}

export const renderTimeCell = (e) => {
  if (!e || !e.value) return "?"

  const dateTime = getTimeFromNt(e.value)
  const returnString = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}, ${getTwoDigit(dateTime.getHours())}:${getTwoDigit(dateTime.getMinutes())}`;
  return returnString;
}