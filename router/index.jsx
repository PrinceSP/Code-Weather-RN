import React, { useState,useEffect,useCallback } from 'react';
import { Easing } from 'react-native';
import { createNativeStackNavigator,TransitionPreset,CardStyleInterpolators } from '@react-navigation/native-stack';
import {Home,Settings,DifferentWeather,Units,SearchLocation} from "../pages"

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeconfig = {
  animation: 'timing',
  config: {
    duration:500,
    easing:Easing.linear
  },
};

const Router = () => {

  return (
    <Stack.Navigator
      screenOptions={
        {
          gestureEnabled:true,
          gestureDirection:"horizontal",
          transitionSpec:{
            open:config,
            close:config
          },
          headerShown: false,
          cardStyle: {
            backgroundColor: '#fff',
          },
        }
      }
    >
      <Stack.Screen name='Home' component={Home}></Stack.Screen>
      <Stack.Screen name='Settings' component={Settings}></Stack.Screen>
      <Stack.Screen name='DifferentWeather' component={DifferentWeather}></Stack.Screen>
      <Stack.Screen name='Units' component={Units}></Stack.Screen>
      <Stack.Screen name='SearchLocation' component={SearchLocation}></Stack.Screen>

        {/* You can add you screen here */}
    </Stack.Navigator>
  );
}

export default Router
