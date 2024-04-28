import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button, Card } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon component
import loginStyles from "../css/login"; // Update the path

export default function Login({ navigation }) {
  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = (name, value) => {
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async () => {
    console.log(loginInfo);
    // Your login logic here
  };

  return (
    <View style={loginStyles.container}>
      <Card style={loginStyles.card}>
        <Card.Title style={loginStyles.title}>Login</Card.Title>
        <Card.Divider />
        <View style={loginStyles.inputContainer}>
          <Icon name="envelope" size={20} color="#000" style={loginStyles.icon} />
          <Input
            style={loginStyles.input}
            name="email"
            placeholder="Enter your Email"
            onChangeText={(value) => handleChange("email", value)}
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
