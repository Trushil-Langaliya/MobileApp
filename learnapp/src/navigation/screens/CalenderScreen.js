import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List } from '../components/list';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../components/auth/Store'
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { CustomImg, Notification, TextBold, TextRegular } from '../components/CommanComponents';
import Entypo from 'react-native-vector-icons/Entypo'


//Main Function
const CalenderScreen = ({ navigation }) => {


    const [selectDate, setSelectDate] = useState('');
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const DATA1 = [
        {
            id: '1',
            title: 'Mobile Application Developer',
            name: 'Trushil Langaliya',
            date: 'Submitted: 01/01/2021'
        },
        {
            id: '2',
            title: 'Mobile Application Developer',
            name: 'Trushil Langaliya',
            date: 'Submitted: 01/01/2021'
        },
        {
            id: '3',
            title: 'Mobile Application Developer',
            name: 'Trushil Langaliya',
            date: 'Submitted: 01/01/2021'
        },
        {
            id: '4',
            title: 'Mobile Application Developer',
            name: 'Trushil Langaliya',
            date: 'Submitted: 01/01/2021'
        },
    ];

    LocaleConfig.locales['en'] = {

        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
        today: "Today"

    };
    LocaleConfig.defaultLocale = 'en';

    const Item1 = ({ title }) => (
        <View style={[styles.item, { width: '100%', height: 70, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'black' }]}>
            <View style={{ marginRight: 15 }}>
                <CustomImg src={{ uri: `${mydata.userImage}` }} height={height / 26} width={height / 26} radius={height / 13} />
            </View>

            <TextBold children={title} color='white' size={height/50}/>
        
        </View>
    );
    const Plans = ({ item }) => (
        <Item1 title={item.title} name={item.name} date={item.date} />
    );

    //View will appear 
    const isFocused = useIsFocused();
    const [mydata, setmydata] = useState('');       //set saved userdata

    useEffect(() => {
        if (isFocused) {
            setTimeout(async () => {
           
            })

        }
    }, [isFocused]);

    //Return  View
    return (
        <SafeAreaView style={styles.SafeAreaProvider}>
            <ScrollView style={styles.ScrollView}>
                <View style={{width:'90%', alignSelf:'center'}}> 
                <Calendar
                    theme={{
                        textSectionTitleColor: 'black',
                        textSectionTitleDisabledColor: 'black',
                        selectedDayBackgroundColor: 'black',
                        selectedDayTextColor: 'black',
                        dayTextColor: 'black',
                        textDayFontWeight: 'bold',
                        todayBackgroundColor: "#f2e6ff",
                        textMonthFontWeight: 'bold',
                        arrowColor: 'black',
                        selectedDayTextColor: "#FFFFFF",
                        textDayHeaderFontWeight: "bold",
                        'stylesheet.calendar.header': {
                            week: {
                                marginTop: 15,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            },
                        }
                    }}
                    onDayPress={day => {
                        console.log("Selected date is ::", day)
                        setSelectDate(day)

                    }}

                    markingType={'multi-dot'}
                    horizontal={true}
                    hideArrows={false}
                    pagingEnabled={true}
                    calendarWidth={width}
                    hideExtraDays={false}

                    markedDates={{
                        [selectDate.dateString]: { selected: true, selectedColor: '#4C7898' },
                        '2022-07-17': { marked: true },
                        '2022-07-25': { dots: [vacation, massage] },
                        '2022-07-22': { dots: [vacation, massage] },
                        '2022-08-15': { dots: [vacation, massage] },
                        '2022-07-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                    }}

                    renderArrow={(direction) => {
                        if(direction === "left"){
                            return(
                               <View style={{height:50}}>
                                   </View>
                            )
                        }else{
                            return(
                                <TouchableOpacity>

                                </TouchableOpacity>
                            )
                        } 
                    }}
                />
                {/* <View style={{ marginVertical: 10 }} />
                {
                    selectDate != '' ? 
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextBold size={height / 40}>
                                {selectDate.dateString}
                            </TextBold>
                        </View>
                        <View style={{ width: '100%', height: height / 5 }}>
                            <ScrollView nestedScrollEnabled={true} >
                                <View style={{ alignItems: 'flex-start', }}>
                                    <List data={DATA1} renderItem={Plans} />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                        : null
               */}
               </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    SafeAreaProvider: {
        flex: 1,
    },
    ScrollView: {
        flex: 1,
    },
    userInfo: {
        height: height / 8,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',

    },
    userProfileView: {
        height: height / 16,
        width: height / 16,
        borderRadius: height / 8,
        justifyContent: 'center',
        alignItems: 'center',

    },
    userIcon: {
        height: '100%',
        width: '100%',
    },
    btnSettings: {
        width: 20,
        height: 20,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtTitle: {
        fontSize: height / 45,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000000',
    },


    item: {
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        //android specific
        elevation: 5,
        //ios specific
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    title: {
        color: '#ffffff',
        width: '90%',
        fontSize: height / 50,
        fontFamily: 'Poppins-SemiBold',


        textAlignVertical: 'center',
    },
    subTitle: {
        color: '#ffffff',
        fontSize: height / 80,
        width: '95%',
        fontFamily: 'Poppins-regular',
        textAlign: 'center',
        textAlignVertical: 'center',

    },
    userIconView: {

        height: height / 15,
        width: height / 15,
        borderRadius: height / 7.5,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userIcon: {
        height: 30,
        width: 30,
    },
});

export default CalenderScreen