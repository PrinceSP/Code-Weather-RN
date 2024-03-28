function splitDate(unixTime){
  const exactDate = new Date(unixTime * 1000);
  const dayMonth = exactDate.toDateString().split(" ").slice(0,-1).join(" ")
  const dayDate = exactDate.toDateString().split(" ").slice(0,1).join(" ")
  const date = exactDate.toDateString().split(" ").slice(2,3).join(" ")
  const hours = exactDate.getHours()
  const minutes = exactDate.getMinutes()

  return {dayMonth,dayDate,date,hours,minutes}
}

export default splitDate
