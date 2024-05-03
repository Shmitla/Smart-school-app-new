import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Input, Button, Text, Card } from "@rneui/themed";
import registerStyles from "../css/register";
import axios from "axios";
import storage from "../utils/storage/storage";
import {launchImageLibrary} from "react-native-image-picker";



export default function Register({ navigation }) {
  const [registerInfo, setRegisterInfo] = useState({});
 const [imageUri, setImageUri] = useState(null);
  const handleChange = (name, value) => {
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

//   const options = {mediaType:"photo"}

// const handleChoosePhoto =  () => {
// launchImageLibrary(options, (response) => {
//     console.log(options);
//       setPhoto(response);
//   });
 
// };
const pickImage = async () => {
  try {
    const options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom App" }
      ],
      storageOptions: {
        skipBackup: true, // Prevent image backup (iOS)
        path: "images/" // (Optional) Specify a path to store the image
      },
      mediaType: "photo", // Only allow photos (optional)
      quality: 1 // Image quality (0-1, default 1)
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      console.log("User cancelled image picker");
    } else if (result.error) {
      console.log("ImagePicker Error:", result.error);
    } else {
      const source = { uri: result.uri };
      setImageUri(source.uri);
    }
  } catch (error) {
    console.error("Error picking image:", error);
  }
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
  );
}
