import React,{useState} from 'react'
import { Dimensions,TextInput,StyleSheet,View,Text,Pressable} from "react-native";
import { AntDesign} from '@expo/vector-icons';

const {fontScale} = Dimensions.get('window')

const SearchHeader = ({updateModal, updateQuery}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeText = (value) => {
    setSearchQuery(value);
    updateQuery(value); // Update query state in parent component
  };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ width: "90%", flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 20, backgroundColor: "#47484955" }}>
        <AntDesign name="search1" size={25} color="#aaa" />
        <TextInput
          defaultValue={searchQuery}
          onChangeText={handleChangeText}
          placeholder="Search"
          placeholderTextColor="#aaa"
          style={{ color:"#fff",width: "90%", fontSize: 18 / fontScale, marginLeft: 10 }}
        />
      </View>
      <Pressable onPress={updateModal}>
        <Text style={{ color: "#fff", fontSize: 18 }}>X</Text>
      </Pressable>
    </View>
  )
}

export default SearchHeader
