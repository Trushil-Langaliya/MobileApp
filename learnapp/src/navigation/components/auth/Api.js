import React from 'react';
import {View, Image, Alert} from 'react-native';
import AlertDiolog from './AlertDiolog';


const url = "https://lac-test-api.herokuapp.com/api/v1/user";

const Api = (apiName, data, method) => {

    console.log("API",apiName);  
    console.log("data",data);  
    console.log("method",method); 
    
        const url = "https://lac-test-api.herokuapp.com/api/v1/user/";

        return fetch(`${url}${apiName}`
        , {
            method: `${method}`,
            headers: {
              'Content-Type': 'application/json',
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
            console.error(`Error: ${error}`)
        });
}

 export default Api;