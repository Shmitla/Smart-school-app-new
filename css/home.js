import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefee2",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  minText: {
    fontSize: 24,
    color: "#000080", // Grey color
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  maxText: {
    fontSize: 18,
    color: "#808080", // Grey color
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logiBnt: {
    backgroundColor: "#800080", // Purple color
    width: "80%",
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: "center", // Align text vertically
    alignItems: "center", // Align text horizontally
  },
  logiBtnText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
});

export default homeStyles;
