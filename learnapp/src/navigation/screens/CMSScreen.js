//packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, SafeAreaView, Text } from 'react-native';
import commanStyles from '../../styles/commanStyles';
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import InputBox, { AlertDiolog, Btn, Keyboard, Loader, TextBold, TextRegular } from '../components/CommanComponents';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { useIsFocused } from "@react-navigation/native";
import Api from '../components/auth/Api'


//Main Function
const CMSScreen = ({ route, navigation }) => {

    const [txtName, setName] = useState('');
    const [txtEmail, setEmail] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [txtRole, setRole] = useState('');
    const [loader, setLoader] = useState(false)

    const [isSelected, setSelection] = useState(false);

    const [isSelected1, setSelection1] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [isSelected3, setSelection3] = useState(false);
    const [isSelected4, setSelection4] = useState(false);
    const [isSelected5, setSelection5] = useState(false);

    let data = [{
        value: 'admin',
    }, {
        value: 'teacher',
    }, {
        value: 'client',
    }];

    const verify = () => {
        const EmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //   loginValidation(txtEmail, txtPassword);
        if (txtEmail.trim().length == 0) {
            AlertDiolog("The email field is required.");
        } else if (EmailValidation.test(txtEmail) == false) {
            AlertDiolog("The email field must be a valid email.");
        } else if (txtPassword.trim().length == 0) {
            AlertDiolog("The password field is required.");
        } else if (isSelected1 == false) {
            AlertDiolog("Please accept the Terms and Conditions");
        } else if (isSelected2 == false) {
            AlertDiolog("Please accept the Privacy Policy");
        } else {
            setLoader(true)
           
            let parms = {
                "firstName": txtName,
                "email": txtEmail,
                "password": txtPassword,
                "role": txtRole
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parms)
            };

            setTimeout(async () => {
                let response = await fetch('https://lac-test-api.herokuapp.com/api/v1/user', requestOptions)
                if (response && response.status === 401) {
                    console.error('There was an error 401!');
                } else if (response) {
                    const data = await response.json()
                    console.log('Here is the response of Sign up user details!',data);
                    signup(data)
                } else {
                    console.error('There was an error!');
                }
            })
            
           
        }
    }

    const signup = (result) => {
        setLoader(false)
        if (result.success == false) {
            AlertDiolog(`${result.data.msg}`)
        } else {
            navigation.navigate('VerifyEmail', { Email: txtEmail })
        }

    }

    //View will appear 
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setTimeout(async () => {
                setName(route.params.name)
            })
        }
    }, [isFocused]);

    //Return  View
    return (
        <View style={[commanStyles.mainView]}>
            <SafeAreaView>
                <ImageBackground
                    source={require('../../../assets/Splashbg.png')}
                    style={[commanStyles.mainView]}
                >
                    <ScrollView style={[commanStyles.mainView]}>
                        <View style={{ width: '10%', height: height / 16, justifyContent: 'center', margin: 10 }}>
                            <Btn height='100%' width='100%' onPress={() => navigation.goBack()}>
                                <FontAwesomeIcon icon={faAngleLeft} size={height / 30} color='#fff' />
                            </Btn>
                        </View>

                        <View style={{ width: '90%', height: 100, alignSelf: 'center' }}>
                            <TextBold children="ENTER YOUR EMAIL" size={height / 35} color='#fff' />
                            <TextBold children="We'll use this address to create your account" size={height / 45} color='#fff' />
                        </View>

                        <View style={{ marginVertical: 20, margin: 20 }}>
                            <InputBox label="Email address" icon={true} defaultValue={''} onChangeText={(txtEmail) => setEmail(txtEmail)} onSubmitEditing={Keyboard.dismiss} height={height / 20} />
                            <InputBox label="Password" icon={true} defaultValue={''} secureTextEntry={true} onChangeText={(txtPassword) => setTxtPassword(txtPassword)} onSubmitEditing={Keyboard.dismiss} height={height / 20} />
                            <Dropdown
                                label='Role'
                                data={data}
                                value={data.value}
                                onChangeText={(value) => setRole(value)}
                                style={{ baseColor: 'white' }}
                            />

                        </View>


                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '10%', alignSelf: 'center' }}>
                                <CheckBox
                                    value={isSelected1}
                                    onValueChange={setSelection1}
                                    style={styles.checkbox}
                                    onFillColor={"#fff"}
                                />
                            </View>

                            <View style={{ width: '80%', alignSelf: 'center', margin: 15 }}>
                                <TextBold children="I accept the Terms and Conditions" size={height / 55} color='#fff' />
                            </View>
                        </View>

                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '10%', alignSelf: 'center' }}>
                                <CheckBox
                                    value={isSelected2}
                                    onValueChange={setSelection2}
                                    style={styles.checkbox}
                                    onFillColor={"#fff"}
                                />
                            </View>

                            <View style={{ width: '80%', alignSelf: 'center', margin: 15 }}>
                                <TextBold children="I've read the Privacy Policy" size={height / 55} color='#fff' />
                            </View>
                        </View>

                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '10%', alignSelf: 'center' }}>
                                <CheckBox
                                    value={isSelected3}
                                    onValueChange={setSelection3}
                                    style={styles.checkbox}
                                    onFillColor={"#fff"}
                                />
                            </View>

                            <View style={{ width: '80%', alignSelf: 'center', margin: 15 }}>
                                <TextBold children="I'm happy for Learn&Co to collect data on how I'm using the app, find out more in the Privacy Policy" size={height / 55} color='#fff' />
                            </View>
                        </View>

                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '10%', alignSelf: 'center' }}>
                                <CheckBox
                                    value={isSelected4}
                                    onValueChange={setSelection4}
                                    style={styles.checkbox}
                                    onFillColor={"#fff"}
                                />
                            </View>

                            <View style={{ width: '80%', alignSelf: 'center', margin: 15 }}>
                                <TextBold children="I'm happy to share crash reports from the app with Learn&Co, find out more in the Privacy Policy" size={height / 55} color='#fff' />
                            </View>
                        </View>

                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '10%', alignSelf: 'center' }}>
                                <CheckBox
                                    value={isSelected5}
                                    onValueChange={setSelection5}
                                    style={styles.checkbox}
                                    onFillColor={"#fff"}
                                />
                            </View>

                            <View style={{ width: '80%', alignSelf: 'center', margin: 15 }}>
                                <TextBold children="I want to joint the Learn&Co mailing list and receive relevant articales, offers and promotions" size={height / 55} color='#fff' />
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Btn children='VERIFY YOUR EMAIL' txtClr='grey' width={width / 1.2} height={height / 15} color='#fff' radius={20} onPress={verify} />
                        </View>

                    </ScrollView>
                    {loader ? <Loader /> : null}
                </ImageBackground>
            </SafeAreaView>
        </View>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({

    checkbox: {
        alignSelf: "center",
        height: 25,
        width: 25,

    },
    label: {
        width: '90%',
    },
});

export default CMSScreen