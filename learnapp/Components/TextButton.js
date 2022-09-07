import * as React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {BodyText} from './Text';
import {StyleSheet,Dimensions} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const TextButton = ({children, onPress}) => {
  const styles = {
    textBtn: {
      backgroundColor:'rgba(51, 110, 145,1.0)',borderWidth: 1,
      borderColor: '#fff',
      alignSelf: 'center',
      width: width/2,
      height: height/15,
      justifyContent: 'center', 
      borderRadius:10
    },
    txtBtn:{
      color: '#fff',
      textAlign:'center', 
      fontSize: 20, 
      fontFamily: 'Poppins-SemiBold'
    }
  };


  return (
    <TouchableOpacity style={styles.textBtn} onPress={onPress}>
      <Text style={styles.txtBtn}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
