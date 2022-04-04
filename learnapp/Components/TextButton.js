import * as React from 'react';
import {TouchableOpacity,Alert} from 'react-native';
import {BodyText} from './Text';
import {StyleSheet,Dimensions} from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const TextButton = ({borderRadius, bgColour, children, email, password}) => {
  const styles = {
    textBtn: {
      borderRadius: borderRadius,
      borderWidth: 1,
      borderColor: '#fff',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: bgColour,
      width: width/2,
      height: height/15,
    },
  };


  return (
    <TouchableOpacity title="Next" style={styles.textBtn} >
      <BodyText>{children}</BodyText>
    </TouchableOpacity>
  );
};

export default TextButton;
