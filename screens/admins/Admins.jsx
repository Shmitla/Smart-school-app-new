import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SearchBar, Icon } from "@rneui/themed";
import axios from "axios";
import storage from "../../utils/storage/storage";
import { Store } from "../../context/DateStor";
import Layout from "../../components/Layout";

export default function Admins({ navigation }) {
  const { admins, getAdminsData, user } = Store();
  const [value, setValue] = useState("");
  const [data, setData] = useState(admins ? admins : []);

  function searchStudent(e) {
    setValue(e);
    const admin = admins?.filter((x) => x.email === e);
    setData(admin);
    if (e === "") {
      setData(admins);
    }
  }
  useEffect(() => {
    getAdminsData();
  }, []);
  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <SearchBar
          platform="default"
          lightTheme
          containerStyle={{ backgroundColor: "transparent" }}
          inputContainerStyle={{}}
          inputStyle={{ color: "#000" }}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={(newVal) => searchStudent(newVal)}
          // onChange={(e)=>searchStudent(e)}
          onClearText={() => console.log(onClearText())}
          placeholder="Search by student Email"
          placeholderTextColor="#888"
          round
          // showLoading
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => console.log(onCancel())}
          value={value}
        />
        <ScrollView>
          {data?.length > 0 ? (
            <>
              {data?.map((e, i) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Details", { id: e._id });
                  }}
                  style={styles.items}
                  key={i}
                >
                  <Text style={styles.text}>{e.email}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <Text style={styles.text}> this Student not Exist </Text>
          )}
        </ScrollView>
        {user._isSuper && (
          <View style={styles.iconBtn}>
            <Icon
              name="add"
              color="#fff"
              onPress={() => {
                navigation.navigate("Add New Admin");
              }}
            />
          </View>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  items: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#f0c000",
    borderRadius: 20
  },
  text: {
    fontSize: 20
  },
  iconBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#09c",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    position: "absolute",
    right: 30,
    bottom: 60,
    zIndex: 2
  }
});
