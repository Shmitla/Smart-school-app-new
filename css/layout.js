import { StyleSheet } from "react-native";

const layoutStyles = StyleSheet.create({
    list :{
        paddingVertical:10,
        display: 'flex',
        justifyContent:"space-between",
        height:"99%"

    } ,
    items:{
        display : "flex",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:10,
        flexDirection:"row",
        padding:15,
        backgroundColor:"#f0cc00",
        margin:5,
        borderRadius:20

    },
    text:{
        textTransform:"capitalize",
        fontSize:18,

    }
})

export default layoutStyles