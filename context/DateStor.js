import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import storage from "../utils/storage/storage";
import axios from "axios";

const DataStore = createContext();
export const DataStoreProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  //------------------------------functions ----------------------------------

  function getCookies() {
    storage
      .load({
        key: "userInfo"
      })
      .then((res) => {
        setUser(res);
      });
    storage
      .load({ key: "stutent" })
      .then((res) => {
        setStudents(res);
      })
      .catch((err) => {
        console.log(err);
      });
    storage
      .load({ key: "newStudent" })
      .then((res) => {
        setNewStudents(res);
      })
      .catch((err) => {
        console.log(err);
      });
    storage
      .load({ key: "admins" })
      .then((res) => {
        setAdmins(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const logout = async () => {
    storage.remove({ key: "userInfo" }).then(() => {
      setUser("");
    });
    storage.remove({ key: "stutent" }).then(() => {
      setAdmins([]);
    });
    storage.remove({ key: "newStudent" }).then(() => {
      setStudents([]);
    });
    storage.remove({ key: "admins" }).then(() => {
      newStudents([]);
    });
  };

  async function getAdminsData() {
    await axios
      .get("/users/admin/admins")
      .then((res) => {
        storage.save({ key: "admins", data: res.data });
        getCookies();
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
      const getNewStuedent = async () => {
        await axios
          .get("/users/admin/new_student")
          .then((res) => {
            storage.save({ key: "newStudent", data: res.data });
            getCookies();
          })
          .catch((err) => {
            console.log(err);
          });
      };

useEffect(()=>{
  if (user && user._isAdmin) {
    getAdminsData()
    getStudentData()
    getNewStuedent()
  }
},[user])

  return (
    <DataStore.Provider
      value={{
        user,
        setUser,
        getCookies,
        students,
        setStudents,
        newStudents,
        setNewStudents,
        admins,
        setAdmins,
        getAdminsData,
        logout,
        getStudentData,
        getNewStuedent
      }}
    >
      {children}
    </DataStore.Provider>
  );
};

export const Store = () => {
  return useContext(DataStore);
};
