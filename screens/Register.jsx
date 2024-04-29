import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Input, Button, Text, Card } from "@rneui/themed";
import registerStyles from "../css/register";
import axios from "axios";
import storage from "../utils/storage/storage";

export default function Register({ navigation }) {
  const [registerInfo, setRegisterInfo] = useState({});

  const handleChange = (name, value) => {
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleImageUpload = (image) => {
    setRegisterInfo({ ...registerInfo, image });
  };

  const handleRegister = async () => {
    await axios
      .post("/users", registerInfo)
      .then((res) => {
        if (res.status === 201) {
          storage.save({ key: "userInfo", data: res.data.user });
          Alert.alert(res.data.message);
          navigation.navigate("Profile");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error: this email is used or full Name is exist");
      });
  };

  return (
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
  );
}
