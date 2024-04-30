import { StyleSheet } from "react-native";

const layoutStyles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: '#FFFFDB', // Change this to the color you want
      },
    list :{
        paddingVertical:10,
        display: 'flex',
        justifyContent:"center",
        height:"99%",
        alignItems:'center'

    } ,
    logo: {
        width: 200,
        height: 200,
        display : "flex",
       
      },
    items:{
        display : "flex",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:10,
        flexDirection:"row",
        padding:15,
        backgroundColor:"#ffe5ec",
        margin:5,
        borderRadius:20

    },
    text:{
        textTransform:"capitalize",
        fontSize:18,

    },
    logout:{
        display : "flex",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:10,
        flexDirection:"row",
        padding:15,
        // backgroundColor:"",
        margin:5,
        borderRadius:20   
    },
})

export default layoutStyles