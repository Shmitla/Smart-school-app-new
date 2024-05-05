import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Dimensions, useNavigation } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from './Camare/Camera.jsx'; // Assuming CameraScreen is the screen you want to navigate to

const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
const { width } = Dimensions.get('window');
const Departments = ({navigation}) => {
  const onPressButton = () => {
    navigation.navigate('Camera');
  };
return (
  <View style={styles.container}>
    <CustomButton onPress={onPressButton} title="Class A" />
    <CustomButton onPress={onPressButton} title="Class B" />
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20, // Add padding to position the button at the top
    marginBottom:30,
    justifyContent: 'flex-start', // Align items at the top of the screen
    alignItems: 'center',
  },
  button: {
    marginBottom:10,
    backgroundColor: 'black', // Black background color
    width: width-10, // Full width of the screen
    height:50, // Height of 20
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    borderRadius: 10, // Rounded corners
  },
  text: {
    fontSize: 16, // Adjust font size as needed
    color: 'white', // White text color
  },
});

export default Departments;
