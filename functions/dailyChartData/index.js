export default function dailyChartData(currentDatas) {
  const daily={
    labels:currentDatas?.daily.map(item=>splitDate(item.dt).hours+":"+splitDate(item.dt).minutes),
    datasets:[{data:currentDatas?.daily.map(item=>item.temp.day.toFixed(0))}]
  }

  return daily
}
