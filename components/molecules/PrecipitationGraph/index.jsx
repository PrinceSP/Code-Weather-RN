import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import {splitDate} from '../../../functions'
import {data,chartConfig} from '../../../configs'
import { FontAwesome6 } from '@expo/vector-icons';
import {LineChart} from "react-native-chart-kit";

const {width,fontScale} = Dimensions.get('window')

const PrecipitationGraph = (props) => {
  return (
    <View style={{width,alignItems:'center',marginTop:50}}>
      <Text style={{marginBottom:20,color:"#fff",fontSize:16/fontScale}}>No precipitation within an hour</Text>
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
  )
}

export default PrecipitationGraph
