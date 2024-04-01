import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { getCoords } from '../../../store/currentCoordinates'; // Import the action creator
import {useGetData} from '../../../custom-hooks'

const FindLocation = ({updateModal,place="Find my location"}) => {
  const [locationError, setLocationError] = useState(null);
  const dispatch = useDispatch();

  const fetchWeatherData = async(latitude, longitude) => {
    try {
      const response = await fetch(
        `${process.env.WEATHER_API}?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`
      );
      const json = await response.json();
      dispatch(getCoords({lat:json.coord.lat,lon:json.coord.lon,places:json.name+", "+json.json.sys.country}))
      updateModal()
    } catch (e) {
      return e
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied');
        return;
      }
      const {coords} = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000})
      fetchWeatherData(coords.latitude,coords.longitude)
    } catch (error) {
      return error;
    }
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingVertical: 10,
      }}
      onPress={getLocation}>
      <EvilIcons name="location" size={28} color="#fff" />
      <Text style={{ color: '#fff' }}>{place="Find my location"}</Text>
    </TouchableOpacity>
  );
};

export default FindLocation;
