import React from 'react';
import { WebView } from 'react-native-webview';
const Camera = () => {
  return (
    <WebView
      source={{ uri: 'http://192.168.1.25:5001' }}
      style={{ flex: 1 }}
    />
  );
};
export default Camera;
