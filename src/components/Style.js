import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    space:{
        margin:16,
    },
    SpaceTop:{
        padding:30,
    },
    input:{
        width:"86%",
        height:47,
        backgroundColor:"#fff",
        padding:16,
        borderRadius: 18,
        borderWidth:1,
        borderColor: "#c7c7c7",
      
    },
    title:{
        margin:12,
        flexDirection:"row", 
        justifyContent:"space-between",
        paddingBlock:8
    },
    filter:{
        backgroundColor:"#fff",
        borderRadius: 18,
        borderWidth:1,
        borderColor: "#c7c7c7",
    },
    titleName:{
        fontSize:18,
        fontWeight:500,
        color:"#000"
    },
    textEndress:{
        marginTop:4,
        fontSize:14,
        fontWeight:300,
        color:"#aaa"

    }
  });

  export default styles
  