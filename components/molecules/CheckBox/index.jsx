import React, { useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Checkbox = ({ marginBottom=20,marginTop=0,label, onChange, checked }) => {
  const checkboxStyles = useMemo(() => [
    styles.checkbox,
    checked && styles.checkboxChecked,
  ], [checked]);

  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View style={[styles.checkboxContainer,{marginBottom,marginTop}]}>
        <View style={checkboxStyles}>
        {checked && <MaterialIcons name="check" size={14} color="#fff" />}
        </View>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#a3a3a3',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#7866DC',
    backgroundColor: '#7866DC',
  },
  labelText:{
    // fontFamily:"Regular",
    color:"#fff",
    fontSize:16
  }
});

export default Checkbox;
