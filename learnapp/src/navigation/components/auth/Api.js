import React from 'react';
import { View, Image, Alert } from 'react-native';
import { AlertDiolog } from '../CommanComponents';
import axios from "axios"
import * as Store from '../auth/Store'

var url = "https://lac-test-api.herokuapp.com/api/v1/planning/12-09-2022"

const Api = {
    planning: async (date) => {
        return GETAPI(`planning/${date}`)
    },
    postPlanning: async (plan) => {
        return POSTAPI({name: 'planning', parms : plan })
    },
}
export default Api;





const GETAPI = async (parms) => {
   
    const config = async () => {
        return `Bearer ${await Store.getData(Store.userToken)}` 
    }
    
    try {
        const response = await fetch(`https://lac-test-api.herokuapp.com/api/v1/${parms}`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${await config()}`
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        return console.error(`Error: ${error}`);
    }
}

const POSTAPI = async (parms) => {
 
    const config = async () => {
        return `Bearer ${await Store.getData(Store.userToken)}` 
    }
    
    try {
        const response = await fetch(`https://lac-test-api.herokuapp.com/api/v1/${parms.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${await config()}`
            },
            body: JSON.stringify(parms.parms),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        return console.error(`Error: ${error}`);
    }
}