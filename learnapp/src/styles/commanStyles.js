import {StyleSheet,Dimensions} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

//Comman Styles
export default  StyleSheet.create({
   
    centerView:{
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        alignSelf:'center'
    },

    mainView:{
        height:'100%',
        width:'100%',
    },

    boxShadow:{
        //android specific
        elevation: 10,
        //ios specific
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 3,
        shadowOpacity: 0.2, 
    }

})