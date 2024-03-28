import React from 'react'
import {View,Image,Text,Dimensions} from 'react-native'

const {width,fontScale} = Dimensions.get('window')

const CurrentTemperature = ({currentDatas,unitDatas}) => {
  return (
    <View style={{alignSelf:'center',alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
        <Image source={{uri:`https://openweathermap.org/img/wn/${currentDatas?.current?.weather[0].icon}.png`}} style={{width:40,height:40}}/>
        <View>
          <Text style={{color:"#fff"}}>{currentDatas?.current?.weather[0]?.main}</Text>
          <Text style={{color:"#505050"}}>{currentDatas?.current?.weather[0]?.description}</Text>
        </View>
      </View>
      <Text style={{fontSize:80/fontScale,color:"#fff"}}>{currentDatas?.current?.temp.toFixed(0)}{unitDatas.temperature==="metric" ? "˚C" : "˚F"}</Text>
      <Text style={{color:"#505050"}}>Feels like {currentDatas?.current?.feels_like.toFixed(0)}{unitDatas.temperature==="metric" ? "˚C" : "˚F"}</Text>
    </View>
  )
}

export default CurrentTemperature
