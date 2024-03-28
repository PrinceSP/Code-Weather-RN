import React, {memo} from "react"
import {View,Text,Image} from "react-native"

const HourlyWeather = memo(({ item,unit })=>{
  const unixTime = item.dt;
  const exactDate = new Date(unixTime * 1000);
  const time = exactDate.getHours().toString().padStart(2, '0') + ":" + exactDate.getMinutes().toString().padStart(2, '0');

  return (
    <View key={item.dt} style={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 2, marginVertical: 20, marginRight: 10 }}>
      <Text style={{ color: "#505050" }}>{time}</Text>
      <Image source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ width: 35, height: 35 }} />
      <Text style={{ color: "#fff" }}>{item.temp.toFixed(0)}{unit}</Text>
    </View>
  );
});

export default HourlyWeather
