import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import Router from './router'
import {Provider} from 'react-redux'
import {store} from './store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#121415"/>
        <Router/>
      </NavigationContainer>
    </Provider>
  );
}
