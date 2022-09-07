import React,{useRef} from 'react';
import {TextInput, View,} from 'react-native';

const FormInput = ({placeholder, obscure, onchange, keyboardType, returnKeyType,onSubmitEditing,ref,value}) => {
  const emailToPass = useRef(null);
  const styles = {
    textInputStyle: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      height: 60,
      padding: 16,
      width: '100%',
      shadowColor: '#000',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontFamily: 'Poppins-SemiBold',
      color: '#000000',
      //android specific
      elevation: 5,
      //ios specific
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 10,
      shadowOpacity: 0.2,

      
    },
    viewStyle: {
      alignSelf: 'stretch',
      justifyContent: 'space-evenly',
      alignItems: 'stretch',
      paddingHorizontal: 16,
      marginVertical: 10,
    },
  };


  return (
    <View style={styles.viewStyle}>
      <TextInput
        placeholderTextColor="#999"
        style={styles.textInputStyle}
        placeholder={placeholder}
        secureTextEntry={obscure ? true : false}
        onChangeText={onchange}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        value={value}
        onSubmitEditing={() => onSubmitEditing}
        // ref={ref}
      />
    </View>
  );
};

export default FormInput;
