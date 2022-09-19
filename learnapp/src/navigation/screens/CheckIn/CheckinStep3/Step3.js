import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from '../../../components/list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from "@react-navigation/native";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';
import { Btn, CustomImg, Loader, TextBold } from '../../../components/CommanComponents';
import commanStyles from '../../../../styles/commanStyles';
import * as Store from '../../../components/auth/Store'

//Main Function
const Step3 = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [loader, setLoader] = useState(true)
    const [checkin, setCheckin] = useState(false)
    const [data, setData] = useState('');
    const [data1, setData1] = useState(['']);

    useEffect(() => {
        if (isFocused) {
            setLoader(true)
            setTimeout(async () => {
                var usercheckin = await Store.getData(Store.checkin)
                setCheckin(usercheckin)
                console.log("tellUsHowYouFeel *************", usercheckin.data.tellUsHowYouFeel)
                setLoader(false)
            })

        }
    }, [isFocused]);

   
    const [open, setOpen] = useState(false)
    const [openNumber, setOpenNumber] = useState('')

    const OpenDropdown = (heading, index) => {
        setData1(index)
        setOpen(!open)
        setOpenNumber(heading)
    }

    //design of recent steps
    const Steps = ({ item, index }) => {
        setData(item)

        return (
            <View>
                <View style={{ height: height / 12, width: width, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} onPress={() => OpenDropdown(item.heading, index)}>
                        <View style={[styles.item, { width: '90%', height: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                <TextBold children={item.heading} size={height / 35} />
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
                    open ? openNumber == item.heading ? <List data={data.options} renderItem={ResultItem} /> : null : null
                }

            </View>
        )
    };


    //design of recent steps
    const ResultItem = ({ item, index }) => {



        const onPress = () => {
            let newArr = [...checkin.data.reflectionOnNextSteps];
            // newArr[data1].values[index].isChecked = !newArr[data1].values[index].isChecked

            if (index == 0) {
                newArr[data1].options[index].isChecked = !newArr[data1].options[index].isChecked
                newArr[data1].options[1].isChecked = false
                newArr[data1].options[2].isChecked = false
            } else if (index == 1) {
                newArr[data1].options[index].isChecked = !newArr[data1].options[index].isChecked
                newArr[data1].options[0].isChecked = false
                newArr[data1].options[2].isChecked = false
            } else {
                newArr[data1].options[index].isChecked = !newArr[data1].options[index].isChecked
                newArr[data1].options[0].isChecked = false
                newArr[data1].options[1].isChecked = false
            }

            console.log("new array::", newArr[data1].options[index])
            setData(newArr)
        }
        return (
            <View style={{ height: height / 12, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
                    <View style={[styles.item, checkin.data.reflectionOnNextSteps[data1].options[index].isChecked == true ? { backgroundColor: '#1B45AF' } : { backgroundColor: '#E6E9F1' }, { width: '90%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 20 }]}>
                        <View style={{ flexDirection: 'column', marginLeft: height / 30 }}>
                            <TextBold children={item.title} size={height / 40} color={checkin.data.reflectionOnNextSteps[data1].options[index].isChecked == true ? 'white' : 'black'} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    const btnSave = () => {
        setLoader(true)
        let newparms = {
            'measureYourProgress': checkin.data.measureYourProgress,
            'tellUsHowYouFeel': checkin.data.tellUsHowYouFeel,
            'reflectionOnNextSteps': checkin.data.reflectionOnNextSteps
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJodHRwczovL2xhYy10ZXN0LWFwaS5oZXJva3VhcHAuY29tIiwiaWF0IjoxNjYyMDM1OTYyNzg2LCJhdWRpZW5jZSI6WyJodHRwOi8vbG9jYWxob3N0LyIsImh0dHBzOi8vbGFjLXRlc3Qtc2l0ZS5oZXJva3VhcHAuY29tIl0sInN1YmplY3QiOiI2MzBmMjE4ZDdmNWYyZjMyNmM1MTIyNzgiLCJzY29wZSI6WyJjbGllbnQiXSwic3RhdHVzIjoiYWN0aXZlIiwiZXhwIjoxNjYyMDM1OTY2Mzg2fQ.vj-HMgKtWGgnzI0DFrB5h69GsLw5mJSAaafXWvrlrSA' },
            body: JSON.stringify(newparms)
        };

        setTimeout(async () => {
            let response = await fetch('https://lac-test-api.herokuapp.com/api/v1/checkIn', requestOptions)
            if (response && response.status === 401) {
                console.error('There was an error 401!');
            } else if (response) {
                const data = await response.json()

                setTimeout(async () => {

                    var userStoredToken = await Store.getData(Store.userToken)
                    // var userStoredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJodHRwczovL2xhYy10ZXN0LWFwaS5oZXJva3VhcHAuY29tIiwiaWF0IjoxNjYyMDM1OTYyNzg2LCJhdWRpZW5jZSI6WyJodHRwOi8vbG9jYWxob3N0LyIsImh0dHBzOi8vbGFjLXRlc3Qtc2l0ZS5oZXJva3VhcHAuY29tIl0sInN1YmplY3QiOiI2MzBmMjE4ZDdmNWYyZjMyNmM1MTIyNzgiLCJzY29wZSI6WyJjbGllbnQiXSwic3RhdHVzIjoiYWN0aXZlIiwiZXhwIjoxNjYyMDM1OTY2Mzg2fQ.vj-HMgKtWGgnzI0DFrB5h69GsLw5mJSAaafXWvrlrSA'
                    return fetch(`https://lac-test-api.herokuapp.com/api/v1/checkIn`
                        , {
                            method: `GET`,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${userStoredToken}`
                            },
                        }
                    )
                        .then((response) => response.json())
                        .then(response => {
                            // console.log("checkIn API response :::", response.data.measureYourProgress[0]);
                            Store.setData(Store.checkin, response)
                            
                            setLoader(false)
                        })
                        .catch(error => {
                            console.error(`Error: ${error}`)
                        });

                })
            } else {
                console.error('There was an error!');
            }
        })

    }

    const Next = () => {
        navigation.navigate('Step3Review')
    }

    //Return  View
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={[commanStyles.mainView, { backgroundColor: 'white' }]}>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: '95%', alignSelf: 'center' }}>
                        {/* Check In title */}
                        <View style={styles.viewCheckin}>
                            <TextBold children="Refelct on next steps" size={height / 30} />
                        </View>

                        {/* Tell us Text */}
                        <View style={styles.ViewTellus}>
                            <View style={styles.subviewTellus}>
                                <TextBold children="Tell us what you'd like to focus on next month." size={height / 60} textAlign="center" />
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }} />
                        <View style={{ height: height / 3.5, width: '100%' }}>
                            <CustomImg src={require('../../../../../assets/img1.png')} width="100%" height="100%" resizeMode="cover" radius={20} />
                        </View>

                        <View style={{ marginVertical: 10 }} />

                        {
                            loader ? <Loader />
                                :
                                <View style={open == true ? { height: height - 120 } : { height: height / 2.3 }}>
                                    <List data={checkin.data.reflectionOnNextSteps} renderItem={Steps} />
                                </View>
                        }

                        <Btn children="Save" width="90%" height={height / 15} color="#1B45AF" txtClr="white" radius={20} txtSize={height / 35} onPress={btnSave} />
                        <View style={{ marginVertical: 40 }} />
                        <View style={{ position: 'absolute', right: 25, bottom: 10, height: 60, width: 60, borderRadius: 30, }}>
                            <Btn height='100%' width='100%' radius={30} color='#1B45AF' onPress={Next} >
                                <FontAwesomeIcon icon={faAngleRight} size={25} color="#fff" />
                            </Btn>
                        </View>
                    </View>
                </ScrollView>
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
    ViewTellus: {
        height: height / 16,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#E6E9F1',
        borderRadius: 10,
        justifyContent: 'center'
    },
    subviewTellus: {
        height: '80%',
        width: '98%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10
    }
});

export default Step3