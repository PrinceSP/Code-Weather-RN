import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import Router from './router'
import * as Location from "expo-location"

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#121415"/>
      <Router/>
    </NavigationContainer>
  );
}
