import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from '../../components/list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Btn, CustomImg, TextBold, TextRegular } from '../../components/CommanComponents';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';

//Main Function
const CheckInSteps = ({ navigation }) => {


    const checkInSteps = [
        {
            id: '1',
            title: 'Speaking A1/A2',
        },
        {
            id: '2',
            title: 'Listening A1/A2',
        },
        {
            id: '3',
            title: 'Grammer A1/A2',
        },
        {
            id: '4',
            title: 'Reading A1/A2',
        },
        {
            id: '5',
            title: 'Writing A1/A2',
        },
    ];

    var checkInresults = [
        {
            id: '1',
            title: 'No Progress',
            percentage: 0,
            click: false,
        },
        {
            id: '2',
            title: 'On your way',
            percentage: 20,
            click: false,
        },
        {
            id: '3',
            title: 'Halfway there',
            percentage: 80,
            click: false,
        },
        {
            id: '4',
            title: 'Almost there',
            percentage: 40,
            click: false,
        },
        {
            id: '5',
            title: 'All of the above',
            percentage: 60,
            click: false,
        },
    ];

    const [open, setOpen] = useState(false)
    const [openNumber, setOpenNumber] = useState('')
   
    const OpenDropdown = (id) => {
        console.log("id is:;",id)
        setOpen(!open)
        setOpenNumber(id)
    }
    //design of recent steps
    const Steps = ({ item}) => (
        <View>
        <View style={{ height: height / 12, width: width, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ height: "100%", width:"100%",justifyContent: 'center', alignItems: 'center' }} onPress={() => OpenDropdown(item.id)}>
            <View style={[styles.item, { width: '90%', height: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                <View style={{ flexDirection: 'column', width: '100%' }}>
                    <TextBold children={item.title} size={height / 35} />
                    <View style={{ marginVertical: 5 }} />
                    <View style={{ height: 2, backgroundColor: '#E6E9F1', width: '100%' }} />
                </View>
            </View>
            <View style={{ width: 30, height: 30, position: 'absolute', right: 30 }}>
                <Btn height='100%' width='100%' radius={30} onPress={()=>OpenDropdown(item.id)}>
                    <CustomImg src={require('../../../../assets/right_arrow.png')} height={25} width={25}/>
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
        
        console.log("index is::",index)
        // for(i=0; i<checkInresults.length; i++){
        //     if(checkInresults[index].click==false){
        //         console.log("id is::",checkInresults[index].id)
        //         console.log("click is::",checkInresults[index].click)
        //         checkInresults[index].click = true;
        //      break;
        //     }  
        // }
        // console.log("clicks is::",checkInresults[index].click)
        // setOpen(open)
    }

    const btnSave = () => {
        navigation.navigate('Step2')
    }

    //design of recent steps
    const [pressed, setPressed] = useState(false);
    const ResultItem = ({ item , index}) => {
      

        const onPress = () => {
            setPressed(prevPressed => !prevPressed);
        }
        return(
        <View style={{ height: height / 12, width: width, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ height: "100%", width:"100%",justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
            <View style={[styles.item,pressed==true ? { backgroundColor: '#1B45AF'} : {backgroundColor: '#E6E9F1'}, {  width: '90%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 20 }]}>
                <View style={{ flexDirection: 'column', marginLeft: height / 30 }}>
                    <TextBold children={item.title} size={height / 40} color={pressed==true ? 'white' : 'black'} />
                </View>
               
                <View style={{ position: 'absolute', right: 0}}>
                    <Progress.Circle progress={`0.${item.percentage}`} formatText={() => { return `${item.percentage}%`}} unfilledColor='lightgreen' fill="white" showsText={true} animated={true} size={height/14} textStyle={{color:'black'}}/>
                </View>
            </View>
            </TouchableOpacity>
        </View>
        )};
  
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
                                    <TextBold children="We use this to help us tailor your plan so that you can continue enjoying your lessons and reach your goals!" size={height / 50} color="#fff" textAlign="center" />
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }} />

                            <View style={ open==true ? { height: height-120 } : {height: height / 2.3 }}>
                                <List data={checkInSteps} renderItem={Steps} />
                            </View>

                           
                            <Btn children="Save" width="90%" height={height/15} color="#1B45AF" txtClr="white" radius={20} txtSize={height/35} onPress={btnSave}/>
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