//packages
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, SafeAreaView, ScrollView, TouchableOpacity, LogBox, ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Api from '../components/auth/Api';
import * as Progress from 'react-native-progress';
import * as Store from '../components/auth/Store'
import { ViewModel } from '../components/model';
import { useIsFocused } from "@react-navigation/native";
import InputBox, { AlertDiolog, Btn, CustomImg, FormInputText, Keyboard, Loader, TextBold, TextRegular } from '../components/CommanComponents';
import commanStyles from '../../styles/commanStyles';
import { TextInput } from 'react-native-gesture-handler';


LogBox.ignoreAllLogs(true)  // hide warnings

//Main Function
const Signin = ({ navigation }) => {

    //variables
    const [txtEmail, setEmail] = useState('');
    const [txtPassword, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loadValue, setloderValue] = useState(0);
    const [saveData, setSaveData] = useState(false);
    const [loader, setLoader] = useState(false)
    const emailToPass = useRef();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setTimeout(async () => {
                const userEmail = await Store.getData(Store.useremail)
                const userPassword = await Store.getData(Store.userpass)
                setEmail(userEmail)
                setPassword(userPassword)
                if (userEmail != null && userEmail != '') {
                    setCheckBoxRemeber(true)
                }
            })
        }
    }, [isFocused]);

    //Signin Action
    const btnSignin = () => {

        console.log("Onpress is ::", txtEmail, txtPassword)

        const EmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //   loginValidation(txtEmail, txtPassword);
        if (txtEmail.trim().length == 0 || txtEmail == 'null') {
            AlertDiolog("The email field is required.");
        } else if (EmailValidation.test(txtEmail) == false) {
            AlertDiolog("The email field must be a valid email.");
        } else if (txtPassword.trim().length == 0 && txtPassword.trim().length < 7) {
            AlertDiolog("The password field must be at least 8 characters.");
        } else {
            setLoader(true)
          
            let parms = {
                "email": txtEmail, 
                "password": txtPassword
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parms)
            };

            setTimeout(async () => {
                return fetch('https://lac-test-api.herokuapp.com/api/v1/.auth', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": txtEmail, 
                        "password": txtPassword
                    })
                  })
                  .then((response) => response.json())
                  .then((json) => {
                    console.log('response',json);
                    if (json.data.success == false){
                        AlertDiolog(json.data.msg)
                        setLoader(false)
                    }else{
                        setdata(json)
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
            })
        }
    }

    setdata = (result) => {
        Store.setData(Store.userToken, result.data.accessToken)
        setLoader(false)
        if (result.success == false) {
            AlertDiolog(`${result.data.msg}`)
        } else {
            if (result.data.status == 2){
                console.log("2");
                // navigation.navigate('VerifyEmail', { Email: txtEmail })
                navigation.navigate('SignupForm')
            }else if(result.data.status == 1){
                setTimeout(async () => {
    
                    return fetch(`https://lac-test-api.herokuapp.com/api/v1/user/me/all`
                        , {
                            method: `GET`,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${result.data.accessToken}`
                            },
                        }
                    )
                        .then((response) => response.json())
                        .then(response => {
                            console.log("Profile API response :::", response);
                          
                            Store.setData(Store.userData, response.data)
    
                            if (response.success == false) {
                                AlertDiolog(`${response.data.msg}`)
                            } else {
                                setShowModal(true);
                                setTimeout(function () {
                                    setloderValue(1)
                                    if(response.data.role[0] == "client"){
                                        navigation.navigate('TabBar')
                                    }else{
                                        AlertDiolog('Work is going on....')
                                    }   
                                }, 2000);
                                setTimeout(function () {
                                    setShowModal(false);
                                }, 4000);
                            }
                           
                            // return response;
                        })
                        .catch(error => {
                            console.error(`Error: ${error}`)
                        });
    
                })
            }

           
        }
    }


    const setRemeberData = (newValue) => {
        setCheckBoxRemeber(newValue)
        setSaveData(newValue)
    }

    const btnSignUp = () => {
        navigation.navigate('SignupRoles')
    }



    //Return  View
    return (
        <SafeAreaView>
            <Keyboard>
                <View style={commanStyles.mainView}>
                    <View style={{ height: '60%', width: '100%', }}>
                        <ImageBackground
                            source={require('../../../assets/signin2.png')}
                            style={[commanStyles.mainView]}
                        />
                    </View>

                    <View style={{ height: '70%', width: '100%', justifyContent: 'center', position: 'absolute', bottom: 0 }}>
                        <ImageBackground
                            source={require('../../../assets/bg2.png')}
                            style={[{ justifyContent: 'flex-end', height: '100%', width: '100%' }]}

                        >
                            <View style={{ margin: 20 }}>
                                <TextBold children="EMAIL ADDRESS" size={height / 40} color="#fff" />
                                <TextInput
                                    value={txtEmail}
                                    style={{
                                        fontSize: 15,
                                        height: 50,
                                        color: '#fff',
                                        borderBottomColor: '#fff',
                                        borderBottomWidth: 2,
                                        fontFamily: 'Poppins-SemiBold'
                                    }}
                                    onChangeText={(txtEmail) => setEmail(txtEmail)}
                                />
                                <View style={{ marginVertical: 20 }} />
                                <TextBold children="PASSWORD" size={height / 40} color="#fff" />
                                <TextInput
                                    value={txtPassword}
                                    style={{
                                        fontSize: 15,
                                        height: 50,
                                        color: '#fff',
                                        borderBottomColor: '#fff',
                                        borderBottomWidth: 2,
                                        fontFamily: 'Poppins-SemiBold'
                                    }}
                                    secureTextEntry={true}
                                    onChangeText={(txtPassword) => setPassword(txtPassword)}
                                />
                            </View>
                            <View style={{ margin: 30 }}>
                                <Btn children="SIGN IN" color="#fff" height={height / 15} width="100%" txtSize={height / 45} radius={20} onPress={btnSignin} />
                            </View>

                            {/* Success Model */}
                            <ViewModel
                                showModal={showModal}
                                role={role}
                            >

                                <CustomImg src={require('../../../assets/L&co_logo_white.png')} width='100%' height='40%' resizeMode="contain" />


                                <View style={{ marginVertical: 10 }}></View>
                                <Progress.Circle
                                    progress={loadValue}
                                    size={100}
                                    color='#ffffff'
                                    thickness={8}
                                />


                            </ViewModel>
                            {loader ? <Loader /> : null}
                        </ImageBackground>
                    </View>
                </View>
            </Keyboard>
        </SafeAreaView>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        top: 0,
    },
    loginView: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    formView: {
        width: '90%',
        height: '90%',
    },
    rememberView: {
        width: '90%',
        height: height / 20,
        flexDirection: 'row',
    },
});

export default Signin