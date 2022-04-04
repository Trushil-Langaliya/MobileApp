//packages
import React, { useState } from 'react';
import { Component } from 'react';  
import {StyleSheet, Dimensions, View, SafeAreaView, StatusBar,ScrollView,Text,TouchableOpacity,LogBox,KeyboardAvoidingView,Alert} from 'react-native';
import AspectImage from '../../../Components/AspectImage';
import styles from '../../styles/styles';
import FormInput from '../../../Components/FormInput';
import {BodyText, SubtitleText, TitleText} from '../../../Components/Text';
import CheckBox from '@react-native-community/checkbox';
import loginValidation from '../components/Validation';
import Api from '../components/auth/Api';
import AlertDiolog from '../components/auth/AlertDiolog';

LogBox.ignoreAllLogs(true)  // hide warnings

//Main Function
const Signin = ({navigation}) => {

    //variables
    const [checkBoxRemember, setCheckBoxRemeber] = useState(false);
    const [txtEmail, setEmail] = useState('');
    const [txtPassword, setPassword] = useState('');

    // Text component
    const Section = ({children, title}): Node => {
        return (
          <View style={style.container}>
            <TitleText style={styles.titleText}>{title}</TitleText>
            {children}
          </View>
        );
      };


      //Signin Action
      const btnSignin = () => {

        const EmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        //   loginValidation(txtEmail, txtPassword);
        if (txtEmail.trim().length == 0 && txtPassword.trim().length == 0){
            AlertDiolog("The email field is required.");
        }else if (EmailValidation.test(txtEmail) == false) {
            AlertDiolog("The email field must be a valid email.");
        }else if (txtPassword.trim().length < 7){
            AlertDiolog("The password field must be at least 8 characters.");
        }else{
            var a = Api(apiName='authenticate', data= { "email" : txtEmail, "password" : txtPassword}, method='POST');
            a.then((result) => setdata(result))
        }
        
    }

    setdata = (result) => {
        if (result.success == false){
            AlertDiolog(`${result.data.msg}`)
        }else{
            AlertDiolog(`${result.data.msg}`)
        }
    }
      
    //Return  View
    return(
        <SafeAreaView>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
        <StatusBar barStyle={'dark-content'} backgroundColor="transparent" /> 
        <View style = {styles.ViewStyle}>

            <View style = {style.imgView}>
                <AspectImage src={require('../../../assets/Man_on_laptop.png')} height={250} />
            </View>

            <View style = {style.mainContainer}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">        
                <View style = {style.loginView}>
                    <View style = {style.formView}>

                        <View style={{marginVertical: 18}}></View>
                            <Section title="Lets get you signed in" >
                                <View style={{marginVertical: 8}}></View>
                                <SubtitleText>
                                    Enter your login details to access your account
                                </SubtitleText>
                                <View style={{marginVertical: 5}}></View>
                            </Section>
                        <View>

                        <FormInput placeholder="Email" onchange={(txtEmail) => setEmail(txtEmail)}/>
                        <FormInput placeholder="Password" obscure onchange={(txtPassword) => setPassword(txtPassword)}/>

                        <View style={style.rememberView}>
                            <CheckBox 
                                disabled={false}
                                value={checkBoxRemember}
                                tintColors={{ true: '#2E2E2E', false: '#A4A4A4' }}
                                onValueChange={(newValue) => setCheckBoxRemeber(newValue)}
                            />
                            <BodyText><Text style={{fontFamily: "Poppins-SemiBold",fontSize: 13}}> Remember me?</Text></BodyText>
                            <View style={{marginHorizontal: 30}}></View>
                            
                            <TouchableOpacity  onPress={() => navigation.navigate('ForgotScreen')} >
                                <Text style={{color: 'red',fontSize: 13, fontFamily: 'Poppins-SemiBold',}}> Forgot password?</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{marginVertical: 10}}></View>

                        <TouchableOpacity style={{backgroundColor:'rgba(51, 110, 145,1.0)',borderWidth: 1,
                            borderColor: '#fff',
                            alignSelf: 'center',
                            width: width/2,
                            height: height/15,
                            justifyContent: 'center', 
                            borderRadius:10}} 
                            onPress={() => btnSignin()} >
                        <Text style={{color: '#fff',textAlign:'center', fontSize: 20, fontFamily: 'Poppins-SemiBold',}}> Next</Text>
                        </TouchableOpacity>

                        <View style={{marginVertical: 8}}></View>

                        <View 
                        style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                }}>
                        <BodyText>Don't have an account yet?</BodyText>
                        <TouchableOpacity  onPress={() => navigation.navigate('SignupRoles')} >
                                <Text style={style.btnSignup} >Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginVertical: 28}}></View>

                    </View>
                    </View>
                    
                </View>
            </ScrollView>
            </View>
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    imgView:{
        width: width/1.2,
        alignSelf:'center',
    },
    mainContainer: {
        backgroundColor: 'white',
        width: width,
        height: undefined,
        position: 'absolute',
        borderRadius: 25,
        bottom: 0,
        top: 210,
        //android specific
        elevation: 10,
        //ios specific
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        marginTop: 2,
        shadowColor: '#000',
    },
    loginView:{
        width: width,
        height: undefined,
        borderRadius: 25,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    formView:{
        width: width/1.1,
        // backgroundColor: 'red'
    },
    rememberView:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    btnSignup:{
       fontFamily: 'Poppins-SemiBold',
       marginLeft: 5,
       textDecorationLine: 'underline',
       color: '#000000'
    },
    container: {
      marginHorizontal: 8,
      paddingHorizontal: 8,
      marginVertical: 8,    
    },
    centerContent: {
      justifyContent: 'center',
    },
  });

export default Signin