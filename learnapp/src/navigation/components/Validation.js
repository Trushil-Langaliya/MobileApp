import React from 'react';
import {View, Image, Alert} from 'react-native';
import AlertDiolog from './auth/AlertDiolog';
 
const EmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 const loginValidation = (email,password) => {

    
    if (email.trim().length == 0 && password.trim().length == 0){
        AlertDiolog("The email field is required.");
        return 1;
    }else if (EmailValidation.test(email) == false) {
        AlertDiolog("The email field must be a valid email.");
        return 2;
    }else if (password.trim().length < 7){
        AlertDiolog("The password field must be at least 8 characters.");
        return 3;
    }else{
        return 4;
    }

    return 5;
}

 export default loginValidation;