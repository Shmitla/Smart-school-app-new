import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Input, Button, Text, Card } from "@rneui/themed";
import axios from "axios";
import registerStyles from "../../css/register";
import storage from "../../utils/storage/storage";
import { Store } from "../../context/DateStor";

export default function AddNewAdmins({ navigation }) {
  const { getAdminsData } = Store();
  const [registerInfo, setRegisterInfo] = useState({
    _isAdmin: true,
    _isAdmin_confirm: true
  });

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
          Alert.alert(res.data.message);
          getAdminsData();
          setTimeout(() => {
            navigation.navigate("Profile");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error: this email is used or Phone Number is exist");
      });
  };

  return (
    <View style={registerStyles.container}>
      <Card style={registerStyles.card}>
        <Card.Title style={registerStyles.title}>Add Admin</Card.Title>
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
        {/* <Input
          style={registerStyles.input}
          name="school"
          placeholder="School"
          leftIcon={{ type: "font-awesome", name: "graduation-cap" }}
          onChangeText={(value) => handleChange("school", value)}
          inputStyle={{ paddingHorizontal: 10, color: "#000" }}
          placeholderTextColor="#000"
        /> */}
        <Button
          size="lg"
          buttonStyle={registerStyles.registerBtn}
          onPress={handleRegister}
          title="ADD Admin"
          titleStyle={registerStyles.registerText}
        />
      </Card>
    </View>
  );
}
