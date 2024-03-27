import React,{useState} from "react"
import {View,Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,Dimensions,ScrollView,FlatList} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6,AntDesign } from '@expo/vector-icons';
import {LineChart} from "react-native-chart-kit";

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

const Home = ()=>{
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

  return(
    <SafeAreaView style={[styles.container,{paddingTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
          <AntDesign name="search1" size={24} color="#fff" />
          <Text style={{color:"#fff",marginLeft:2,fontSize:22/fontScale}}>London</Text>
        </TouchableOpacity>
        <FontAwesome6 name="sliders" size={24} color="#fff" />
      </View>
      <ScrollView style={{paddingHorizontal:7,marginTop:37}}>
        <View style={{alignSelf:'center',alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <Image source={{uri:`https://openweathermap.org/img/wn/09d.png`}} style={{width:40,height:40}}/>
            <View>
              <Text style={{color:"#fff"}}>Moderate rain</Text>
              <Text style={{color:"#505050"}}>Light breeze</Text>
            </View>
          </View>
          <Text style={{fontSize:80/fontScale,color:"#fff"}}>12˚C</Text>
          <Text style={{color:"#505050"}}>Feels like 12˚C</Text>
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
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Wind: 11.3m/s WSW</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Humidity: 69%</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>UV index: 0.0</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Pressure: 994hPa</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Visibility: 10.0km</Text>
          <Text style={{marginBottom:20,color:"#fff",fontSize:15/fontScale,}}>Dew point: 1˚c</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
