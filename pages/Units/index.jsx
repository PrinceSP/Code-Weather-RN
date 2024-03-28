import React,{useState} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,Dimensions,SafeAreaView} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Header,CustomUnits} from '../../components'

const {width,fontScale} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor : "#121415"},
});

const Units = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const [temperature,setTemperature] = useState([
    {
      isActive:true,
      type:"metric",
      label:"temperature",
      name:"˚C"
    },
    {
      isActive:false,
      type:"imperial",
      label:"temperature",
      name:"˚F"
    }
  ])
  const [windSpeed,setWindSpeed] = useState([
    {
      isActive:true,
      type:"metric",
      label:"windSpeed",
      name:"m/s"
    },
    {
      isActive:false,
      type:"metric",
      label:"windSpeed",
      name:"km/h"
    },
    {
      isActive:false,
      type:"imperial",
      label:"windSpeed",
      name:"mph"
    }
  ])
  const [pressure,setPressure] = useState([
    {
      isActive:true,
      type:"hPa",
      label:"pressure",
      name:"hPa"
    },
    {
      isActive:false,
      type:"inHg",
      label:"pressure",
      name:"inHg"
    }
  ])
  const [precipitation,setPrecipitation] = useState([
    {
      isActive:true,
      type:"mm",
      label:"precipitation",
      name:"mm"
    },
    {
      isActive:false,
      type:"in",
      label:"precipitation",
      name:"in"
    }
  ])
  const [distance,setDistance] = useState([
    {
      isActive:true,
      type:"km",
      label:"distance",
      name:"km"
    },
    {
      isActive:false,
      type:"mi",
      label:"distance",
      name:"mi"
    }
  ])
  const [timeFormat,setTimeFormat] = useState([
    {
      isActive:true,
      type:"24h",
      label:"timeFormat",
      name:"24-hour"
    },
    {
      isActive:false,
      type:"12h",
      label:"timeFormat",
      name:"12-hour"
    }
  ])

  return (
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <Header navigation={navigation} title="Units"/>
      <View style={{paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Temperature</Text>
        <CustomUnits width="50%" data={temperature} setData={setTemperature}/>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Wind speed</Text>
        <CustomUnits width="33.33%" data={windSpeed} setData={setWindSpeed}/>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Pressure</Text>
        <CustomUnits width="50%" data={pressure} setData={setPressure}/>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Precipitation</Text>
        <CustomUnits width="50%" data={precipitation} setData={setPrecipitation}/>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Distance</Text>
        <CustomUnits width="50%" data={distance} setData={setDistance}/>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Time format</Text>
        <CustomUnits width="50%" data={timeFormat} setData={setTimeFormat}/>
      </View>

    </SafeAreaView>
  )
}

export default Units
