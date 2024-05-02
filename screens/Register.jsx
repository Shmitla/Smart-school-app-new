import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button, Text, Card } from "@rneui/themed";
import registerStyles from "../css/register";
import axios from "axios";
import { launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from "react-native-gesture-handler";
import Uploader from "../utils/uploader/index"

export default function Register({ navigation }) {
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const [registerInfo, setRegisterInfo] = useState({});

  const handleChange = (name, value) => {
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  
  async function addUser() {
    console.log(registerInfo);
    await axios
      .post("/users/", registerInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  return (
    <ScrollView>
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
        leftIcon={{ type: "font-awesome", name: "envelope" }}
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
     <Button title="Choose Photo" onPress={handleChoosePhoto} type="solid"/>

      <Button
        size="lg"
        buttonStyle={registerStyles.registerBtn}
        onPress={addUser}
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
