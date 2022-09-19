import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from '../../../components/list';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Store from '../../../components/auth/Store'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Progress from 'react-native-progress';
import { Btn, CustomImg, Loader, TextBold, TextRegular } from '../../../components/CommanComponents';
import commanStyles from '../../../../styles/commanStyles';
import { useIsFocused } from "@react-navigation/native";

//Main Function
const Step1Review = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [checkin, setCheckin] = useState(false)
    const [loader, setLoader] = useState(true)
    const [open, setOpen] = useState(false)
    
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
    const ResultItem = ({ item, index }) => {
        return (
            <View style={{ height: height / 12, width: width-20, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }} >
                    <View style={[styles.item,  { backgroundColor: '#E6E9F1', width: '90%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 20 }]}>
                        <View style={{ flexDirection: 'column', marginLeft: height / 30 }}>
                            <TextBold children={item.heading} size={height / 40} color='black' />
                        </View>

                        <View style={{ position: 'absolute', right: 0 }}>
                            <Progress.Circle progress={`0.${item.options[index].value}`} formatText={() => { return `${item.options[index].value}%` }} unfilledColor='lightgreen' fill="white" showsText={true} animated={true} size={height / 14} textStyle={{ color: 'black' }} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };


    const Next = () => {
        navigation.navigate('Step2')
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
                            <TextBold children="Check your stats" size={height / 30} />
                        </View>

                        <View style={{ marginVertical: 10 }} />
                        <View style={{height:150, width:'100%', borderRadius:20, backgroundColor:'#1B45AF', justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:'80%'}}>
                            <TextRegular children="Your assement is super important for checking your progress and tailoring your plan." size={height / 62} color="white" textAlign="center"/>
                            <View style={{ marginVertical: 10 }} />
                            <TextRegular children="Please double check they're all spot on before you tap the save button." size={height / 62} color="white" textAlign="center"/>
                            </View>
                        </View>
                        <View style={{ marginVertical: 20 }} />
                        {
                                loader ? <Loader />
                                    :
                                    <View style={open == true ? { height: height - 120 } : { height: height / 2.3 }}>
                                        <List data={checkin.data.measureYourProgress} renderItem={ResultItem} />
                                    </View>
                            }

                       
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

export default Step1Review