import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image ,Alert} from "react-native";
import userDetailsStyles from "../css/userDetails";
import { ListItem, Button } from "@rneui/themed";
import { Store } from "../context/DateStor";
export default function UserDetails({ navigation, route }) {
  const studentId = "15S";
  const [studentInfo, setStudentInfo] = useState(null);
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await fetch(`http://192.168.1.17:5001/get_student?student_id=${studentId}`);
        console.log("hedha",response)
        if (!response.ok) {
          throw new Error('Failed to fetch student information');
        }
        const data = await response.json();
        setStudentInfo(data);
        console.log(data)
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch student information');
      }
    };

    fetchStudentInfo();
  }, [studentId]);
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
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Fetch student image data from Flask server
    fetch(`http://192.168.1.17:5001/get_student_image?student_id=${studentId}`)
      .then(response => response.json())
      .then(data => {
        if (data.image) {
          setImageData(`data:image/jpeg;base64,${data.image}`);
        } else {
          console.error('Error fetching student image:', data.error);
        }
      })
      .catch(error => console.error('Error fetching student image:', error));
      console.log("hedha",data)
  }, [studentId]);
  return (
    <ScrollView>
      <View style={userDetailsStyles.container}>
        <View>
          {studentInfo ? (
                  <View>
                    <Text>ID: {studentInfo.ID_STUDENT}</Text>
                    <Text>Name: {studentInfo.NAME}</Text>
                    <Text>Path: {studentInfo.PATH}</Text>
                  </View>
                ) : (
                  <Text>Loading...</Text>
                )}
          {imageData ? (
                  <Image source={{ uri: imageData }} style={{ width: 200, height: 200 }} />
                ) : (
                  <Text>Loading...</Text>
                )}
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
