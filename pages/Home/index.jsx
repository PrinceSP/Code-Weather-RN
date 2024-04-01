import React,{useState,useEffect,useCallback} from "react"
import {View,Text,Modal,StyleSheet,Image,KeyboardAvoidingView,Platform,Pressable,TextInput,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6,AntDesign,Octicons } from '@expo/vector-icons';
import {LineChart} from "react-native-chart-kit";
import { useSelector,useDispatch } from 'react-redux';
import {ONECALL_API,GEOLOCATION_API, API_KEY} from "@env"
import {useGetData} from '../../custom-hooks'
import {splitDate,dailyChartdata,getStorageData} from '../../functions'
import {data,compassSector,chartConfig} from '../../configs'
import {HourlyWeather,LocationPlace,SearchHeader,CurrentTemperature,CurrentTempStats,PrecipitationGraph,FindLocation} from '../../components'
import { getCoords } from '../../store/currentCoordinates';

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
  }
});

const Home = ({navigation})=>{
  const dispatch = useDispatch()
  const unitDatas = useSelector(state => state.units);
  const coordDatas = useSelector(state => state.coords);
  const [dailyStats,setDailyStats] = useState(false)
  const [coordinates,setCoordinates] = useState({
    lat:coordDatas.lat,
    lon:coordDatas.lon,
    place:coordDatas.place
  })
  const currentDatas = useGetData(`${process.env.ONECALL_API}?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unitDatas.temperature}&speed=${unitDatas.windSpeed}&pressure=${unitDatas.pressure}&appid=${process.env.API_KEY}`)
  const [dailyDatas,setDailyDatas] = useState(currentDatas?.daily)
  const insets = useSafeAreaInsets()
  const fetchToken = async () => {
    try {
      const token = await getStorageData();
      if (token) {
        setCoordinates({
          lat: token.lat,
          lon: token.lon,
          place: token.place,
        });
      }
    } catch (e) {
      return e
    }

  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    setCoordinates({
      lat: coordDatas.lat,
      lon: coordDatas.lon,
      place: coordDatas.places
    });
  }, [coordDatas]);

  return(
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>navigation.navigate("SearchLocation")}>
          <AntDesign name="search1" size={24} color="#fff" />
          <Text style={{color:"#fff",marginLeft:2,fontSize:22/fontScale}}>{coordinates?.place}</Text>
        </TouchableOpacity>
        <FontAwesome6 name="sliders" size={24} color="#fff" onPress={()=>navigation.navigate("Settings")}/>
      </View>
      <ScrollView style={{paddingHorizontal:7,marginTop:37,paddingBottom:100}}>
        <CurrentTemperature currentDatas={currentDatas} unitDatas={unitDatas}/>
        <PrecipitationGraph/>
        <CurrentTempStats currentDatas={currentDatas} unitDatas={unitDatas}/>
        <FlatList
          data={currentDatas?.hourly}
          renderItem={({item})=><HourlyWeather item={item} unit={unitDatas.temperature==="metric" ? "˚C" : "˚F"}/>}
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
                <Text style={{color:"#fff",fontSize:16/fontScale}}>{dailyDatas.temp.max.toFixed(0)} / {dailyDatas.temp.min.toFixed(0)} {unitDatas.temperature==="metric" ? "˚C" : "˚F"}</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${dailyDatas.weather[0].icon}.png` }} style={{ width: 38, height: 38, marginLeft:5,marginRight:10 }} />
              </View>
            </View>
            <LineChart
              yAxisSuffix="mm"
              style={{fontSize:8/fontScale}}
              data={dailyChartdata(currentDatas)}
              width={width}
              height={160}
              fromZero={true}
              withVerticalLabels={true}
              chartConfig={chartConfig}
              bezier
            />
            <CurrentDailyStats dailyDatas={dailyDatas}/>
          </View>
          :
          (currentDatas?.daily?.length > 0  ? currentDatas?.daily.map((item)=>(
            <TouchableOpacity key={item.dt} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:10}} onPress={()=>{
              setDailyStats(true)
              setDailyDatas(item)
            }}>
              <Text style={{color:"#fff",fontSize:16/fontScale}}>{splitDate(item.dt).dayMonth}</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:"#fff",fontSize:16/fontScale}}>{item.temp.max.toFixed(0)} / {item.temp.min.toFixed(0)} {unitDatas.temperature==="metric" ? "˚C" : "˚F"}</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ width: 38, height: 38, marginLeft:5,marginRight:10 }} />
                <Octicons name="chevron-right" size={24} color="#888"/>
              </View>
            </TouchableOpacity>
          )) : null)
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
