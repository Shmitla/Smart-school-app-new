import React from "react";
import { Text, View } from "react-native";
import { Store } from "../context/DateStor";
import {
  createBottomTabNavigator,

} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Login from "../screens/Login";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const Tab = createBottomTabNavigator();
export default function AdminComponent() {
  const { user } = Store();

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}
