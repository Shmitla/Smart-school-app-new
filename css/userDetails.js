import { StyleSheet } from "react-native";

const userDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5
  },
  content: {
  
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#00008B', 
  },
  item: {
    marginBottom: 5, 
    color: '#333', 
  },
  accept:{

  },
  refuse:{

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default userDetailsStyles;
