import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from '../../components/list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Btn, CustomImg, Loader, TextBold, TextRegular } from '../../components/CommanComponents';
import * as Progress from 'react-native-progress';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../../components/auth/Store'

//Main Function
const CheckInSteps = ({ navigation }) => {

    //View will appear 
    const isFocused = useIsFocused();
    const [loader, setLoader] = useState(true)
    const [checkin, setCheckin] = useState(false)
    const [mydata, setData] = useState('');
    const [mydata1, setData1] = useState(['']);
    useEffect(() => {
        if (isFocused) {
            setLoader(true)
            setTimeout(async () => {
                var usercheckin = await Store.getData(Store.checkin)
                setCheckin(usercheckin)
                setLoader(false)
            })

        }
    }, [isFocused]);






    const [open, setOpen] = useState(false)
    const [openNumber, setOpenNumber] = useState('')

    const OpenDropdown = (heading, index) => {
        console.log("index is:;", index)
        setData1(index)
        setOpen(!open)
        setOpenNumber(heading)
    }


    const Steps = ({ item, index }) => {
        // console.log("******", item)
        setData(item)
        return (
            <View>
                <View style={{ height: height / 10, width: width, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} onPress={() => OpenDropdown(item.heading, index)}>
                        <View style={[styles.item, { width: '90%', height: '100%', flexDirection: 'row', borderRadius: 10 }]}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                                <TextBold children={item.heading} size={height / 40} />
                                <View style={{ marginVertical: height / 90 }} />
                                <View style={{ height: 2, backgroundColor: '#E6E9F1', width: '100%' }} />
                            </View>

                        </View>
                        <View style={{ width: 30, height: "100%", justifyContent: 'center', position: 'absolute', right: 30 }}>
                            <Btn height={30} width='100%' radius={30} onPress={() => OpenDropdown(item.id)}>
                                {
                                    open ? <CustomImg src={require('../../../../assets/bottomarrow.png')} height={25} width={25} /> : <CustomImg src={require('../../../../assets/right_arrow.png')} height={25} width={25} /> 
                                }
                                
                            </Btn>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    open ? openNumber == item.heading ? <List data={mydata.options} renderItem={ResultItem} /> : null : null
                }
            </View>
        )
    }

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
            console.log('Here is the response of Sign up user details!', requestOptions);
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
                            navigation.navigate('Step1Review')
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

    };


    //design of recent steps
    const ResultItem = ({ item, index }) => {
        const onPress = () => {

            let newArr = [...checkin.data.measureYourProgress];
            for (i = 0; i < newArr[mydata1].options.length; i++) {
                if (newArr[mydata1].options[i].isChecked == true) {
                    newArr[mydata1].options[i].isChecked = false
                }
            }
            newArr[mydata1].options[index].isChecked = !newArr[mydata1].options[index].isChecked
            setData(newArr)

        }
        return (
            <View style={{ height: height / 12, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
                    <View style={[styles.item, checkin.data.measureYourProgress[mydata1].options[index].isChecked == true ? { backgroundColor: '#1B45AF' } : { backgroundColor: '#E6E9F1' }, { width: '90%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 20 }]}>
                        <View style={{ flexDirection: 'column', marginLeft: height / 30 }}>
                            <TextBold children={item.title} size={height / 40} color={checkin.data.measureYourProgress[mydata1].options[index].isChecked == true ? 'white' : 'black'} />
                        </View>

                        <View style={{ position: 'absolute', right: 0 }}>
                            <Progress.Circle progress={`0.${checkin.data.measureYourProgress[mydata1].options[index].value}`} formatText={() => { return `${checkin.data.measureYourProgress[mydata1].options[index].value}%` }} unfilledColor='lightgreen' fill="white" showsText={true} animated={true} size={height / 14} textStyle={{ color: 'black' }} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    //Return  View
    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>

            <SafeAreaView>

                <View style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>
                    <ScrollView>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginVertical: 10 }} />
                            <View style={{ height: height / 16, width: '90%', alignSelf: 'center' }}>
                                <TextBold children="Measure your Progress" size={height / 40} />
                            </View>
                            <View style={{ height: height / 16, width: '90%', alignSelf: 'center', backgroundColor: '#E6E9F1', borderRadius: 10, justifyContent: 'center' }}>
                                <View style={{ height: '80%', width: '98%', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10 }}>
                                    <TextBold children="Tell us about progress on each skill." size={height / 55} textAlign="center" />
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }} />
                            <View style={{ height: height / 3, width: '90%', backgroundColor: '#E6E9F1', borderRadius: 20, justifyContent: 'center', }}>
                                <CustomImg src={require('../../../../assets/checkin_girl2.png')} width="100%" height="100%" resizeMode="cover" radius={30} />
                            </View>

                            <View style={{ marginVertical: 10 }} />
                            <View style={{ height: height / 6, width: '95%', backgroundColor: '#1B45AF', borderRadius: 30 }}>
                                <View style={{ height: '95%', width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                                    <TextBold children="We use this to help us tailor your plan so that you can continue enjoying your lessons and reach your goals!" size={height / 55} color="#fff" textAlign="center" />
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }} />

                            {
                                loader ? <Loader />
                                    :
                                    <View style={open == true ? { height: height - 50 } : { height: height / 2 }}>
                                        <List data={checkin.data.measureYourProgress} renderItem={Steps} />
                                    </View>
                            }
                            <Btn children="Save" width="90%" height={height / 15} color="#1B45AF" txtClr="white" radius={20} txtSize={height / 35} onPress={btnSave} />
                            <View style={{ marginVertical: 10 }} />

                        </View>

                    </ScrollView>

                </View>

            </SafeAreaView>

        </View>
    );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({

});

export default CheckInSteps