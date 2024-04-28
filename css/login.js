import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffcc",
    paddingHorizontal: 20,
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
  inputContainer: {
    flexDirection: "row", // Align icon and input horizontally
    alignItems: "center", // Align items vertically
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#0000", // Set background color to white
  },
  icon: {
    marginRight: 10, // Add margin between icon and input
  },
  input: {
    flex: 1, // Take remaining space
    paddingVertical: 10,
    fontSize: 16, // Adjust font size
  },
  forgotPassword: {
    marginBottom: 10,
    color: "#007bff",
  },
  loginBtn: {
    backgroundColor: "#800080",
    width: "100%",
    borderRadius: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    color: "#000",
  },
  linkText: {
    color: "#007bff",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default loginStyles;
