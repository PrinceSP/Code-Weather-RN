import React, { useState,useEffect,useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home,Settings,DifferentWeather} from "../pages"

const Stack = createNativeStackNavigator();

const Router = () => {

  return (
    <Stack.Navigator
      screenOptions={
        {
          headerShown: false,
          contentStyle:{
            backgroundColor: '#FFFFFF'
          }
        }
      }
    >
      <Stack.Screen name='Home' component={Home} options = {{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='Settings' component={Settings} options = {{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='DifferentWeather' component={DifferentWeather} options = {{headerShown:false}}></Stack.Screen>

        {/* You can add you screen here */}
    </Stack.Navigator>
  );
}

export default Router
