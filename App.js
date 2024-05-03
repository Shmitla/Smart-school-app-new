import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import axios from 'axios';
import { DataStoreProvider } from './context/DateStor';
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
