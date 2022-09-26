//packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, SafeAreaView, Text,TouchableOpacity } from 'react-native';
import commanStyles from '../../styles/commanStyles';
import InputBox, { AlertDiolog, Btn, CustomImg, Keyboard, TextBold, TextRegular } from '../components/CommanComponents';
import { ScrollView } from 'react-native-gesture-handler';


//Main Function
const VerifyEmail = ({ route, navigation }) => {

    const [gif, setgif] = useState(true);
   

    useEffect(() => {
        console.log("route", route.params.Email)
        setTimeout(async () => {
            setgif(false)
        }, 5000);
    }, [])
    //Btn SignIn
    const btnSignin = () => {
        navigation.navigate('Signin')
    }

    //Return  View
    return (
        <View style={[commanStyles.mainView]}>
            <SafeAreaView />
            <ImageBackground
                source={require('../../../assets/Splashbg.png')}
                style={[commanStyles.mainView]}
            >
                {
                    gif == true ?
                        <View style={[{ height: '100%', width: '100%', justifyContent: 'center' }]}>
                            <View style={[{ height: '60%', width: '80%', alignSelf: 'center', }]}>
                                <CustomImg src={require('../../../assets/verify.gif')} height="100%" width="100%" />
                            </View>
                        </View> :
                        <View style={[{ height: '100%', width: '100%' }, commanStyles.centerView]}>
                            <ScrollView>
                                <View style={{ marginVertical: 20 }} />
                                <View style={{ margin: 10, justifyContent: 'center', alignSelf: 'center' }}>
                                    <CustomImg src={require('../../../assets/mail.png')} height={height / 12} width={height / 12} tintClr='#fff' />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <TextBold children='CHECK YOUR INBOX' textAlign='center' size={height / 35} color='#fff' />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <TextBold children={`We've just emailed ${route.params.Email}`} textAlign='center' size={height / 45} color='#fff' />
                                </View>
                                <View style={{ margin: 20 }}>
                                    <TextBold children="Open your email on your phone. Click the link inside. it'll sign you into Learn&Co." textAlign='center' size={height / 45} color='#fff' />
                                </View>
                                <View style={{ margin: 20 }}>
                                    <TextBold children="Haven't got your email? Double check your email address above and check it isn't in your spam folder." textAlign='center' size={height / 45} color='#fff' />
                                </View>
                                <View style={{ margin: 20 }}>
                                    <TextBold children="Still no joy? Please go back and enter your email again." textAlign='center' size={height / 45} color='#fff' />
                                </View>
                                <View style={{ margin: 20, width:'70%', alignSelf:'center', height:50 }}>
                                    <Btn color="#fff" children="Re-enter your email" txtSize={height / 45} height={50} width="100%" txtClr='#3C87AA' radius={10} onPress={() => navigation.goBack()} />
                                </View>
                                <View style={{ width: 100, height: 100, position: 'absolute', top: 15, right: -60 }}>
                                    <TouchableOpacity onPress={btnSignin}>
                                        <CustomImg src={require('../../../assets/white_cross.png')} height={30} width={30}/>
                                    </TouchableOpacity>
                                    </View>
                            </ScrollView>
                        </View>
                }
            </ImageBackground>

        </View>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({

});

export default VerifyEmail