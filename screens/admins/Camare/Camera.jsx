import React from 'react';
import { WebView } from 'react-native-webview';
const Camera = () => {
  return (
    <WebView
      source={{ uri: 'http://127.0.0.1:5001' }}
      style={{ flex: 1 }}
    />
  );
};
export default Camera;
