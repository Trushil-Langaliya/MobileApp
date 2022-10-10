import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Btn, CustomImg, Loader, TextBold, TextRegular } from '../../components/CommanComponents';
import { List } from '../../components/list';
import Api from '../../components/auth/Api';
import * as Store from '../../components/auth/Store'

//Main Function
const EditPlan = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [loader, setLoader] = useState(true)
    const [response, setResponse] = useState('');
    let today = new Date();
    
    useEffect(() => {
        if (isFocused) {
            setLoader(true)
            setTimeout(async () => {


                if (selectedDate.length == 0) {
                    GetPlanning(today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate())
                } else {
                    GetPlanning(`${daylist[selectedDate].getFullYear()}-${daylist[selectedDate].getMonth()}-${daylist[selectedDate].getDate()}`)
                }
            })
        }
    }, [isFocused]);

    const GetPlanning = (date) => {
        //API CALL
        setLoader(true)
        Api.planning(date)
            .then(responseJson => {
                console.log("Planning GET API response::", responseJson)
                setResponse('')
                Store.setData(Store.planning, responseJson)
                setResponse(responseJson)
                console.log("responseJson",responseJson)
                setLoader(false)
            })
            .catch(error => console.warn(error));
    }

    const [selectedDate, setSelectedDate] = useState('')
    const [day, setDay] = useState([{ day: 'Sunday', isCheck: false }, { day: 'Monday', isCheck: false }, { day: 'Tuesday', isCheck: false }, { day: 'Wednesday', isCheck: false }, { day: 'Thursday', isCheck: false }, { day: 'Friday', isCheck: false }, { day: 'Sunday', isCheck: false }]);
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var myDate = new Date(curr.setDate(first));
    var myDate2 = new Date(curr.setDate(last));

    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };



    var daylist = getDaysArray(new Date(`${myDate}`), new Date(`${myDate2}`));
    daylist.map((v) => v.toISOString().slice(0, 10)).join("")


    if (selectedDate.length == 0) {
        for (i = 0; i < daylist.length; i++) {
            if (daylist[i].getDate() == new Date().getDate()) {
                let newArr = [...day];

                newArr[i].isCheck = true
            }
        }
    }



    //design of recent steps
    const WeekDates = ({ index }) => {
        const btnDate = (index) => {
            let newArr = [...day];
            for (i = 0; i < newArr.length; i++) {
                newArr[i].isCheck = false
            }
            newArr[index].isCheck = !newArr[index].isCheck
            GetPlanning(`${daylist[index].getFullYear()}-${daylist[index].getMonth()}-${daylist[index].getDate()}`)
            setSelectedDate(index)
            setDay(newArr)

        }
        return (
            <TouchableOpacity onPress={() => btnDate(index)}>
                <View style={[{ width: 45, height: '100%', marginLeft: 5, alignItems: 'center', borderRadius: 10 }, day[index].isCheck === true ? { backgroundColor: '#3B84BD' } : { backgroundColor: '#E6E9F9' }]}>
                    <TextBold children={day[index].day.charAt(0)} size={20} />
                    <TextBold children={daylist[index].getDate()} size={20} />
                    {
                        day[index].isCheck === true ? <CustomImg src={require('../../../../assets/edit.png')} height={height / 30} resizeMode='contain' width="90%" /> : null
                    }

                </View>
            </TouchableOpacity>

        )
    };


    const PracticeLevel = ({ item, index }) => {


        var date = ""
        if (selectedDate.length == 0) {
            date = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate()
        } else {
            date = `${daylist[selectedDate].getFullYear()}-${daylist[selectedDate].getMonth()+1}-${daylist[selectedDate].getDate()}`
        }

        const onPress = (data) => {
            console.log("Selected is::", date)
            navigation.navigate('Practice', { selected: data, date: date })
        }

        return (
            <TouchableOpacity onPress={() => onPress(index)}>
                <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.item, { backgroundColor: '#fff', width: '100%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                        <View style={{ flexDirection: 'column', width: '90%', marginLeft: 15 }}>
                            <TextBold children={item.heading} size={height / 40} color="black" />
                            <TextRegular children={item.title} size={height / 60} color="black" />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    //Return  View
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ marginVertical: 10 }} />
                <TextBold children="When do you want to practice?" size={22} textAlign="center" />

                <View style={{ marginVertical: 10 }} />
                <View style={{ width: '80%', justifyContent: 'center', height: 40, borderRadius: 20, borderColor: 'lightgrey', borderWidth: 2, alignSelf: 'center' }}>
                    <TextRegular children="Aim to practice 2-3 times a week." size={16} textAlign="center" />
                </View>

                <View style={{ marginVertical: 10 }} />
                <TextBold children="Select day and time" size={20} textAlign="center" />

                <View style={{ marginVertical: 10 }} />
                <View style={styles.viewDates}>
                    <List data={day} renderItem={WeekDates} direction={true} />
                </View>


                <View style={{ marginVertical: 10 }} />
                <View style={styles.viewKeepPlanning}>
                    <View style={styles.subviewKeepPlanning}>


                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ marginVertical: 10 }} />
                            <View style={{ height: 60, width: '100%', alignItems: 'center', borderRadius: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Btn height='100%' width={60} radius={30}  >
                                    <CustomImg src={require('../../../../assets/left_arrow.png')} height={30} width={30} />
                                </Btn>
                                <TextBold children={selectedDate.length == 0 ? day[new Date().getDay()].day : day[selectedDate].day} size={25} textAlign="center" />
                                <Btn height='100%' width={60} radius={30}>
                                    <CustomImg src={require('../../../../assets/right_arrow.png')} height={30} width={30} />
                                </Btn>
                            </View>

                            <View style={{ marginVertical: 10 }} />
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                {
                                    loader ? <Loader /> :
                                        <List data={response.data.planType} renderItem={PracticeLevel} />
                                }
                            </View>
                        </View>



                    </View>
                </View>

                <View style={{ marginVertical: 10 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },

    viewCheckin: {
        height: 150,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#1B45AF',
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row'
    },
    subViewCheckin1: {
        width: '70%',
        marginLeft: '5%'
    },
    subViewCheckin2: {
        height: '100%',
        width: '25%',
        justifyContent: 'center'
    },

    viewDates: {
        height: 100,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewFirstThing: {
        height: 120,
        width: '90%',
        backgroundColor: '#E6E9F1',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },

    viewKeepPlanning: {
        height: 450,
        width: '90%',
        backgroundColor: '#E6E9F1',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },
    subviewKeepPlanning: {
        height: 430,
        width: '96%',
        backgroundColor: '#EFEFF5',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },

    bottomView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    prepView: {
        width: '90%',
        height: 275,
        backgroundColor: '#1B45AF',
        borderRadius: 20,
        flexDirection: 'row'
    }

});

export default EditPlan