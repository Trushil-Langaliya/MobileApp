import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, Modal, ImageBackground } from 'react-native';
import { COLORS } from '../../styles/color';
import * as Store from '../components/auth/Store'
import { useIsFocused } from "@react-navigation/native";
import commanStyles from "../../styles/commanStyles";


const ViewModel = ({ showModal, children, role }) => {

    const styles = {
        modal: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: role == "teacher" ? COLORS.Teacher : role == "admin" ? COLORS.Admin : COLORS.Client,
            padding: 40,
        },
    };

    return (
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            onRequestClose={() => {
                console.log('Modal has been closed.');
            }}>
            {/* <View style={styles.modal}>
            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
               {children}
            </View>
        </View> */}
            <View style={[commanStyles.mainView]}>
                <ImageBackground source={require("../../../assets/Splashbg.png")} style={[commanStyles.mainView, commanStyles.centerView, { resizeMode: 'cover' }]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height:400 }}>
                        {children}
                    </View>
                </ImageBackground>
            </View>
        </Modal>
    );
};


export { ViewModel };
