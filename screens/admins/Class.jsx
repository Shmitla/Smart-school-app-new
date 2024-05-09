import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyClassComponent = () => {
  const [detectedNames, setDetectedNames] = useState(null);

  useEffect(() => {
    const fetchDetectedNames = async () => {
      try {
        const response = await fetch('detected_names.json');
        const data = await response.json(); // Parse JSON response
        setDetectedNames(data);
      } catch (error) {
        console.error('Error fetching detected names:', error);
      }
    };

    fetchDetectedNames();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MyClassComponent" component={MyClassScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyClassScreen = () => {
  return (
    <View>
      <Text>Detected Names:</Text>
      {/* Render your detectedNames data here */}
    </View>
  );
};

export default MyClassComponent;
