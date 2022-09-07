import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from '../../../components/list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';
import { Btn, CustomImg, TextBold } from '../../../components/CommanComponents';
import commanStyles from '../../../../styles/commanStyles';

//Main Function
const Step2 = ({ navigation }) => {


    const checkInSteps = [
        {
            id: '1',
            title: 'Teacher',
        },
        {
            id: '2',
            title: 'Lessons',
        },
        {
            id: '3',
            title: 'Progress',
        },
    ];

    var checkInresults = [
        {
            id: '1',
            title: 'Very knowledgeable',
            click: false,
        },
        {
            id: '2',
            title: 'Great at explaining',
            click: false,
        },
        {
            id: '3',
            title: 'Excellent match',
            click: false,
        },
        {
            id: '4',
            title: 'None of above',
            click: false,
        },
    ];

    const [open, setOpen] = useState(false)
    const [openNumber, setOpenNumber] = useState('')

    const OpenDropdown = (id) => {
        console.log("id is:;", id)
        setOpen(!open)
        setOpenNumber(id)
    }
    //design of recent steps
    const Steps = ({ item }) => (
        <View>
            <View style={{ height: height / 12, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} onPress={() => OpenDropdown(item.id)}>
                    <View style={[styles.item, { width: '90%', height: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <TextBold children={item.title} size={height / 35} />
                            <View style={{ marginVertical: 5 }} />
                            <View style={{ height: 2, backgroundColor: '#E6E9F1', width: '100%' }} />
                        </View>
                    </View>
                    <View style={{ width: 30, height: 30, position: 'absolute', right: 30 }}>
                        <Btn height='100%' width='100%' radius={30} onPress={() => OpenDropdown(item.id)}>
                            <CustomImg src={require('../../../../../assets/right_arrow.png')} height={25} width={25} />
                        </Btn>
                    </View>
                </TouchableOpacity>
            </View>
            {
                open ? openNumber == item.id ? <List data={checkInresults} renderItem={ResultItem} /> : null : null
            }

        </View>
    );

    const pressClick = (item, index) => {

        console.log("index is::", index)
    }
    //design of recent steps
    const [pressed, setPressed] = useState(false);
    const ResultItem = ({ item, index }) => {


        const onPress = () => {
            setPressed(prevPressed => !prevPressed);
        }
        return (
            <View style={{ height: height / 12, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
                    <View style={[styles.item, pressed == true ? { backgroundColor: '#1B45AF' } : { backgroundColor: '#E6E9F1' }, { width: '90%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 20 }]}>
                        <View style={{ flexDirection: 'column', marginLeft: height / 30 }}>
                            <TextBold children={item.title} size={height / 40} color={pressed == true ? 'white' : 'black'} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    const Next = () => {
        navigation.navigate('Step2Review')
    }
    //Return  View
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={[commanStyles.mainView, { backgroundColor: 'white' }]}>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: '95%', alignSelf: 'center' }}>
                        {/* Check In title */}
                        <View style={styles.viewCheckin}>
                            <TextBold children="Tell us how you feel" size={height / 30} />
                        </View>


                        <View style={{ height: height / 3.5, width: '100%' }}>
                            <CustomImg src={require('../../../../../assets/img1.png')} width="100%" height="100%" resizeMode="cover" radius={20} />
                        </View>

                        <View style={{ marginVertical: 10 }} />
                        <View style={open == true ? { height: height - 120 } : { height: height / 2.3 }}>
                            <List data={checkInSteps} renderItem={Steps} />
                        </View>


                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', right: 25, bottom: 10, height: 60, width: 60, borderRadius: 30, }}>
                    <Btn height='100%' width='100%' radius={30} color='#1B45AF' onPress={Next} >
                        <FontAwesomeIcon icon={faAngleRight} size={25} color="#fff" />
                    </Btn>
                </View>
            </View>
        </SafeAreaView>
    );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    viewCheckin: {
        height: height / 16,
        width: '80%',
        alignSelf: 'center'
    },

});

export default Step2