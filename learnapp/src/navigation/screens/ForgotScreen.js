//packages
import React, { useState } from 'react';
import {StyleSheet, Dimensions, View, SafeAreaView, StatusBar,ScrollView,Text,TouchableOpacity,LogBox} from 'react-native';
import AspectImage from '../../../Components/AspectImage';
import styles from '../../styles/styles';
import FormInput from '../../../Components/FormInput';
import {BodyText, SubtitleText, TitleText, BoldText} from '../../../Components/Text';
import CheckBox from '@react-native-community/checkbox';
import TextButton from '../../../Components/TextButton';


//Main Function
const ForgotScreen = ({navigation}) => {

    // Text component
    const Section = ({children, title}): Node => {
        return (
          <View style={style.container}>
            <TitleText style={styles.titleText}>{title}</TitleText>
            {children}
          </View>
        );
      };
   
      
    //Return  View
    return(
        <SafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor="transparent" />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style = {styles.ViewStyle}>
            <View style = {styles.container}>
                <View style = {styles.mainView}>
                    <AspectImage src={require('../../../assets/l&co_logo_black.png')} height={80} />
                    <View style={{marginVertical: 30}}></View>
                    <AspectImage src={require('../../../assets/exam.png')} height={200} />
                    <View style={{marginVertical: 8}}></View>
                    <Section title="Forgot Password?" >
                        <View style={{marginVertical: 8}}></View>
                        <SubtitleText>
                            We are here to help you to recover your password. 
                            Enter the email address you signed up with and we'll send you instructions to reset you password
                        </SubtitleText>
                        <View style={{marginVertical: 5}}></View>
                    </Section>
                    <FormInput placeholder="Email Address" onchange={(txtEmail) => setEmail(txtEmail)}/>
                    <View style={{marginVertical: 20}}></View>

                    <View style={style.rememberView}>

                            {/* <TouchableOpacity style={{backgroundColor: 'blue',fontSize: 13, fontFamily: 'Poppins-SemiBold',}} onPress={() => navigation.navigate('ForgotScreen')} >
                                <Text style={{color: '#ffffff',fontSize: 13, fontFamily: 'Poppins-SemiBold',}}>Send</Text>
                            </TouchableOpacity> 

                            <View style={{marginHorizontal: 30}}></View>
                            
                            <TouchableOpacity style={{backgroundColor: 'blue',fontSize: 13, fontFamily: 'Poppins-SemiBold',}} onPress={() => navigation.navigate('ForgotScreen')} >
                                <Text style={{color: '#ffffff',fontSize: 13, fontFamily: 'Poppins-SemiBold',}}>Send</Text>
                            </TouchableOpacity> */}

                        </View>
                </View>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    rememberView:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
  });
export default ForgotScreen