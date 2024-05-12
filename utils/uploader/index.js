import { Platform } from "react-native";

const createFormData = async(photo, body = {}) => {
    const data = new FormData();
  
    data.append("img", {
      // name: photo.fileName,
      // type: photo.type,
      // uri:  Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      uri: photo,
        name: photo+"S.jpg",
      type: "image/jpeg",
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };
export default createFormData