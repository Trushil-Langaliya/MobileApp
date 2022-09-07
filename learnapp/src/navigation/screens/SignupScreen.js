//packages
import React, { useState } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, SafeAreaView } from 'react-native';
import commanStyles from '../../styles/commanStyles';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import InputBox, { AlertDiolog, Btn, Keyboard, TextBold, TextRegular } from '../components/CommanComponents';


//Main Function
const SignupScreen = ({navigation}) => {

    const [txtName, settxtName] = useState('');


    const Next = () => {
        if (txtName.length == 0){
            AlertDiolog('Please enter your name');
        }else{
            navigation.navigate('CMSScreen',{
                name: txtName,})
        }
    }

    const btnlogin = () => {
            navigation.navigate('Signin')
    }

    //Return  View
    return (
        <View style={[commanStyles.mainView]}>
            <SafeAreaView>
            <Keyboard>
                <ImageBackground
                    source={require('../../../assets/Splashbg.png')}
                    style={commanStyles.mainView}
                >
                    <View style={{ height: '50%', width: '100%'}}>
                        <ImageBackground
                            source={require('../../../assets/Signup1.jpeg')}
                            style={commanStyles.mainView}
                            imageStyle={styles.mainbg}
                        />
                    </View>

                    <View style={styles.userInfo}>
                        <TextBold children="WHAT'S YOUR NAME?" size={height / 35} color='#fff' />
                        <View style={{ marginVertical: 40 }}>
                            <InputBox label="Your first name" icon={true} defaultValue={''} onChangeText={(txtName) => settxtName(txtName)} onSubmitEditing={Keyboard.dismiss} height={height/20}/>
                        </View>

                        {/* Sign In Button */}
                        <View style={[{ flexDirection: 'row' }]}>
                            <TextRegular children="ALREADY HAVE AN ACCOUNT?" size={height / 58} color='#fff' />
                            <View style={{ marginLeft: 5 }}>
                                <Btn children={'LOG IN'} txtClr='#fff' txtSize={height / 55} fontFamily='Poppins-SemiBold' textDecorationLine='underline' onPress={btnlogin}/>
                            </View>
                        </View>

                        <View style={{ marginVertical: 5 }} />

                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            <View style={{ height: height / 16, width: height / 16, borderRadius: height / 8, }}>
                                <Btn height='100%' width='100%' radius={height} color='#fff' onPress={Next}>
                                    <FontAwesomeIcon icon={faAngleRight} size={height/40} />
                                </Btn>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </Keyboard>
            </SafeAreaView>
        </View>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    mainbg: {
        resizeMode: 'cover',
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 3
    },
    userInfo : {
        height: '42%', 
        width: '90%', 
        position: 'absolute', 
        bottom: 0, 
        margin: 20
    }
});

export default SignupScreen