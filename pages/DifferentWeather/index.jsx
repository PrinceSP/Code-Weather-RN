import React,{useState} from "react"
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,FlatList,Image} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const {width,fontScale} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{height:"100%", backgroundColor : "#121415"},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    padding: 21,
    backgroundColor: "#121415"
  }
});

const CloudSkyItem = ({bgOn,title="clear sky",image,onPress}) => {
  return(
    <TouchableOpacity style={{width:120,paddingTop:10,paddingBottom:4,marginBottom:10,paddingHorizontal:6,borderRadius:4,alignItems:'center',backgroundColor:bgOn === true ? "rgba(230, 230, 230, 0.3)" : "rgba(230, 230, 230, 0)"}} onPress={onPress}>
      <Image source={{uri:`https://openweathermap.org/img/wn/${image}.png`}} style={{width:40,height:40}}/>
      <Text style={{color:"#cecece"}}>{title}</Text>
    </TouchableOpacity>
  )
};

const DifferentWeather = ()=>{
  const [weatherCondition,setWeatherCondition] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'clear sky',
      icon:"01d",
      isActive:true
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'few clouds',
      icon:"02d",
      isActive:false
    },
    {
      id: 'sdfsdz-3da1-471f-bd96-145571e29d72',
      title: 'overcast clouds',
      icon:"04d",
      isActive:false
    },
    {
      id: '58232314694a0f-3da1-sdf29082-bd96-145571e29d72',
      title: 'drizzle',
      icon:"09d",
      isActive:false
    },
    {
      id: '58694a0f-8n,m123-471f-bd96-145571e29d72',
      title: 'rain',
      icon:"10d",
      isActive:false
    },
    {
      id: '58694a0f-sdf-471f-bd96-lksdfj8723sdkh',
      title: 'shower rain',
      icon:"09d",
      isActive:false
    },
    {
      id: 'ndndndn-3da1-471f-bd96-s8j2wsxsfnsmdnf',
      title: 'thunderstorm',
      icon:"11d",
      isActive:false
    },
    {
      id: 'sdjfu89823u4ewkdjn-bd96-145571e29d72',
      title: 'snow',
      icon:"13d",
      isActive:false
    },
    {
      id: 'sdf-s234809dfjw-e=-d96-145571e29d72',
      title: 'mist',
      icon:"50d",
      isActive:false
    },
  ])
  const insets = useSafeAreaInsets()

  const handlePress = (index) => {
    setWeatherCondition(prevConditions =>
      prevConditions.map((item, idx) => ({
        ...item,
        isActive: idx === index,
      }))
    );
  };

  return(
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={26} color="#fff" />
        <Text style={{color:"#fff",marginLeft:40,fontSize:18/fontScale}}>Different Weather?</Text>
      </View>
      <ScrollView style={{paddingHorizontal:7,marginTop:37}}>
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:"#fff"}}>What is the sky like?</Text>
          <Text style={{color:"#606060"}}>Overcast clouds</Text>
        </View>

        <View style={{paddingHorizontal:8,paddingVertical:2,flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',backgroundColor:"rgba(170,170,170,0.1)"}}>
          {
            weatherCondition.map((item,index)=>(
              <CloudSkyItem
                key={item.id}
                bgOn={item.isActive}
                title={item.title}
                image={item.icon}
                onPress={()=>handlePress(index)}
              />
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DifferentWeather
