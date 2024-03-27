import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import Router from './router'

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#121415"/>
      <Router/>
    </NavigationContainer>
  );
}
