import React from 'react';
import {View, Image, Alert} from 'react-native';

const AlertDiolog = (msg) => {
       Alert.alert('Learn&Co',msg,
           [
               {text: 'Ok'},
           ],
           { 
               cancelable: true 
           }
       )
   }

export default AlertDiolog;