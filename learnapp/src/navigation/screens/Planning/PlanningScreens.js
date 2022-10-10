import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar, LogBox } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Btn, CustomImg, Loader, TextBold, TextRegular } from '../../components/CommanComponents';
import { List } from '../../components/list';
import Api from '../../components/auth/Api';


//Main Function
const PlanningScreen = ({ navigation }) => {


    const isFocused = useIsFocused();
    const [loader, setLoader] = useState(true)                              //Loader
    const [selected, setSelected] = useState('');

    var jsonArray = [];

    let today = new Date();                                                 //Today's Date

    //View will appear
    useEffect(() => {
        if (isFocused) {
            setTimeout(async () => {
                setLoader(true)
                let today = new Date(); 
                //By default selected date
                if (selectedDate.length == 0) {
                    //API CALL : By default selected date
                    GetPlanning(today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate())
                }

            },4000)
        }
    }, [isFocused]);


    //API CALL
    const GetPlanning = (date) => {

        setLoader(true)

        Api.planning(date)
            .then(responseJson => {
                console.log("rr",responseJson)
                setSelected('')

                //Check added practice section
                for (var k = 0; k < responseJson.data.planType.length; k++) {
                    if (responseJson.data.planType[k].isChecked == true) {
                        for (var i = 0; i < responseJson.data.planType[k].practiceLevel.length; i++) {
                            for (var j = 0; j < responseJson.data.planType[k].practiceLevel[i].options.length; j++) {
                                if (responseJson.data.planType[k].practiceLevel[i].options[j].isChecked == true) {
                                    var jsonObject = { time: responseJson.data.planType[k].heading, standard: responseJson.data.planType[k].practiceLevel[i].heading, practice: responseJson.data.planType[k].practiceLevel[i].options[j].title, level: responseJson.data.planType[k].practiceLevel[i].options[j].level, practietitle: responseJson.data.planType[k].practiceLevel[i].options[j].heading };
                                    jsonArray.push(jsonObject);
                                }
                            }
                        }
                    }
                }

                setSelected(jsonArray)
                setLoader(false)
            })
            .catch(error => console.warn(error));

    }



    const [selectedDate, setSelectedDate] = useState('')
    const [day, setDay] = useState([{ day: 'S', isCheck: false }, { day: 'M', isCheck: false }, { day: 'T', isCheck: false }, { day: 'W', isCheck: false }, { day: 'T', isCheck: false }, { day: 'F', isCheck: false }, { day: 'S', isCheck: false }]);
    var first = today.getDate() - today.getDay();
    var last = first + 6;
    var myDate = new Date(today.setDate(first));
    var myDate2 = new Date(today.setDate(last));

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

    //design of weeks
    const WeekDates = ({ index }) => {

        //on date change 
        const btnDate = (index) => {
            let newArr = [...day];
            for (i = 0; i < newArr.length; i++) {
                newArr[i].isCheck = false
            }
            newArr[index].isCheck = !newArr[index].isCheck

            GetPlanning(`${daylist[index].getFullYear()}-${daylist[index].getMonth() + 1}-${daylist[index].getDate()}`)
            setSelectedDate(index)
            setDay(newArr)
        }

        //design of week
        return (
            <TouchableOpacity onPress={() => btnDate(index)}>
                <View style={[styles.txtWeek, day[index].isCheck === true ? { backgroundColor: '#3B84BD' } : { backgroundColor: '#E6E9F9' }]}>
                    <TextBold children={day[index].day} size={20} />
                    <TextBold children={daylist[index].getDate()} size={20} />
                    {
                        day[index].isCheck === true ? <CustomImg src={require('../../../../assets/edit.png')} height={height / 30} resizeMode='contain' width="90%" /> : null
                    }
                </View>
            </TouchableOpacity>

        )
    };


    //added practice section
    const SelectedPreactice = ({ item, index }) => {
        return (
            <View style={{ width: '100%' }}>
                <View style={styles.viewFirstThing}>
                    <View style={{ margin: 20 }}>
                        <TextBold children={item.time} color="black" size={18} />
                        <View style={{ marginVertical: 2 }} />
                        <TextBold children={item.standard + " | " + item.practietitle + " | " + item.practice + " | " + item.level} size={16} color="grey" />
                    </View>
                </View>
            </View>
        )
    };


    const checkin = () => {
        navigation.navigate('Checkin')
    }
    const edit = () => {
        navigation.navigate('EditPlan')
    }

    //Return  View
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
                <View>
                    <View style={{ marginVertical: 10 }} />

                    <View style={styles.viewCheckin}>
                        <View style={styles.subViewCheckin1}>
                            <TextBold children="You're on Beginner Course A1 / A2" color="white" size={height / 40} />
                            <View style={{ marginVertical: 5 }} />
                            <Btn children="Check-in available" color="#fff" width='90%' txtSize={height / 55} height={40} radius={10} txtClr="black" onPress={checkin} />
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
                    {
                        loader ?
                            <View style={{ height: 100 }}>
                                <Loader />
                            </View>

                            :
                            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ width: "100%" }}>
                                <View style={{ width: '90%', alignContent: 'center' }}>
                                    <List data={selected} renderItem={SelectedPreactice} />
                                </View>

                            </ScrollView>
                    }

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
                                    <Btn children="Edit" color='#102A3D' width={150} height={50} txtClr="#fff" radius={10} onPress={edit} />
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
                </View>
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
        marginTop: 15,
        width: '100%',
        backgroundColor: '#E6E9F1',
        alignSelf: 'center',

        borderRadius: 20,
        justifyContent: 'center'
    },

    viewKeepPlanning: {
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
    },

    txtWeek:{
        width: 45, 
        height: '100%', 
        marginLeft: 5, 
        alignItems: 'center',
        borderRadius: 10 
    }

});

export default PlanningScreen