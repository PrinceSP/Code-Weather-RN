import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import {splitDate} from '../../../functions'
import {compassSector} from '../../../configs'
import { FontAwesome6 } from '@expo/vector-icons';

const CurrentDailyStats = ({dailyDatas}) => {
  return (
    <View style={{marginTop:20}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
        <Text style={{color:"#fff"}}>Precipitation</Text>
        <Text style={{color:"#fff"}}>-</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
        <Text style={{color:"#fff"}}>Probability of precipitation</Text>
        <Text style={{color:"#fff"}}>-</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
        <Text style={{color:"#fff"}}>Wind</Text>
        <Text style={{color:"#fff"}}>
          {dailyDatas?.wind_speed}m/s {compassSector[(dailyDatas?.wind_deg / 22.5).toFixed(0)]}
          {` `}<FontAwesome6 name="location-arrow" size={18} color="#aaa" style={{transform: [{rotate: `${dailyDatas?.wind_deg}deg`}]}}/>
        </Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
        <Text style={{color:"#fff"}}>Pressure</Text>
        <Text style={{color:"#fff"}}>{dailyDatas?.pressure}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
        <Text style={{color:"#fff"}}>Humidity</Text>
        <Text style={{color:"#fff"}}>{dailyDatas?.humidity}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
        <Text style={{color:"#fff"}}>UV index</Text>
        <Text style={{color:"#fff"}}>{dailyDatas?.uvi}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
        <Text style={{color:"#fff"}}>Sunrise</Text>
        <Text style={{color:"#fff"}}>{splitDate(dailyDatas?.sunrise).hours}:{splitDate(dailyDatas?.sunrise).minutes}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:20}}>
        <Text style={{color:"#fff"}}>Sunset</Text>
        <Text style={{color:"#fff"}}>{splitDate(dailyDatas?.sunset).hours}:{splitDate(dailyDatas?.sunrise).minutes}</Text>
      </View>
    </View>
  )
}

export default CurrentDailyStats
