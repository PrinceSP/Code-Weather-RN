import React,{useState,useEffect,memo} from "react"
import {View,Text,Modal,StyleSheet,Image,KeyboardAvoidingView,Platform,Pressable,TextInput,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6,AntDesign,Octicons } from '@expo/vector-icons';
import {LineChart} from "react-native-chart-kit";
import {useGetData} from '../../custom-hooks'
import {ONECALL_API,GEOLOCATION_API, API_KEY} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height,fontScale} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{height:"100%", backgroundColor : "#121415"},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width,
    paddingHorizontal: 17,
    backgroundColor: "#121415"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"121415",
  },
  modalView: {
    width,
    height,
    backgroundColor: '#121415',
    borderRadius: 4,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(170, 170, 170, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  withDots:false
};

const HourlyWeather = memo(({ item })=>{
  const unixTime = item.dt;
  const exactDate = new Date(unixTime * 1000);
  const time = exactDate.getHours().toString().padStart(2, '0') + ":" + exactDate.getMinutes().toString().padStart(2, '0');

  return (
    <View key={item.dt} style={{ alignItems: 'center', justifyContent: 'space-between', paddingVertical: 2, marginVertical: 20, marginRight: 10 }}>
      <Text style={{ color: "#505050" }}>{time}</Text>
      <Image source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ width: 35, height: 35 }} />
      <Text style={{ color: "#fff" }}>{item.temp.toFixed(0)}˚F</Text>
    </View>
  );
});

async function getStorageData(){
  try {
    const getToken = await AsyncStorage.getItem('location');
    if (getToken !== null) {
      const token = JSON.parse(getToken);
      return token;
    } else {
      return null; // or handle the case where data is not available
    }
  } catch (error) {
    return null; // or handle the error as appropriate
  }
}

const Home = ({navigation})=>{
  const locationDatas = useGetData(`${process.env.GEOLOCATION_API}?q=${searchQuery}&limit=10&appid=${process.env.API_KEY}`)
  const [modalVisible,setModalVisible] = useState(false)
  const [searchQuery,setQuery] = useState("")
  const [dailyStats,setDailyStats] = useState(false)
  const [coordinates,setCoordinates] = useState({
    lat:null,
    lon:null,
    place:null
  })
  const currentDatas = useGetData(`${process.env.ONECALL_API}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.API_KEY}&units=metric`)
  const [dailyDatas,setDailyDatas] = useState(currentDatas?.daily)
  const insets = useSafeAreaInsets()

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [0.5,1],
        withDots: false,
        strokeWidth: 1 // optional
      }
    ],
  };

  const daily={
    labels:currentDatas?.daily.map(item=>splitDate(item.dt).hours+":"+splitDate(item.dt).minutes),
    datasets:[{data:currentDatas?.daily.map(item=>item.temp.day.toFixed(0))}]
  }

  const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

  function splitDate(unixTime){
    const exactDate = new Date(unixTime * 1000);
    const dayMonth = exactDate.toDateString().split(" ").slice(0,-1).join(" ")
    const dayDate = exactDate.toDateString().split(" ").slice(0,1).join(" ")
    const date = exactDate.toDateString().split(" ").slice(2,3).join(" ")
    const hours = exactDate.getHours()
    const minutes = exactDate.getMinutes()

    return {dayMonth,dayDate,date,hours,minutes}
  }

  const setLocationCoor = async (item) => {
    setCoordinates({...coordinates,lat:item.lat,lon:item.lon,place:item.name+", "+item.state})
    const value = {
      lat:item.lat,
      lon:item.lon,
      place:item.name+", "+item.state
    }
    const jsonValue = JSON.stringify(value); // Stringify the value before storing
    try {
      await AsyncStorage.setItem('location', jsonValue);
      setModalVisible(false)
    } catch (e) {
      return e;
    }
  }

  useEffect(() => {
    // Fetch token from AsyncStorage and update coordinates if available
    const fetchToken = async () => {
      const token = await getStorageData();
      if (token) {
        setCoordinates({
          lat: token.lat,
          lon: token.lon,
          place: token.place,
        });
      }
    };

    fetchToken();
  }, []);

  return(
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          >
            <ScrollView contentContainerStyle={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: "90%", flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 20, backgroundColor: "#47484955" }}>
                  <AntDesign name="search1" size={25} color="#aaa" />
                  <TextInput
                    defaultValue={searchQuery}
                    onChangeText={(value)=>setQuery(value)}
                    placeholder="Search"
                    placeholderTextColor="#aaa"
                    style={{ color:"#fff",width: "90%", fontSize: 18 / fontScale, marginLeft: 10 }}
                  />
                </View>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{ color: "#fff", fontSize: 18 }}>X</Text>
                </Pressable>
              </View>
              {locationDatas?.length > 0 ? locationDatas?.map((item) =>
                <View key={item.lat} style={{ height: 50, width: '100%', alignItems:'center',justifyContent:'space-between',flexDirection:'row',padding: 10, borderBottomStyle: "solid", borderBottomColor: "#fff", borderBottomWidth: 1 }}>
                  <TouchableOpacity style={{alignItems:'center',flexDirection:'row'}} onPress={()=>setLocationCoor(item)}>
                    <Image source={{ uri: `https://flagsapi.com/${item.country}/flat/64.png` }} style={{ height: 28, width: 28 }} />
                    <Text style={{color:"#fff",marginLeft:10}}>{`${item.name}, ${item.state}`}</Text>
                  </TouchableOpacity>
                  <FontAwesome6 name="star" size={18} color="#ddd"/>
                </View>) : null
              }
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>setModalVisible(true)}>
          <AntDesign name="search1" size={24} color="#fff" />
          <Text style={{color:"#fff",marginLeft:2,fontSize:22/fontScale}}>{coordinates.place}</Text>
        </TouchableOpacity>
        <FontAwesome6 name="sliders" size={24} color="#fff" onPress={()=>navigation.navigate("Settings")}/>
      </View>
      <ScrollView style={{paddingHorizontal:7,marginTop:37,paddingBottom:100}}>
        <View style={{alignSelf:'center',alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <Image source={{uri:`https://openweathermap.org/img/wn/${currentDatas?.current?.weather[0].icon}.png`}} style={{width:40,height:40}}/>
            <View>
              <Text style={{color:"#fff"}}>{currentDatas?.current?.weather[0]?.main}</Text>
              <Text style={{color:"#505050"}}>{currentDatas?.current?.weather[0]?.description}</Text>
            </View>
          </View>
          <Text style={{fontSize:80/fontScale,color:"#fff"}}>{currentDatas?.current?.temp.toFixed(0)}˚C</Text>
          <Text style={{color:"#505050"}}>Feels like {currentDatas?.current?.feels_like.toFixed(0)}˚C</Text>
        </View>

        <View style={{width,alignItems:'center',marginTop:50}}>
          <Text style={{marginBottom:20,color:"#fff",fontSize:16/fontScale,}}>No precipitation within an hour</Text>
          <LineChart
            yLabelsOffset={-20}
            yAxisSuffix="mm/h"
            style={{fontSize:10/fontScale}}
            data={data}
            width={width}
            height={160}
            fromZero={true}
            withVerticalLabels={true}
            chartConfig={chartConfig}
            bezier
          />
        </View>

        <View style={{flexDirection:'row',flexWrap:"wrap",alignItems:'center',justifyContent:'space-between',backgroundColor:"rgba(60,60,60,0.5)",padding:10,borderRadius:10,marginTop:40}}>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>
            Wind: {currentDatas?.current?.wind_speed}m/s {compassSector[(currentDatas?.current?.wind_deg / 22.5).toFixed(0)]}
            {` `}<FontAwesome6 name="location-arrow" size={18} color="#aaa" style={{transform: [{rotate: `${currentDatas?.current?.wind_deg}deg`}]}}/>
          </Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Humidity: {currentDatas?.current?.humidity}%</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>UV index: {currentDatas?.current?.uvi}</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Pressure: {currentDatas?.current?.pressure}hPa</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Visibility: {currentDatas?.current?.visibility}km</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Dew point: {currentDatas?.current?.dew_point}˚C</Text>
        </View>

        <FlatList
          data={currentDatas?.hourly}
          renderItem={({item})=><HourlyWeather item={item}/>}
          keyExtractor={(item) => item.dt.toString()}
          horizontal
          maxToRenderPerBatch={7}
        />

        { dailyStats===true ?
          <View style={{marginBottom:20,marginHorizontal:7}}>
            <View style={{marginBottom:10,paddingBottom:10,flexDirection:"row",alignItems:'center',justifyContent:'space-between',borderBottomColor:"#fff",borderBottomWidth:1,borderBottomStyle:"solid"}}>
              <View style={{flexDirection:'row'}}>
                {currentDatas?.daily.map((item,index)=>(
                  <TouchableOpacity
                    key={item.dt}
                    style={{alignItems:'center',paddingHorizontal:4,paddingVertical:6,backgroundColor:item.dt===dailyDatas.dt ? "#47484988" :  "#0000",borderRadius:6,width:37,margin:0}}
                    onPress={()=>setDailyDatas(item)}
                    >
                    <Text style={{color:"#777",fontSize:13/fontScale}}>{splitDate(item.dt).dayDate}</Text>
                    <Text style={{color:item.dt===dailyDatas.dt ? "#fff" : "#777",fontSize:13/fontScale}}>{splitDate(item.dt).date}</Text>
                  </TouchableOpacity>)
                )}
              </View>
              <FontAwesome6 name="list" size={18} color="#fff" onPress={()=>setDailyStats(false)}/>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,marginBottom:25}}>
              <View>
                <Text style={{color:"#fff",fontSize:16/fontScale,fontWeight:"800"}}>{dailyDatas.weather[0].main}</Text>
                <Text style={{color:"#babeb4",fontSize:14/fontScale}}>{dailyDatas.weather[0].description}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:"#fff",fontSize:16/fontScale}}>{dailyDatas.temp.max.toFixed(0)} / {dailyDatas.temp.min.toFixed(0)} ˚F</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${dailyDatas.weather[0].icon}.png` }} style={{ width: 38, height: 38, marginLeft:5,marginRight:10 }} />
              </View>
            </View>
            <LineChart
              yAxisSuffix="mm"
              style={{fontSize:8/fontScale}}
              data={daily}
              width={width}
              height={160}
              fromZero={true}
              withVerticalLabels={true}
              chartConfig={chartConfig}
              bezier
            />
            <View style={{marginTop:20}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
                <Text style={{color:"#fff"}}>Precipitation</Text>
                <Text style={{color:"#fff"}}>-</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
                <Text style={{color:"#fff"}}>Probability of precipitation</Text>
                <Text style={{color:"#fff"}}>-</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
                <Text style={{color:"#fff"}}>Wind</Text>
                <Text style={{color:"#fff"}}>
                  {dailyDatas?.wind_speed}m/s {compassSector[(dailyDatas?.wind_deg / 22.5).toFixed(0)]}
                  {` `}<FontAwesome6 name="location-arrow" size={18} color="#aaa" style={{transform: [{rotate: `${dailyDatas?.wind_deg}deg`}]}}/>
                </Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
                <Text style={{color:"#fff"}}>Pressure</Text>
                <Text style={{color:"#fff"}}>{dailyDatas?.pressure}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
                <Text style={{color:"#fff"}}>Humidity</Text>
                <Text style={{color:"#fff"}}>{dailyDatas?.humidity}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
                <Text style={{color:"#fff"}}>UV index</Text>
                <Text style={{color:"#fff"}}>{dailyDatas?.uvi}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:20}}>
                <Text style={{color:"#fff"}}>Sunrise</Text>
                <Text style={{color:"#fff"}}>{splitDate(dailyDatas?.sunrise).hours}:{splitDate(dailyDatas?.sunrise).minutes}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:20}}>
                <Text style={{color:"#fff"}}>Sunset</Text>
                <Text style={{color:"#fff"}}>{splitDate(dailyDatas?.sunset).hours}:{splitDate(dailyDatas?.sunrise).minutes}</Text>
              </View>
            </View>
          </View>
          :
          currentDatas?.daily.map((item)=>(
            <TouchableOpacity key={item.dt} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:10}} onPress={()=>{
              setDailyStats(true)
              setDailyDatas(item)
            }}>
              <Text style={{color:"#fff",fontSize:16/fontScale}}>{splitDate(item.dt).dayMonth}</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:"#fff",fontSize:16/fontScale}}>{item.temp.max.toFixed(0)} / {item.temp.min.toFixed(0)} ˚F</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ width: 38, height: 38, marginLeft:5,marginRight:10 }} />
                <Octicons name="chevron-right" size={24} color="#888"/>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
