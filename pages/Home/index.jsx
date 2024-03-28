import React,{useState,useEffect,useCallback} from "react"
import {View,Text,Modal,StyleSheet,Image,KeyboardAvoidingView,Platform,Pressable,TextInput,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6,AntDesign,Octicons } from '@expo/vector-icons';
import {LineChart} from "react-native-chart-kit";
import { useSelector } from 'react-redux';
import {ONECALL_API,GEOLOCATION_API, API_KEY} from "@env"
import {useGetData} from '../../custom-hooks'
import {splitDate,dailyChartdata,getStorageData} from '../../functions'
import {data,compassSector,chartConfig} from '../../configs'
import {HourlyWeather,LocationPlace,SearchHeader,CurrentTemperature,CurrentTempStats,PrecipitationGraph} from '../../components'

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

const Home = ({navigation})=>{
  const unitDatas = useSelector(state => state.units);
  const [modalVisible,setModalVisible] = useState(false)
  const [searchQuery,setQuery] = useState("")
  const [dailyStats,setDailyStats] = useState(false)
  const [coordinates,setCoordinates] = useState({
    lat:null,
    lon:null,
    place:null
  })
  const [dailyDatas,setDailyDatas] = useState(currentDatas?.daily)
  const currentDatas = useGetData(`${process.env.ONECALL_API}?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unitDatas.temperature}&speed=${unitDatas.windSpeed}&pressure=${unitDatas.pressure}&appid=${process.env.API_KEY}`)
  const locationDatas = useGetData(`${process.env.GEOLOCATION_API}?q=${searchQuery}&limit=10&appid=${process.env.API_KEY}`)
  const insets = useSafeAreaInsets()

  const toggleModalVisible = () => {
    setModalVisible(false);
  };

  const updateCoordinates = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  useEffect(() => {
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
              <SearchHeader updateModal={toggleModalVisible} updateQuery={(newQuery)=>setQuery(newQuery)}/>
              {
                locationDatas?.length > 0 ? locationDatas?.map((item,index) =>
                <LocationPlace
                  key={index}
                  toggleModalVisible={toggleModalVisible}
                  item={item}
                  updateCoordinates={updateCoordinates}
                />)
                :null
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
          currentDatas?.daily.map((item)=>(
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
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
