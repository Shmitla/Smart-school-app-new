import React, { useEffect,useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Input, Button, Text, Card } from "@rneui/themed";
import registerStyles from "../css/register";
import axios from "axios";
import storage from "../utils/storage/storage";
import {launchImageLibrary} from "react-native-image-picker";
import { Image, TouchableOpacity, StyleSheet,Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
export default function Register({ navigation }) {
  const [registerInfo, setRegisterInfo] = useState({});
  const getStudents = async () => {
    try {
      const response = await fetch('http://192.168.1.136:5001/get_students');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleChange = (name, value) => {
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const [file, setFile] = useState(null);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Sorry, we need camera roll permission to upload images.");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
      setFile(result.assets[0].uri);
      } else {
        console.log("Image picking cancelled");
      }
    }
  };
  useEffect(() => {
    console.log("File After  :", file);
  }, [file]);

  const handleRegister = async () => {
    if (!file) {
      Alert.alert("Please upload an image");
      return;
    }
    // Check if other required fields are filled
    if (!registerInfo.userName || !registerInfo.email || !registerInfo.password || !registerInfo.phone || !registerInfo.school) {
      Alert.alert("Please fill in all the required fields");
      return;
    }
    try {
      const students = await getStudents();
      const numberOfStudents = students.length; // Define numberOfStudents here
      console.log(`Number of students: ${numberOfStudents}`);
      const formData = new FormData();
      formData.append("image", {
        uri: file,
        name: numberOfStudents+"S.jpg",
        type: "image/jpeg",
      });
      formData.append('userName', registerInfo.userName);
      formData.append('email', registerInfo.email);
      formData.append('password', registerInfo.password);
      formData.append('phone', registerInfo.phone);
      formData.append('school', registerInfo.school);
      // Make the API request to register the user
      fetch('http://192.168.1.136:5001/add_student_face', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle response as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
      const AddNew = new FormData();
      AddNew.append('ID_STUDENT', numberOfStudents + "S");
      AddNew.append('NAME', registerInfo.userName);
      // Remove the empty array for 'Matiere' if not needed
      AddNew.append('PATH', "uploads/" + numberOfStudents + "S.jpg");

      fetch('http://192.168.1.136:5001/add_student', {
        method: 'POST',
        body: AddNew,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Handle response as needed
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error
        });
      const formDataUser = new FormData();
      formDataUser.append('userName', registerInfo.userName);
      formDataUser.append('email', registerInfo.email);
      formDataUser.append('password', registerInfo.password);
      formDataUser.append('phone', registerInfo.phone);
      formDataUser.append('school', registerInfo.school);

      // Make the API request to register the user
      const response = await axios.post("/users", formDataUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        // Save user info to storage
        storage.save({ key: "userInfo", data: response.data.user });
        Alert.alert(response.data.message);
        navigation.navigate("Profile");
      }else{
        console.log("Error 2")
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error occurred while registering");
    }
  };

  return (
    <ScrollView contentContainerStyle={registerStyles.scrollView}>
      <View style={registerStyles.container}>
        <Card style={registerStyles.card}>
          <Card.Title style={registerStyles.title}>Register now</Card.Title>
          <Card.Divider />
        <Input
          style={registerStyles.input}
          name="userName"
          placeholder="user Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(value) => handleChange("userName", value)}
          inputStyle={{ paddingHorizontal: 10, color: "#000" }}
          placeholderTextColor="#000"
        />
        <Input
          style={registerStyles.input}
          name="email"
          placeholder="Email"
          leftIcon={{
            type: "font-awesome",
            name: "envelope"
          }}
          onChangeText={(value) => handleChange("email", value)}
          inputStyle={{ paddingHorizontal: 10, color: "#000" }}
          placeholderTextColor="#000"
          keyboardType="email-address"
        />
        <Input
          style={registerStyles.input}
          name="password"
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(value) => handleChange("password", value)}
          inputStyle={{ paddingHorizontal: 10, color: "#000" }}
          placeholderTextColor="#000"
          secureTextEntry={true}
        />
        <Input
          style={registerStyles.input}
          name="phone"
          placeholder="Phone"
          leftIcon={{ type: "font-awesome", name: "phone" }}
          onChangeText={(value) => handleChange("phone", value)}
          inputStyle={{ paddingHorizontal: 10, color: "#000" }}
          placeholderTextColor="#000"
          keyboardType="phone-pad"
        />
        <Input
          style={registerStyles.input}
          name="school"
          placeholder="School"
          leftIcon={{ type: "font-awesome", name: "graduation-cap" }}
          onChangeText={(value) => handleChange("school", value)}
          inputStyle={{ paddingHorizontal: 10, color: "#000" }}
          placeholderTextColor="#000"
        />
        <Button title="Choose Photo" onPress={pickImage} />
        <Button
          size="lg"
          buttonStyle={registerStyles.registerBtn}
          onPress={handleRegister}
          title="Register"
          titleStyle={registerStyles.registerText}
        />
      </Card>
      <Text style={registerStyles.registerText}>
        Already have an account?
        <Text
          style={registerStyles.linkText}
          onPress={() => navigation.navigate("Login")}
        >
          login
        </Text>
      </Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
});