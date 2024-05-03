import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import userDetailsStyles from "../css/userDetails";
import { ListItem, Button } from "@rneui/themed";
import { Store } from "../context/DateStor";

export default function UserDetails({ navigation, route }) {
  const { id } = route.params;
  const { getStudentData, getNewStuedent } = Store();
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

  async function studentState(title) {
    if (title === "Blocked") {
      await axios
        .patch("/users/", { id, _isBlocked: !data._isBlocked })
        .then((res) => {
          getDetails();
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    if (title === "Accpet") {
      await axios
        .patch("/users/", { id, _isAdmin_confirm: true })
        .then((res) => {
          getNewStuedent();
          getStudentData();
          alert(res.data.message);
          navigation.navigate("Notices");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .delete(`/users/${id}`)
        .then((res) => {
          getNewStuedent();
          getStudentData();
          alert(res.data);
          navigation.navigate("Notices");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        <ListItem bottomDivider>
          <ListItem.Title>Name : {data?.userName} </ListItem.Title>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Title>Email : {data?.email} </ListItem.Title>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Title>Phone : {data?.phone} </ListItem.Title>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Title>School : {data?.school} </ListItem.Title>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Title>Register at : {data.createdAt}</ListItem.Title>
        </ListItem>
        <ListItem
          bottomDivider
          style={{
            display: data._isAdmin_confirm ? "none" : null
          }}
        >
          <Button
            onPress={() => {
              studentState("Accpet");
            }}
            style={{ width: "100%" }}
            color={"success"}
          >
            Accpet
          </Button>
          <Button
            onPress={() => {
              studentState(null);
            }}
            style={{ width: "100%" }}
            color={"error"}
          >
            unAccpet
          </Button>
        </ListItem>
        <ListItem>
          {data._isBlocked ? (
            <Button
              color={"warning"}
              onPress={() => {
                studentState("Blocked");
              }}
              icon={{ name: "done", color: "#fff" }}
            >
              un Blocked
            </Button>
          ) : (
            <Button
              onPress={() => {
                studentState("Blocked");
              }}
              icon={{ name: "block", color: "#fff" }}
            >
              Blocked
            </Button>
          )}
        </ListItem>
      </View>
    </ScrollView>
  );
}
