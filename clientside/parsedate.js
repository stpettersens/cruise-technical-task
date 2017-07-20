function parseDate (datestr) {
  const date = new Date(Date.parse(datestr)).toDateString()
  let pdate = date.split(' ')
  pdate.shift()
  return pdate.join(' ')
}

parseDate('01-01-01')
