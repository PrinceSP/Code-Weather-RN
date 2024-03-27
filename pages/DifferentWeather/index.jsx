import React,{useState} from "react"
import {View,Text,Modal,TextInput,Pressable,StyleSheet,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,Image,Button,Alert} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Header,Checkbox} from '../../components'
import Slider from '@react-native-community/slider'

const {width,fontScale} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{height:"100%", backgroundColor : "#121415"},
  input:{
    borderRadius:10,
    backgroundColor:"rgba(160,160,160,0.1)",
    color:"#fff",
    fontSize:18/fontScale,
    paddingHorizontal:8,
    paddingVertical:10,
    marginVertical:15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:"rgba(0,0,0,0.7)"
  },
  modalView: {
    width:"80%",
    height:140,
    margin: 20,
    backgroundColor: '#606060',
    borderRadius: 4,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const CloudSkyItem = ({bgOn,title="clear sky",image,onPress}) => {
  return(
    <TouchableOpacity style={{width:120,paddingTop:10,paddingBottom:4,marginBottom:8,paddingHorizontal:6,borderRadius:8,alignItems:'center',backgroundColor:bgOn === true ? "rgba(230, 230, 230, 0.3)" : "rgba(230, 230, 230, 0)"}} onPress={onPress}>
      <Image source={{uri:`https://openweathermap.org/img/wn/${image}.png`}} style={{width:40,height:40}}/>
      <Text style={{color:"#cecece"}}>{title}</Text>
    </TouchableOpacity>
  )
};

const DifferentWeather = ({navigation})=>{
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
  const [temperature,setTemperature] = useState(0)
  const [wind,setWind] = useState(0)
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")
  const [modalVisible,setModalVisible] = useState(false)
  const [dataSource, setDataSource] = useState({
    personal_feeling:false,
    own_station:false,
    local_weather:false,
    global_weather:false,
    other:false
  });

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
    <SafeAreaView style={[styles.container,{paddingTop: insets.top,paddingBottom:20}]}>
      <Header navigation={navigation} title="Different weather?"/>
      <Modal

        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color:"#fff",fontSize:20/fontScale}}>Thank you!</Text>
            <Text style={{color:"#fff",fontSize:14/fontScale}}>your feedback has been sent</Text>
            <Pressable
              style={{position:'absolute',right:15,bottom:15}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color:"#fff"}}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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

        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',marginTop:50,marginBottom:10}}>
          <Text style={{color:"#fff"}}>Temperature:</Text>
          <Text style={{color:"#606060"}}>{temperature}˚F</Text>
        </View>
        <Slider
          style={{width:"100%",height: 40,paddingHorizontal:8}}
          minimumValue={62-20}
          lowerLimit={62-20}
          maximumValue={62+20}
          upperLimit={62+20}
          value={62}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value)=>setTemperature(value.toFixed(0))}
        />
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:"#606060"}}>42˚F</Text>
          <Text style={{color:"#606060"}}>62˚F</Text>
          <Text style={{color:"#606060"}}>82˚F</Text>
        </View>

        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',marginTop:50,marginBottom:10}}>
          <Text style={{color:"#fff"}}>Wind:</Text>
          <Text style={{color:"#606060"}}>{wind===1?"Light":(wind===2?"Moderate":"Strong")}</Text>
        </View>
        <Slider
          style={{width:"100%",height: 40,paddingHorizontal:8}}
          minimumValue={1}
          maximumValue={3}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value)=>setWind(value)}
        />
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:"#606060"}}>Light</Text>
          <Text style={{color:"#606060"}}>Moderate</Text>
          <Text style={{color:"#606060"}}>Strong</Text>
        </View>

        <View style={{marginTop:28}}>
          <TextInput
            style={styles.input}
            onChangeText={(value)=>setEmail(value)}
            defaultValue={email}
            placeholder="Email (optional)"
            placeholderTextColor="#bebebe"
          />
          <TextInput
            style={[styles.input,{textAlignVertical:'top'}]}
            onChangeText={(value)=>setMessage(value)}
            defaultValue={message}
            placeholder="Message (optional)"
            placeholderTextColor="#bebebe"
            multiline={true}
            numberOfLines={5}
          />
        </View>

        <View style={{marginTop:30}}>
          <View style={{marginBottom:20,paddingHorizontal:6,paddingVertical:12,borderBottomWidth:1,borderBottomColor:"#ccc",borderBottomStyle:"solid",alignItems:'center',justifyContent:'space-between',flexDirection:'row'}} onPress={()=>navigation.navigate("DifferentWeather")}>
            <Text style={{color:"#ccc",fontSize:16/fontScale}}>Different weather?</Text>
          </View>
          <Checkbox label="Personal Feelings" onChange={()=>setDataSource((value)=>({...value,personal_feeling:!value.personal_feeling}))} checked={dataSource.personal_feeling}/>
          <Checkbox label="Own weather station or devices" onChange={()=>setDataSource((value)=>({...value,own_station:!value.own_station}))} checked={dataSource.own_station}/>
          <Checkbox label="Local weather provider" onChange={()=>setDataSource((value)=>({...value,local_weather:!value.local_weather}))} checked={dataSource.local_weather}/>
          <Checkbox label="Global weather provider" onChange={()=>setDataSource((value)=>({...value,global_weather:!value.global_weather}))} checked={dataSource.global_weather}/>
          <Checkbox label="Other" onChange={()=>setDataSource((value)=>({...value,other:!value.other}))} checked={dataSource.other}/>
        </View>

        <Button
          title="SEND"
          color="#f194ff"
          onPress={() => setModalVisible(true)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default DifferentWeather
