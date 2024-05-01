import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import userDetailsStyles from "../css/userDetails";

export default function UserDetails({ navigation, route }) {
  const { id } = route.params;
  const [data, setData] = useState({});
  async function getDetails() {
    await axios
      .get(`/users/admin/user/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <ScrollView>
      <View style={userDetailsStyles.container}>
        <View>
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/61/cc/b5/61ccb579c0aec956c711596297ccb878.jpg"
            }}
            alt="img"
            style={{ width: "100%", height: 500 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
