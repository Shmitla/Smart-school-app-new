import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Button, Icon, Image, Badge } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { admin, student } from "../utils/data/data";
import layoutStyles from "../css/layout";
import AdminComponent from "./AdminComponent";
import logo from "../assets/logo.png";
import { Store } from "../context/DateStor";
import axios from "axios";
import storage from "../utils/storage/storage";
import Login from "../screens/Login";

export default function Layout({ navigation, children }) {
  const [open, setOpen] = React.useState(false);
  const { user, newStudents, getCookies } = Store();
  const getNewStuedent = async () => {
    await axios
      .get("/users/admin/new_student")
      .then((res) => {
        storage.save({ key: "newStudent", data: res.data });
        getCookies();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if(!user){
      navigation.navigate(Login)
    }
    getNewStuedent();
  }, []);
  return (
    <>
      <SafeAreaProvider>
        <Drawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderDrawerContent={() => {
            return (
              <View style={layoutStyles.drawer}>
                <View style={layoutStyles.list}>
                  <Image source={logo} style={layoutStyles.logo}></Image>
                  <View>
                    {(user._isAdmin ? admin : student).map((ele, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          navigation.navigate(ele.screen);
                        }}
                      >
                        {ele.title === "Notices" ? (
                          <View style={layoutStyles.items}>
                            {newStudents ? (
                              <Badge
                                status="error"
                                containerStyle={{
                                  position: "absolute",
                                  top: 0,
                                  left: -10
                                }}
                                value={newStudents.length}
                              />
                            ) : null}
                            <Icon name={`${ele.icon}`} />
                            <Text style={layoutStyles.text}>{ele.title} </Text>
                          </View>
                        ) : (
                          <View style={layoutStyles.items}>
                            <Icon name={`${ele.icon}`} />
                            <Text style={layoutStyles.text}>{ele.title} </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TouchableOpacity>
                    <View style={layoutStyles.logout}>
                      <Icon name="logout" />
                      <Text style={layoutStyles.text}>Log out </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        >
          <View>
            <Button
              onPress={() => setOpen((prevOpen) => !prevOpen)}
              icon={{ type: "font-awesome", name: "bars" }}
              style={{ width: 50 }}
              type="clear"
            />
            {children}
          </View>
        </Drawer>
      </SafeAreaProvider>
    </>
  );
}
