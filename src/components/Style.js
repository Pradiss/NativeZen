
import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    containerSplash:{
        flex: 1,
        backgroundColor:"#232323",
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
        margin:14,
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
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    },
    ///screen
    backgroundScreen:{
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:50,
    
    },
    //scren Black
    backgroundScreenBlack:{
   
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
    padding:40
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
   

    buttonSteps: {
    height: 56,
    width: '100%',
    backgroundColor: '#087F5B',
    borderRadius: 16,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '2px 4px 4px 0 #ADB5BD',
    shadowColor: '#ADB5BD',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
    },
    titleBtnSteps: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: -0.5,
        color: '#FFFF'
    },
    progress: {
        height: 4,
        backgroundColor: '#087F5B',
        borderRadius: 2
    },
//////

    icon:{
        padding:8,
        borderRadius:12,
        backgroundColor:"#7D7D7D",

    },

    buttonConfig:{
        borderRadius:18,
        width:"100%",
        height:55,
        paddingHorizontal:16,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"start",
        marginTop: 8,
        backgroundColor: "#f8f8f8",
        padding:8,
       
    },  
    textButtonConfig:{
        paddingHorizontal:16,
        color:"#000",
        fontSize:16,
        fontWeight:500,
    },
    button:{
        borderRadius:20,
        width:"25%",
        height:32,
        justifyContent:"center",
        alignItems:"center",
        marginTop: 16,
        backgroundColor: "#000",
        padding:8,
        textDecorationColor:"#fff",
        borderColor: "#fff"
    }
   
  });

  export default styles
  
