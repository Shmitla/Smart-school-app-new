import { StyleSheet } from "react-native";

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefee2",
    padding: 20
  },
  card: {
    backgroundColor: "#f0dd4b", // Dark yellow color
    borderRadius: 10, // Rounded corners
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  input: {
    width: "100%",
    marginBottom: 15
  },
  uploadBtn: {
    backgroundColor: "#FFA500", // Orange color for the upload button
    marginBottom: 15
  },
  registerBtn: {
    backgroundColor: "#800080",
    width: "100%",
    borderRadius: 10,
  },
  registerText: {
    fontSize: 20,
    textAlign: "center", // Center the text within the button
    width:'100%',
    
  },
  loginText: {
    marginTop: 20,
    color: "#000",
  },
  linkText: {
    color: "#007bff",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default registerStyles;
