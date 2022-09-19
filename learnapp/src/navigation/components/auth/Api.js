import React from 'react';
import {View, Image, Alert} from 'react-native';
import { AlertDiolog } from '../CommanComponents';



// const url = "https://lac-test-api.herokuapp.com/api/v1/user";

const Api = (apiName, data, method,accesstoken) => {

        const url = "https://lac-test-api.herokuapp.com/api/v1/";
      
        return fetch(`${url}${apiName}`
        , {
            method: `${method}`,
            headers: {
              'Content-Type': 'application/json',
              'accessToken' : `Bearer ${accesstoken}`
            },                
                body:  JSON.stringify(data),
            }
        )
        .then((response)=> response.json())
            
        .then(response => {      
            console.log("API response :::",response);  
            return response;
        })
          
        .catch(error => {
            console.log("API name :::",`${url}${apiName}`); 
            console.error(`Error: ${error}`)
        });
}

 export default Api;