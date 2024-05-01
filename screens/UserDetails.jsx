import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView , Text, View, Image } from "react-native";
import userDetailsStyles from '../css/userDetails';

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
    <ScrollView>
      <View style={userDetailsStyles.container}>
        <View>
          <Image source={{uri:"https://i.pinimg.com/564x/d0/89/d8/d089d8d3296d1966b7bf8fbf26527958.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR3m2oNuLRiUsrrhoED2JfTujXqRB1Ax5Z4if_gK3YST4Ew-GLX11teEvsA_aem_AYJzxo_CScU6jHTPfZ2pEiNOLvfliveUUsYqH0qhHcp0IDwf_LgHdLYNUHtvzjaETL5dSehR5x-MRqmBPA6k5P0v"}} width={'100%'} alt="img" />
        </View>
      </View>
    </ScrollView>
  );
}
