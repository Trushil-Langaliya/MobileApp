import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../components/auth/Store'
import ViewSlider from 'react-native-view-slider'
import { List } from '../components/list';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../styles/color';
import { AlertPermission, Notification } from '../components/CommanComponents';


//Main Function
const ProfileScreen = ({ navigation }) => {


    //Logout functionality
    const btnLogout = () => {
        Alert.alert(
            "Learn&Co",
            "Are you sure you want to logout?",
            [
                
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                    onPress: () => {

                    },
                },
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        Store.clearStorage()
                        navigation.navigate('Signin')

                    },
                },
            ]
        );
    }
    //Return  View
    return (
        <SafeAreaView>
            <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end' }}>


                {/* Logout */}

                <View style={styles.listViewoption}>
                    <TouchableOpacity style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }} onPress={() => btnLogout()}>
                        <View style={[styles.userIconView]}>
                            <Image
                                source={require("../../../assets/logout.png")}
                                style={{ height: '60%', width: '60%' }}
                            />
                        </View>
                        <View style={{ marginLeft: height / 25, }}>
                            <Text style={styles.title}>Logout</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 0 }}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </View>
                    </TouchableOpacity>
                </View>



            </View>
        </SafeAreaView>
    );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    SafeAreaProvider: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    viewTitle: {
        width: '100%',
        height: height / 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    TopTitle: {
        fontSize: height / 35,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000000',
    },

    //Client View
    clientsDetailsFirstView: {
        height: '100%',
        width: '90%',
        backgroundColor: '#081825',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    clientsDetailsFirstsubView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    clientsDetailsFirstsubViewImg: {
        height: height / 12,
        width: height / 12,
        borderRadius: height / 6,
        marginLeft: 20,
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    clientsDetailsFirstsubViewTxt: {
        fontSize: height / 40,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    lineView: {
        height: '5%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linebgsubView: {
        height: '5%',
        width: '80%',
        backgroundColor: 'lightgrey'
    },
    listbgView: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#ffffff',
    },
    listViewoption: {
        height: height / 12,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',

    },


    btneditView: {
        height: height / 30,
        width: height / 30,
        backgroundColor: COLORS.lightgreen,
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 15,

    },
    iconEdit: {
        height: '50%',
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        tintColor: '#ffffff'
    },


    profileDetails: {
        width: width - 30,
        height: undefined,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    viewBox: {
        paddingHorizontal: 20,
        width: width,
        padding: 10,
        alignItems: 'center',
    },
    slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: undefined
    },


    listtitle: {
        color: 'black',
        fontSize: height / 50,
    },

    userIconView: {
        height: height / 20,
        width: height / 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default ProfileScreen