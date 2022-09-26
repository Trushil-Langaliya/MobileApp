import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Btn, CustomImg, TextBold, TextRegular } from '../../components/CommanComponents';
import { List } from '../../components/list';




//Main Function
const PlanningScreen = ({ navigation }) => {

    const [selectedDate, setSelectedDate] = useState('')
    const [day, setDay] = useState([{ day: 'S', isCheck: false }, { day: 'M', isCheck: false }, { day: 'T', isCheck: false }, { day: 'W', isCheck: false }, { day: 'T', isCheck: false }, { day: 'F', isCheck: false }, { day: 'S', isCheck: false }]);
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
            setSelectedDate(index)
            setDay(newArr)

        }
        return (
            <TouchableOpacity onPress={() => btnDate(index)}>
                <View style={[{ width: 45, height: '100%', marginLeft: 5, alignItems: 'center', borderRadius: 10 }, day[index].isCheck === true ? { backgroundColor: '#3B84BD' } : { backgroundColor: '#E6E9F9' }]}>
                    <TextBold children={day[index].day} size={20} />
                    <TextBold children={daylist[index].getDate()} size={20} />
                    {
                        day[index].isCheck === true ? <CustomImg src={require('../../../../assets/edit.png')} height={height / 30} resizeMode='contain' width="90%" /> : null
                    }

                </View>
            </TouchableOpacity>

        )
    };



    const checkin = () => {
        navigation.navigate('Checkin')
    }

    //Return  View
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ marginVertical: 10 }} />
                <View style={styles.viewCheckin}>
                    <View style={styles.subViewCheckin1}>
                        <TextBold children="You're on Beginner Course A1 / A2" color="white" size={height / 40} />
                        <View style={{ marginVertical: 5 }} />
                        <Btn children="Check-in available" color="#fff" width='90%' txtSize={height / 55} height={40} radius={10} txtClr="black" onPress={checkin}/>
                    </View>
                    <View style={styles.subViewCheckin2}>
                        <CustomImg src={require('../../../../assets/edit.png')} height='70%' resizeMode='contain' width="90%" />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }} />
                <View style={styles.viewDates}>
                    <List data={day} renderItem={WeekDates} direction={true} />
                </View>

                <View style={{ marginVertical: 10 }} />
                <View style={styles.viewFirstThing}>
                    <View style={{ marginLeft: 20 }}>
                        <TextBold children="FIRST THING" color="grey" size={16} />
                        <TextBold children="Practice 3 | Advanced C1/C2 | Reading" size={20} color="black" />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }} />
                <View style={styles.viewKeepPlanning}>
                    <View style={styles.subviewKeepPlanning}>
                        <View style={{ height: 200, width: '100%' }}>
                            <View style={{ marginVertical: 5 }} />
                            <CustomImg src={require('../../../../assets/plan_1.png')} height='100%' width='100%' resizeMode="contain" />
                        </View>
                        <View style={{ height: 180, width: '100%', alignItems: 'center' }}>
                            <View style={{ marginVertical: 5 }} />
                            <TextBold children="Keep Planning" size={30} />
                            <View style={{ marginVertical: 5 }} />
                            <TextRegular children="Add your practice for the week" size={18} />
                            <View style={{ marginVertical: 10 }} />
                            <View style={{ height: 70, width: '75%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>
                                <CustomImg src={require('../../../../assets/plan_2.png')} height={60} width={60} />
                                <Btn children="Edit" color='#102A3D' width={150} height={50} txtClr="#fff" radius={10} />
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{ marginVertical: 10 }} />
                <View style={styles.bottomView}>
                    <TextBold children="Your Guide to Planning" size={25} />
                    <View style={{ marginVertical: 5 }} />
                    <View style={{ width: '75%' }}>
                        <TextRegular children="It can all feel a bit overwhelming. There's no right or wrong. just find out what works for you." textAlign="center" />
                    </View>
                    <View style={{ marginVertical: 10 }} />
                    <View style={styles.prepView}>
                        <View style={{ width: '50%', height: "100%", justifyContent: 'center' }}>
                            <View style={{ width: '80%', height: "100%", justifyContent: 'center', alignSelf: 'center' }}>
                                <TextBold children="How to prep like a boss" size={40} color="#fff" />
                            </View>
                        </View>
                        <View style={{ width: '50%', height: "100%" }}>
                            <CustomImg src={require('../../../../assets/plan_3.png')} height="100%" resizeMode="cover" width="100%" />
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

export default PlanningScreen