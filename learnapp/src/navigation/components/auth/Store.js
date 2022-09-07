import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const user_id = 'user_id'
export const useremail = 'email'
export const userpass = 'password'
export const userToken = 'userToken'
export const userRole = 'user_role'
export const userData = 'userData'

export const setData = async (strKey, item) => {
    let value = JSON.stringify(item)
    if (value) {
        await AsyncStorage.setItem(strKey, value)
    }
}

export const getData = async (strKey) => {
    const res = await AsyncStorage.getItem(strKey)
    const data = JSON.parse(res)
    return data
}

export const multiGetData = async (keyArr) => {
    const res = await AsyncStorage.multiGet(keyArr)
    return res
}

export const clearStorage = () => {
    AsyncStorage.clear()
}
