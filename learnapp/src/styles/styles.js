import {StyleSheet,Dimensions} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

//Comman Styles
export default  StyleSheet.create({
    ViewStyle:{
       
        height: height,
        width: width,
        backgroundColor: '#ffffff',
    },
    container: {
       flexDirection: 'row',
       alignItems:'flex-end',
       height: height,
       width:width/1.2,
       alignSelf:'center',
        // backgroundColor: 'red',
       justifyContent:'center',
    },
    mainView:{
        flexDirection: 'column',
        alignItems:'center',
        width:width/1.2,
        // backgroundColor: '#6ED4C8',
    },
    btnView:{
        height: height/6,
        // backgroundColor: 'green',
        width: width/2,
        flexDirection: 'column',
        alignItems:'center',
    },
    btnNext:{
        backgroundColor: '#6F989E',
        width: width/2,
        height: height/15,
        justifyContent: 'center',
        borderRadius: 15
    },

})