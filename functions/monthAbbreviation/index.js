const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function splitGetMonth(e){
  const values = e.target.value.split("-")
  const getMonths = Number(values[1])
  values.splice(1,1,months[getMonths-1])
  const result = values.join('-')
  return result;
}
