import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Button, Icon, SearchBar } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { admin } from "../utils/data/data";
import layoutStyles from "../css/layout";
import AdminComponent from "./AdminComponent";

export default function Layout({ navigation, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <SafeAreaProvider>
        <Drawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderDrawerContent={() => {
            return (
              <View style={layoutStyles.list}>
                <View>
                  {admin.map((ele, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                      navigation.navigate("Home")
                      }}
                    >
                      <View style={layoutStyles.items}>
                        <Icon name={`${ele.icon}`} />
                        <Text style={layoutStyles.text}>{ele.title} </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity>
                  <View style={layoutStyles.items}>
                    <Icon name="logout" />
                    <Text style={layoutStyles.text}>Log out </Text>
                  </View>
                </TouchableOpacity>
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
