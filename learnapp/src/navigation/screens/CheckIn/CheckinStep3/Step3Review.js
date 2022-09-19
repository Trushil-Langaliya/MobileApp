import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from '../../../components/list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';
import { Btn, CustomImg, TextBold, TextRegular, Loader } from '../../../components/CommanComponents';
import commanStyles from '../../../../styles/commanStyles';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../../../components/auth/Store'

//Main Function
const Step3Review = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [loader, setLoader] = useState(true)
    const [checkin, setCheckin] = useState(false)

    const [Grammer, setGrammer] = useState('');
    const [listening, setListening] = useState('');
    const [reading, setReading] = useState('');
    const [speaking, setSpeaking] = useState('');
    const [writing, setWriting] = useState('');


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

    //design of recent steps
    const Steps = ({ item }) => {

        console.log("This value is true::", item)

        for (i = 0; i < item.options.length; i++) {
            if (item.heading == "Speaking") {
                if (item.options[i].isChecked == true) {
                    setSpeaking(item.options[i].title)
                }
            } else if (item.heading == "Listening") {
                if (item.options[i].isChecked == true) {
                    setListening(item.options[i].title)
                }
            } else if (item.heading == "Grammar") {
                if (item.options[i].isChecked == true) {
                    setGrammer(item.options[i].title)
                }
            } else if (item.heading == "Reading") {
                if (item.options[i].isChecked == true) {
                    setReading(item.options[i].title)
                }
            } else if (item.heading == "Writing") {
                if (item.options[i].isChecked == true) {
                    setWriting(item.options[i].title)
                }
            }
        }

        return (
            <View>
                <View style={{ height: height / 8, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.item, { width: '90%', height: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            <TextBold children={item.heading} size={height / 40} />
                            <View style={{ marginVertical: 5 }} />
                            <View style={{ height: 2, backgroundColor: '#E6E9F1', width: '100%' }} />
                            <View style={{ marginVertical: 5 }} />
                            <TextRegular children={item.heading == "Speaking" ? speaking : item.heading == "Listening" ? listening : item.heading == "Grammar" ? Grammer : item.heading == "Reading" ? reading : writing} size={height / 50} />
                        </View>
                    </View>
                </View>

            </View>
        )
    };

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
                            <TextBold children="Check your next steps" size={height / 35} />
                        </View>

                       
                        <View style={{ height: height/1.6}}>
                            {
                                loader ? <Loader />
                                    :
                                    <List data={checkin.data.reflectionOnNextSteps} renderItem={Steps} />
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

export default Step3Review