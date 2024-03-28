import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import {compassSector} from '../../../configs/'

const {width,fontScale} = Dimensions.get('window')


const CurrentTempStats = ({currentDatas,unitDatas}) => {
  const styles = StyleSheet.create({
    container:{flexDirection:'row',flexWrap:"wrap",alignItems:'center',justifyContent:'space-between',backgroundColor:"rgba(60,60,60,0.5)",padding:10,borderRadius:10,marginTop:40},
    text:{marginBottom:20,color:"#fff",fontSize:15/fontScale},
    locationArrow:{transform: [{rotate: `${currentDatas?.current?.wind_deg}deg`}]}
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Wind: {currentDatas?.current?.wind_speed}m/s {compassSector[(currentDatas?.current?.wind_deg / 22.5).toFixed(0)]}
        {` `}<FontAwesome6 name="location-arrow" size={18} color="#aaa" style={styles.locationArrow}/>
      </Text>
      <Text style={styles.text}>Humidity: {currentDatas?.current?.humidity}%</Text>
      <Text style={styles.text}>UV index: {currentDatas?.current?.uvi}</Text>
      <Text style={styles.text}>Pressure: {currentDatas?.current?.pressure}hPa</Text>
      <Text style={styles.text}>Visibility: {currentDatas?.current?.visibility}km</Text>
      <Text style={styles.text}>Dew point: {currentDatas?.current?.dew_point}{unitDatas.temperature==="metric" ? "˚C" : "˚F"}</Text>
    </View>
  )
}

export default CurrentTempStats
