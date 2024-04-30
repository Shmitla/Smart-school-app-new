import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SearchBar } from "@rneui/themed";
import axios from "axios";
import storage from "../../utils/storage/storage";  
import { Store } from "../../context/DateStor";

export default function Stutents({ navigation }) {
  const { students, getCookies } = Store();
  const [value, setValue] = useState("");
  const [data, setData] = useState(students ? students : []);
  async function getStudentData() {
    await axios
      .get("/users/students")
      .then((res) => {
        storage.save({ key: "stutent", data: res.data });
        getCookies();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function searchStudent(e) {
    setValue(e);
    const student = students?.filter((x) => x.email === e);
    setData(student);
    if (e === "") {
      setData(students);
    }
  }
  useEffect(() => {
    getStudentData();
  }, []);
  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#f0c000"
  },
  text: {
    fontSize: 20
  }
});
