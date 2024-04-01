import React,{useState} from 'react'
import {View,Text,StyleSheet,KeyboardAvoidingView,Platform,SafeAreaView,Dimensions,ScrollView} from 'react-native'
import {SearchHeader,FindLocation,LocationPlace} from '../../components'
import {useGetData} from '../../custom-hooks'

const {width,height} = Dimensions.get('window')

const SearchLocation = ({navigation}) => {
  const [searchQuery,setQuery] = useState("")
  const locationDatas = useGetData(`${process.env.GEOLOCATION_API}?q=${searchQuery}&limit=10&appid=${process.env.API_KEY}`)

  function toHome(){
    return navigation.navigate("Home")
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.modalView}>
          <SearchHeader updateModal={toHome} updateQuery={(newQuery)=>setQuery(newQuery)}/>
          <FindLocation updateModal={toHome}/>
          {
            locationDatas?.length > 0 ? locationDatas?.map((item,index) =>
            <LocationPlace
              key={index}
              toggleModalVisible={toHome}
              item={item}
            />)
            : null
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SearchLocation


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"121415",
  },
  modalView: {
    width,
    height,
    backgroundColor: '#121415',
    borderRadius: 4,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
