import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import axios from 'axios';
import { DataStoreProvider } from './context/DateStor';
import Profile from './screens/Profile';
import Stutents from "./screens/admins/Students";
import UserDetails from "./screens/UserDetails";
import Notices from "./screens/admins/Notices";
import Admins from "./screens/admins/Admins";
import AddnewAdmin from "./screens/admins/AddnewAdmin";
import Departments from "./screens/admins/Departments"
import Camera from "./screens/admins/Camare/Camera";
import Classes from "./screens/admins/Class";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = 'https://smart-school-app-back.onrender.com';//fel code kollah
export default function App() {
  return (
    <DataStoreProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Home}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="All Stutents" component={Stutents} />
          <Stack.Screen name="Details" component={UserDetails} />
          <Stack.Screen name="Notices" component={Notices} />
          <Stack.Screen name="Admins" component={Admins} />
          <Stack.Screen name="Add New Admin" component={AddnewAdmin} />
          <Stack.Screen name="Departments" component={Departments}/>
          <Stack.Screen name="Class" component={Classes}/>
          <Stack.Screen name="Camera" component={Camera}/>
        </Stack.Navigator>
      </NavigationContainer>
    </DataStoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
