import { useContext, useState } from "react";
import { createContext } from "react";
import storage from "../utils/storage/storage";

const DataStore = createContext();
export const DataStoreProvider = ({ children }) => {
  const [user, setUser] = useState("");

  function getCookies() {
    storage
      .load({
        key: "userInfo"
      })
      .then((res) => {
        setUser(res);
      });
  }

  return (
    <DataStore.Provider value={{ user, setUser, getCookies }}>
      {children}
    </DataStore.Provider>
  );
};

export const Store = () => {
  return useContext(DataStore);
};
