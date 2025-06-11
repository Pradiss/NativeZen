
import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    containerSplash:{
        flex: 1,
        backgroundColor:"#000",
        justifyContent: "center",
        alignItems: "center",
        
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
        
    },
    
    
    // Login
    containerLogin:{
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    },

    inputLogin:{
    textAlign:"center",
    textShadowColor:"#fff",
    textDecorationColor:"#fff",
    backgroundColor: '#555555',
    width: '100%',
    color:"#fff",
    height:55,
    marginBlock: 8,
    borderRadius: 30,
    paddingHorizontal: 10,
    justifyContent:"center",
    alignItems:"center",
    },
    buttonLogin:{
        borderRadius:30,
        width:"100%",
        height:55,
        justifyContent:"center",
        alignItems:"center",
        marginTop: 24,
        backgroundColor: "#6BD2D7",
        padding:8,
        borderColor: "#fff"
    },
    picker:{
        height: 150,
        color: "#333",
    },


    icon:{
        padding:8,
        borderRadius:12,
        backgroundColor:"#7D7D7D",

    }
   
  });

  export default styles
  
