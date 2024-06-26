import React from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,Dimensions,SafeAreaView} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import openweatherFullLogo from "../../assets"
import {Header,SettingMenu} from '../../components'

const {width,fontScale} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor : "#121415"},
  content:{
    width,
    backgroundColor : "#121415",
    paddingHorizontal:7,
    marginTop:37
  }
});

const Settings = ({navigation}) => {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <Header navigation={navigation} title="Settings"/>
      <View style={styles.content}>
        <SettingMenu navigation={navigation} screen="DifferentWeather" title="Different weather?"/>
        <SettingMenu navigation={navigation} screen="Units" title="Units"/>
        <View style={{width:width*0.85,marginVertical:10,marginLeft:6,paddingVertical:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
          <Text style={{color:"#ccc",fontSize:16/fontScale}}>Data</Text>
          <Text style={{color:"#707070",fontSize:16/fontScale}}>One Call API™</Text>
        </View>
        <Text style={{width:width*0.80,marginLeft:6,color:"#ccc",fontSize:16/fontScale,lineHeight:25,textAlign:'justify'}}>
          All the data for OpenWeather App is provided
          by One Call API™.
          OpenWeather aggregates and processes meteorological data from tens
          of thousands of weather stations, on-ground
          radars and satellites to bring you accurate
          and actionable weather data for any location
          worldwide.
        </Text>
        <Image style={{marginLeft:6,marginTop:12,height:60,width:100}} source={require('../../assets/openweatherFullLogo.png')}/>

      </View>
    </SafeAreaView>
  )
}

export default Settings
