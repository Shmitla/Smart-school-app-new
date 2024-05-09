import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const MyClassComponent = () => {
  const [detectedNames, setDetectedNames] = useState(null);

  useEffect(() => {
    const fetchDetectedNames = async () => {
      try {
        const response = await fetch('detected_names.json'); 
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
      {Object.entries(detectedNames).map(([hour, names]) => (
        <View key={hour}>
          <Text>{hour}</Text>
          <Text>{names.join(', ')}</Text>
        </View>
      ))}
    </View>
  );
};

export default MyClassComponent;
