import React, { useState, useCallback } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationPlace = ({ item, toggleModalVisible, updateCoordinates }) => {
  const [coordinates, setCoordinates] = useState({...item});

  const setLocationCoor = async (item) => {
    const newCoordinates = {
      lat: item.lat,
      lon: item.lon,
      place: item.name + ", " + item.state
    };
    setCoordinates(newCoordinates);
    const jsonValue = JSON.stringify(newCoordinates);
    try {
      await AsyncStorage.setItem('location', jsonValue);
      toggleModalVisible();
      updateCoordinates(newCoordinates);
    } catch (e) {
      return e
    }
  };

  return (
    <View key={item.lat} style={{ height: 50, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 10, borderBottomStyle: "solid", borderBottomColor: "#fff", borderBottomWidth: 1 }}>
      <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => setLocationCoor(item)}>
        <Image source={{ uri: `https://flagsapi.com/${item.country}/flat/64.png` }} style={{ height: 28, width: 28 }} />
        <Text style={{ color: "#fff", marginLeft: 10 }}>{`${item.name}, ${item.state}`}</Text>
      </TouchableOpacity>
      <FontAwesome6 name="star" size={18} color="#ddd" />
    </View>
  );
};

export default LocationPlace;
