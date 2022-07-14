function formatDate (input) {
  var datePart = input.match(/\d+/g),
  year = datePart[0],
  month = datePart[1], day = datePart[2];

  return day+'/'+month+'/'+year;
}

export {formatDate}