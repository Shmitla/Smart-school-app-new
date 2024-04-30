import { useContext, useState } from "react";
import { createContext } from "react";
import storage from "../utils/storage/storage";

const DataStore = createContext();
export const DataStoreProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);

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
  }

  return (
    <DataStore.Provider
      value={{
        user,
        setUser,
        getCookies,
        students,
        setStudents,
        newStudents,
        setNewStudents
      }}
    >
      {children}
    </DataStore.Provider>
  );
};

export const Store = () => {
  return useContext(DataStore);
};
