import React from 'react'
import {Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import { Octicons } from '@expo/vector-icons';

const {fontScale} = Dimensions.get('window')

const SettingMenu = ({navigation,screen,title}) => {
  return (
    <TouchableOpacity style={{paddingHorizontal:6,paddingVertical:12,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}
      onPress={()=>navigation.navigate(screen)}>
      <Text style={{color:"#ccc",fontSize:16/fontScale}}>{title}</Text>
      <Octicons name="chevron-right" size={28} color="#ccc" />
    </TouchableOpacity>
  )
}

export default SettingMenu
