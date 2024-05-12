import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';



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
    <View>
      <Text>Detected Names:</Text>
      {/* Render your detectedNames data here */}
    </View>
  );
};

export default MyClassComponent;
