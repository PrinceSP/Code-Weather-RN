import React from 'react'
import {View,Text,Dimensions,StyleSheet} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const {width,fontScale} = Dimensions.get('window')

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    padding: 21,
    backgroundColor: "#121415"
  }
});

const Header = ({navigation,title}) => {
  return (
    <View style={styles.header}>
      <AntDesign name="arrowleft" size={26} color="#fff" onPress={()=>navigation.goBack()}/>
      <Text style={{color:"#fff",marginLeft:40,fontSize:18/fontScale}}>{title}</Text>
    </View>
  )
}

export default Header
