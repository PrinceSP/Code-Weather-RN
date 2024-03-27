import React from 'react'
import {View,TouchableOpacity,Text,Dimensions} from 'react-native'

const {width,fontScale} = Dimensions.get('window')

const CustomUnits = ({width,data,setData}) => {
  const handlePress = (index) => {
    setData(prevDatas =>
      Array.isArray(prevDatas) ?
      prevDatas.map((item, idx) => ({
        ...item,
        isActive: idx === index,
      })) :
      Object.keys(prevDatas).reduce((acc, key) => {
        acc[key] = {
          ...prevDatas[key],
          isActive: key === index,
        };
        return acc;
      }, {})
    );
  };

  return (
    <View style={{ width: '50%', flexDirection: 'row', padding: 4, borderRadius: 6, backgroundColor: "rgba(100, 100, 100, 0.16)" }}>
      {data.map((item,index) => (
        <TouchableOpacity
          key={item.name}
          style={{ width, paddingVertical: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: item.isActive ? "#77777755" : "rgba(0,0,0,0)", borderRadius: 3 }}
          onPress={() => handlePress(index)}
        >
          <Text style={{ color: "#ccc", fontSize: 14 / fontScale }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default CustomUnits
