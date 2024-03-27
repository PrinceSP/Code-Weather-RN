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
      type:"metrics",
      name:"˚C"
    },
    {
      isActive:false,
      type:"imperial",
      name:"˚F"
    }
  ])

  const [windSpeed,setWindSpeed] = useState([
    {
      isActive:true,
      type:"m/s",
      name:"m/s"
    },
    {
      isActive:false,
      type:"km/h",
      name:"km/h"
    },
    {
      isActive:false,
      type:"mph",
      name:"mph"
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
          <View style={{width:'50%',flexDirection:'row',padding:4,borderRadius:6,backgroundColor:"rgba(100, 100, 100, 0.16)"}}>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>hPa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>inHg</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Precipitation</Text>
          <View style={{width:'50%',flexDirection:'row',padding:4,borderRadius:6,backgroundColor:"rgba(100, 100, 100, 0.16)"}}>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>hPa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>inHg</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Distance</Text>
          <View style={{width:'50%',flexDirection:'row',padding:4,borderRadius:6,backgroundColor:"rgba(100, 100, 100, 0.16)"}}>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>km</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>mi</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Distance</Text>
          <View style={{width:'50%',flexDirection:'row',padding:4,borderRadius:6,backgroundColor:"rgba(100, 100, 100, 0.16)"}}>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>24-hour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>12-hour</Text>
            </TouchableOpacity>
          </View>
      </View>

    </SafeAreaView>
  )
}

export default Units
