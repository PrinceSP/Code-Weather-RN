import React,{useState} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,Dimensions,SafeAreaView} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Header} from '../../components'

const {width,fontScale} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor : "#121415"},
});

const Units = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const [temperature,setTemperature] = useState([
    celcius:{
      isActive:true,
      type:"metrics",
      name:"˚C"
    },
    fahrenheit:{
      isActive:false,
      type:"imperial",
      name:"˚F"
    }
  ])
  const [windSpeed,setWindSpeed] = useState({
    ms:{
      isActive:true
      type:"m/s"
    },
    kmh:{
      isActive:false
      type:"km/h"
    },
    mph:{
      isActive:false
      type:"mph"
    }
  })
  const handlePress = (index) => {
    setTemperature(prevConditions =>
      prevConditions.map((item, idx) => ({
        ...item,
        isActive: idx === index,
      }))
    );
  };
  return (
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <Header navigation={navigation} title="Units"/>
      <View style={{paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Temperature</Text>
          <View style={{width:'50%',flexDirection:'row',padding:4,borderRadius:6,backgroundColor:"rgba(100, 100, 100, 0.16)"}}>
            {temperature.maps((item,index)=><TouchableOpacity style={{width:'50%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:item.isActive === true ? "#77777755" : "rgba(0,0,0,0)",borderRadius:3}} onPress={()=>setTemperature({...temperature,isActiveeeeereere})}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>{item.name}</Text>
            </TouchableOpacity>)}
          </View>
      </View>

      <View style={{marginTop:12,paddingHorizontal:6,paddingVertical:10,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={{color:"#ccc",fontSize:16/fontScale}}>Wind speed</Text>
          <View style={{width:'50%',flexDirection:'row',padding:4,borderRadius:6,backgroundColor:"rgba(100, 100, 100, 0.16)"}}>
            <TouchableOpacity style={{width:'33.33%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>m/s</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'33.33%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>km/h</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'33.33%',paddingVertical:2,alignItems:'center',justifyContent:'center',backgroundColor:"#77777755",borderRadius:3}}>
              <Text style={{color:"#ccc",fontSize:14/fontScale}}>mph</Text>
            </TouchableOpacity>
          </View>
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
