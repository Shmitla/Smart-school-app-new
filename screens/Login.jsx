import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Input, Button, Card } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon component
import loginStyles from "../css/login"; // Update the path
import axios from "axios";
import storage from "../utils/storage/storage";
import { Store } from "../context/DateStor";

export default function Login({ navigation }) {
  const { user, getCookies, setUser, getNewStuedent } = Store();
  const [loginInfo, setLoginInfo] = useState({
    phone: "",
    password: ""
  });

  const handleChange = (name, value) => {
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async () => {
    await axios
      .post("/users/login", loginInfo)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.user._isBlocked) {
            alert("your accout is blocked  , please contact with us");
            navigation.navigate("Home");
            return;
          }
          if (!res.data.user._isAdmin_confirm) {
            alert("your accout is not Accpet yet   , please wait ....");
            navigation.navigate("Home");
            return;
          }
          setLoginInfo({ phone: "", password: "" });
          storage.save({ key: "userInfo", data: res.data.user });
          setUser(res.data.user);
          Alert.alert(res.data.message);
          navigation.navigate("Profile");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error: Email or password  is not match");
      });
  };
  useEffect(() => {
    // getCookies();
    if (user) {
      navigation.navigate("Profile");
    }
  }, []);

  useEffect(() => {
    // if (user) {
    navigation.navigate("Profile");
    // }
  }, [user]);
  return (
    <View style={loginStyles.container}>
      <Card style={loginStyles.card}>
        <Card.Title style={loginStyles.title}>Login</Card.Title>
        <Card.Divider />
        <View style={loginStyles.inputContainer}>
          <Icon
            name="envelope"
            size={20}
            color="#000"
            style={loginStyles.icon}
          />
          <Input
            style={loginStyles.input}
            name="phone"
            placeholder="Enter your phone"
            onChangeText={(value) => handleChange("phone", value)}
            value={loginInfo.phone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={loginStyles.inputContainer}>
          <Icon name="lock" size={20} color="#000" style={loginStyles.icon} />
          <Input
            style={loginStyles.input}
            name="password"
            placeholder="Password"
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry={true}
            value={loginInfo.password}
          />
        </View>
        <Text
          style={loginStyles.forgotPassword}
          onPress={() => console.log("Forgot Password")}
        >
          Forgot Password?
        </Text>
        <Button
          size="lg"
          buttonStyle={loginStyles.loginBtn}
          onPress={handleLogin}
          title="Login"
          titleStyle={loginStyles.loginText}
        />
      </Card>
      <Text style={loginStyles.registerText}>
        Don't have an account?
        <Text
          style={loginStyles.linkText}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}
