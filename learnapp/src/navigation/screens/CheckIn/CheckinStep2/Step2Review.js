import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from '../../../components/list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';
import { Btn, CustomImg, Loader, TextBold, TextRegular } from '../../../components/CommanComponents';
import commanStyles from '../../../../styles/commanStyles';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../../../components/auth/Store'


//Main Function
const Step2Review = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [loader, setLoader] = useState(true)
    const [checkin, setCheckin] = useState(false)

    const [teacher, setTeacher] = useState([]);
    const [lessons, setLessons] = useState(['']);
    const [progress, setProgress] = useState(['']);

    //design of recent steps
    const Steps = ({ item }) => {
        
        console.log("This value is true::", item.options.length)
       
        for (i = 0; i < item.options.length; i++) {
            if (item.heading == "Teacher"){
                if (item.options[i].isChecked == true){
                  
                    console.log(teacher.includes(item.options[i].title));
                    if (teacher.includes(item.options[i].title) == false) {
                        teacher.push(`${item.options[i].title}`)
                    }
                   
                }
            }else if (item.heading == "Lessons"){
                if (item.options[i].isChecked == true){
                    if (lessons.includes(item.options[i].title) == false) {
                        lessons.push(`${item.options[i].title}`)
                    }
                   
                }
            }else if (item.heading == "Progress"){
                if (item.options[i].isChecked == true){
                    if (progress.includes(item.options[i].title) == false) {
                        progress.push(`${item.options[i].title}`)
                    }
                }
            }
        }

        return(
        <View>
            <View style={{ height: 130, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.item, { width: '90%', height: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <TextBold children={item.heading} size={height / 35} />
                        <View style={{ marginVertical: 2 }} />
                        <View style={{ height: 2, backgroundColor: '#E6E9F1', width: '100%' }} />
                        <View style={{ marginVertical: 5 }} />
                        <TextRegular children={item.heading == "Teacher" ? teacher : item.heading == "Lessons" ? lessons : progress} size={height / 45} />
                        <View style={{ marginVertical: 5 }} />
                    </View>
                </View>
            </View>

        </View>
    )};


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


    const Next = () => {
        navigation.navigate('Step3')
    }
    //Return  View
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={[commanStyles.mainView, { backgroundColor: 'white' }]}>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: '95%', alignSelf: 'center' }}>
                        <View style={{ marginVertical: 10 }} />
                        {/* Check In title */}
                        <View style={styles.viewCheckin}>
                            <TextBold children="Check your mood" size={height / 35} />
                        </View>

                        <View style={{ marginVertical: 5 }} />
                        <View style={{ height: height / 2 }}>
                        {
                                loader ? <Loader />
                                    :
                            <List data={checkin.data.tellUsHowYouFeel} renderItem={Steps} />
                        }
                        </View>

                        <View style={{ marginVertical: 10, height: height / 2.7, width: '100%' }}>
                            <CustomImg src={require('../../../../../assets/endImage.png')} height="100%" width="100%" radius={10} resizeMode="cover" />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }} />
                    <View style={{ position: 'absolute', right: 25, bottom: 10, height: 60, width: 60, borderRadius: 30, }}>
                        <Btn height='100%' width='100%' radius={30} color='#1B45AF' onPress={Next} >
                            <FontAwesomeIcon icon={faAngleRight} size={25} color="#fff" />
                        </Btn>
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

});

export default Step2Review