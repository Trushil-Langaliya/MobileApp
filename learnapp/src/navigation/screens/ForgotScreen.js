//packages
import React, { useState, Component } from 'react';
import { StyleSheet, Dimensions, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import FormInput from '../../../Components/FormInput';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AlertDiolog, CustomImg, GeneralView, Keyboard, Loader, TextBold, TextRegular } from '../components/CommanComponents';
import commanStyles from '../../styles/commanStyles';
import Api from '../components/auth/Api';

//Main Function
const ForgotScreen = ({ navigation }) => {

    const [txtEmail, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loader, setLoader] = useState(false)


    const btnSent = () => {
        const EmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //   loginValidation(txtEmail, txtPassword);
        if (txtEmail.trim().length == 0) {
            AlertDiolog("The email field is required.");
        } else if (EmailValidation.test(txtEmail) == false) {
            AlertDiolog("The email field must be a valid email.");
        } else {
            setLoader(true)
            var a = Api(apiName = '/user/passwordreset', data = {"email": txtEmail}, method = 'POST');
            a.then((result) => emailSent(result))
        }
    }

    const emailSent = (result) => {
        setLoader(false)
        console.log('result is::',result)
        if (result.success == false){
            AlertDiolog(result.msg);
        }else{
            setSent(true)
            AlertDiolog(result.msg);
        }
       
    }

    //Return  View
    return (
        <GeneralView>
            <SafeAreaView>
                <Keyboard>
                    <View style={{ marginVertical: 10 }} />
                    <View style={[commanStyles.centerView]}>
                        <CustomImg src={require('../../../assets/l&co_logo_black.png')} height={height / 8} width={height / 8} />
                    </View>
                    <View style={{ marginVertical: 20 }} />
                    <View style={[commanStyles.centerView]}>
                        {
                            sent ?
                                <CustomImg src={require('../../../assets/Group_of_people.png')} height={200} width={200} />
                                :
                                <CustomImg src={require('../../../assets/exam.png')} height={height / 4} width={200} />
                        }
                    </View>
                    <View style={{ marginVertical: height / 80 }} />
                    <View style={[commanStyles.centerView, { width: '100%' }]}>
                        {
                            sent ?
                                <View>
                                    <TextBold children="Email Sent!" size={height / 40} />
                                    <View style={{ marginVertical: height / 80 }}></View>
                                    <View style={{ width: '80%', alignSelf: 'center' }}>
                                        <TextRegular children=" Check your Email for instructions on how to recover your password. (if you can't find the email, check your spam inbox)." size={height / 70} />
                                    </View>
                                    <View style={{ marginVertical: 5 }}></View>
                                </View>
                                :
                                <View>
                                    <TextBold children="Forgot Password?" size={height / 40} />
                                    <View style={{ marginVertical: height / 80 }}></View>
                                    <View style={{ width: '90%', alignSelf: 'center', }}>
                                        <TextRegular children=" We are here to help you to recover your password." size={height / 70} />
                                        <TextRegular children=" Enter the email address you signed up with and we'll send you instructions to reset you password" size={height / 70} />
                                    </View>
                                    <View style={{ marginVertical: 5 }}></View>
                                </View>
                        }
                    </View>
                    <View style={[commanStyles.centerView, { width: '100%' }]}>
                        {sent ? null : <FormInput placeholder="Email Address" onchange={(txtEmail) => setEmail(txtEmail)} />}
                    </View>

                    <View style={[style.rowView, commanStyles.centerView, { width: '100%', alignSelf: 'center' }]}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-Medium', marginLeft: 10 }}>Back</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 60 }}></View>
                        {sent ? null :
                            <View style={{ marginHorizontal: 40 }}></View>}
                        {sent ? null :
                            <TouchableOpacity style={{ fontSize: 13, fontFamily: 'Poppins-SemiBold', backgroundColor: 'rgba(51, 110, 145,1.0)', borderRadius: 15, width: 120, alignItems: 'center', height: 35, justifyContent: 'center', }} onPress={() => btnSent()} >
                                <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Poppins-SemiBold', }}>Send</Text>
                            </TouchableOpacity>}
                    </View>
                    {loader ? <Loader /> : null}
                </Keyboard>
            </SafeAreaView>
        </GeneralView>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: 50,
        width: '100%',
    },
});
export default ForgotScreen