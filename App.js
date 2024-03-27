import { StatusBar,StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#121415"/>
      <Router/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
