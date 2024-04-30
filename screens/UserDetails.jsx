import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

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

  useEffect(()=>{
    getDetails();
  },[])
  return (
    <View>
      <Text>
        {JSON.stringify(data)}
      </Text>
    </View>
  );
}
