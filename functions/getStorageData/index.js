import AsyncStorage from '@react-native-async-storage/async-storage';

async function getStorageData(){
  try {
    const getToken = await AsyncStorage.getItem('location');
    if (getToken !== null) {
      const token = JSON.parse(getToken);
      return token;
    } else {
      return null; // or handle the case where data is not available
    }
  } catch (error) {
    return null; // or handle the error as appropriate
  }
}

export default getStorageData
