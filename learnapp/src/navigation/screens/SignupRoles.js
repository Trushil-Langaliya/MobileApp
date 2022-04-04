//Packages
import React, { useState } from 'react';
import {View, SafeAreaView, TouchableOpacity, Text, StatusBar, ScrollView} from 'react-native';
import {StyleSheet,Dimensions} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AspectImage from '../../../Components/AspectImage';
import styles from '../../styles/styles';
import { BoldText } from '../../../Components/Text';

//Main Function
const SignupRoles = ({navigation}) => {

    //Variables
    const [checkBoxTeacher, setCheckBoxTeacher] = useState(true)
    const [checkBoxClient, setCheckBoxClient] = useState(false)

    const selectedRole = () => {
        if (checkBoxTeacher == true){
            navigation.navigate('Signup',{role:'Teacher'})
        }else{
            navigation.navigate('Signup',{role:'Client'})
        }
    }


    //Return Screen View
    return(
        <SafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor="transparent" />
        <View style = {styles.ViewStyle}>
            <View style = {styles.container}>
                <View style = {styles.mainView}>
                <AspectImage src={require('../../../assets/Man_on_laptop.png')} height={250} />
                    <BoldText>Which are you signing up for?</BoldText>
                    <View style={{marginVertical: 12}}></View>
                    <View style = {style.checkBoxView}>
                        <View style = {style.checkBox}>
                            <CheckBox
                                disabled={false}
                                value={checkBoxTeacher}
                                tintColors={{ true: '#2E2E2E', false: '#A4A4A4' }}
                                onValueChange={(newValue) => { setCheckBoxTeacher(newValue);setCheckBoxClient(!newValue)}}
                            /><Text style={style.txtcheckBox}>Teacher</Text>
                        </View>
                        <View style = {style.checkBox}>
                            <CheckBox
                                disabled={false}
                                value={checkBoxClient}
                                tintColors={{ true: '#2E2E2E', false: '#A4A4A4' }}
                                onValueChange={(newValue) => {setCheckBoxTeacher(!newValue);setCheckBoxClient(newValue)}}
                            /><Text style={style.txtcheckBox}>Client</Text>
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity style={[styles.btnNext, checkBoxClient===true? {backgroundColor:'#4B7898'}: {backgroundColor:'#6F989E'} ]}  onPress={() => selectedRole()} >
                            <Text style={style.btnText} >Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </SafeAreaView>
    );
};


//Styles

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const style = StyleSheet.create ({
    
    txtbold:{
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000000',
        fontFamily: 'Poppins-SemiBold'
    },
    checkBoxView:{
        height: height/3,
        width: width/2.5 ,
        flexDirection: 'column',
        alignItems:'flex-start',
    },  
    checkBox:{
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 20,
        fontSize: 30,
    },
    txtcheckBox:{
        fontSize: 22,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000000',
        marginLeft: 20,
    },
   
    btnText:{
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,  
        fontFamily: 'Poppins-Regular',
    }
  })

export default SignupRoles
