import React,{useState,memo} from "react"
import {View,Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6,AntDesign,Octicons } from '@expo/vector-icons';
import {LineChart} from "react-native-chart-kit";
import {useGetData} from '../../custom-hooks'
import {API_URL, API_KEY} from "@env"

const {width,fontScale} = Dimensions.get('window')

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

const Home = ({navigation})=>{
  const insets = useSafeAreaInsets()
  const currentDatas = useGetData(`${process.env.API_URL}?lat=33.44&lon=-94.04&appid=${process.env.API_KEY}&units=metric`)

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

  const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

  return(
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
          <AntDesign name="search1" size={24} color="#fff" />
          <Text style={{color:"#fff",marginLeft:2,fontSize:22/fontScale}}>London</Text>
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
            <FontAwesome6 name="location-arrow" size={18} color="#aaa" style={{transform: [{rotate: `${currentDatas?.current?.wind_deg}deg`}]}}/>
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
          maxToRenderPerBatch={10}
        />

        {
          currentDatas?.daily.map((item)=>(
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"#fff",paddingVertical:10}}>
              <Text style={{color:"#fff",fontSize:16/fontScale}}>Wed Mar 27</Text>
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
