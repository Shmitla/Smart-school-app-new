import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Button, Icon, Image, Badge } from "@rneui/themed";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { admin, student } from "../utils/data/data";
import layoutStyles from "../css/layout";
import logo from "../assets/logo.png";
import { Store } from "../context/DateStor";

export default function Layout({ navigation, children }) {
  const [open, setOpen] = React.useState(false);
  const { user, newStudents, getCookies, logout, getNewStuedent } = Store();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
    if (user && user._isAdmin) {
      getNewStuedent();
    }
  }, []);
  const userLogout = ()=>{
    logout(); 
    navigation.navigate("Home");
  }
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
                          setOpen(false);
                        }}
                      >
                        {ele.title === "Notices" ? (
                          <View style={layoutStyles.items}>
                            {newStudents.length>0 ? (
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
                  <TouchableOpacity onPress={userLogout}>
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
        <View style={{width :60}}>

            <Button
              onPress={() => setOpen((prevOpen) => !prevOpen)}
              icon={{ type: "font-awesome", name: "bars" }}
             style={{width :60  }}
              type="clear"
            />
        </View>
          <View>
            {children}
          </View>
        </Drawer>
      </SafeAreaProvider>
    </>
  );
}
