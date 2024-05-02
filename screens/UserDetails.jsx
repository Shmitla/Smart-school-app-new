import axios from "axios";
import React, { useEffect, useState,Alert } from "react";
import { ScrollView, Text, View, Image,Button  } from "react-native";
import userDetailsStyles from "../css/userDetails";
import {ListItem} from '@rneui/themed'

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
  const handleAccept = () => {
   
    Alert.alert('Accept Button Pressed');
  };

  const handleRefuse = () => {
  
    Alert.alert('Refuse Button Pressed');
  };
  const handleBlock = () => {
   
    Alert.alert('Block Button Pressed');
  };

  return (
    <ScrollView>
      <View style={userDetailsStyles.container}>
        <View>
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/61/cc/b5/61ccb579c0aec956c711596297ccb878.jpg"
            }}
            alt="img"
            style={{ width:"90%" , height:250 , alignSelf: 'center' }}
          />
           <ListItem>
            <ListItem.Content style={userDetailsStyles.content}>
              <ListItem.Title style={userDetailsStyles.title}>{data?.userName}</ListItem.Title>
              <ListItem.Subtitle style={userDetailsStyles.item}>Email: {data?.email}</ListItem.Subtitle>
              <ListItem.Subtitle style={userDetailsStyles.item}>Phone: {data?.phone}</ListItem.Subtitle>
              <ListItem.Subtitle style={userDetailsStyles.item}>School: {data?.school}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
        <View style={userDetailsStyles.buttonContainer}>
          <Button title="Accept" onPress={handleAccept} color="green" style={userDetailsStyles.accept}/>
          <Button title="Refuse" onPress={handleRefuse} color="grey" style={userDetailsStyles.refuse} />
          <Button title="block" onPress={handleBlock} color="red" style={userDetailsStyles.refuse} />
        </View>
      </View>
    </ScrollView>
  );
}
