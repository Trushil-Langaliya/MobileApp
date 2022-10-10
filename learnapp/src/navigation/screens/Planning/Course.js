import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Btn, CustomImg, Loader, TextBold, TextRegular } from '../../components/CommanComponents';
import { List } from '../../components/list';
import * as Store from '../../components/auth/Store'
import Api from '../../components/auth/Api';

//Main Function
const Course = ({ navigation, route }) => {

    const isFocused = useIsFocused();
    const [level, setLevel] = useState('');
    const [loader, setLoader] = useState(true)
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (isFocused) {
            setTimeout(async () => {
                if (route.params.Index == 0) {
                    setLevel('Beginner Course')
                } else if (route.params.Index == 1) {
                    setLevel('Intermediate Course')
                } else {
                    setLevel('Advaced Course')
                }

                Api.planning(route.params.date)
                    .then(responseJson => {
                        setLoader(true)
                        setResponse(responseJson.data)
                        setLoader(false)
                    })
                    .catch(error => console.warn(error))
            })
        }
    }, [isFocused]);




    const PracticeSteps = [
        {
            image: require("../../../../assets/Practice1.png"),
            isSelected: false
        },
        {
            image: require("../../../../assets/Practice2.png"),
            isSelected: false
        },
        {
            image: require("../../../../assets/Practice3.png"),
            isSelected: false
        },
        {
            image: require("../../../../assets/Practice4.png"),
            isSelected: false
        },
        {
            image: require("../../../../assets/Practice5.png"),
            isSelected: false
        },
    ];
    const [practicingLevel, setpracticeLevel] = useState([]);
    const PracticeLevel = ({ item, index }) => {

        const BtnPress = (index) => {
            for (i = 0; i < response.planType[route.params.selected].practiceLevel[route.params.Index].options.length; i++) {
                if (index == i) {
                    response.planType[route.params.selected].practiceLevel[route.params.Index].options[index].isChecked = !response.planType[route.params.selected].practiceLevel[route.params.Index].options[index].isChecked
                    setpracticeLevel([response])
                }
            }
        }
        return (
            <View style={{ height: 350, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <View style={[{ backgroundColor: '#1B45AF', width: '100%', height: '95%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                    <View style={{ flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center' }}>
                        <CustomImg src={PracticeSteps[index].image} height={100} resizeMode="contain" tintClr="#fff" />
                        <View style={{ marginVertical: 10 }} />
                        <TextBold children={item.heading} size={height / 35} color="#FFF" textAlign="center" />
                        <View style={{ marginVertical: 5 }} />
                        <TextRegular children={item.title} size={height / 45} color="#FFF" textAlign="center" />
                        <View style={{ marginVertical: 2 }} />
                        <TextRegular children={item.level} size={height / 45} color="#FFF" textAlign="center" />
                        <View style={{ marginVertical: 10 }} />
                        <View style={{ alignSelf: 'center', width: "80%" }}>
                            <Btn children={item.isChecked == true ? "Added ✅" : "Add"} width="100%" height={50} color={item.isChecked == true ? "lightgreen" : "#fff"} radius={20} txtSize={20} onPress={() => BtnPress(index)} />
                        </View>
                    </View>
                </View>
            </View>

        )
    };

    const btnSave = () => {
        setLoader(true)

        for (i = 0; i < response.planType[route.params.selected].practiceLevel[route.params.Index].options.length; i++) {
            if (response.planType[route.params.selected].practiceLevel[route.params.Index].options[i].isChecked == true) {
                response.planType[route.params.selected].isChecked = true
                setpracticeLevel([response])
            }
        }

        let data = {
                "date": `${route.params.date}`,
                "planType": response.planType
        }
        Api.postPlanning(data)
        .then(responseJson => {
            setLoader(true)
                UpdatePlan(responseJson)
            setLoader(false)
        })
        .catch(error => console.warn(error))
        
    }
    const UpdatePlan = (json) => {
        Store.setData(Store.planning, json)
        navigation.navigate('PlanningScreen')
        setLoader(false)
    }
    //Return  View
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ marginVertical: 5 }} />
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <TextBold children={level} size={30} />
                </View>
                <View style={{ marginVertical: 5 }} />
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    {
                        loader ? <Loader /> :
                            <List data={response.planType[route.params.selected].practiceLevel[route.params.Index].options} renderItem={PracticeLevel} />
                    }
                </View>

                <View style={{ marginVertical: 5 }} />
                <View style={{ height: 60, width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
                    <Btn children="Save" height="100%" width="100%" color="#1B45AF" txtClr="#fff" txtSize={25} radius={20} onPress={btnSave} />
                </View>

                <View style={{ marginVertical: 30, height: height / 3, width: '100%' }}>
                    <TouchableOpacity style={{ height: '100%', width: '90%', alignSelf: 'center', backgroundColor: 'lightgrey', borderRadius: 20 }}>
                        <CustomImg src={require('../../../../assets/endImage.png')} height="100%" width="100%" radius={10} resizeMode="cover" />
                    </TouchableOpacity>
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
    viewKeepPlanning: {
        height: 350,
        width: '90%',
        backgroundColor: '#E6E9F1',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },
    subviewKeepPlanning: {
        height: 330,
        width: '96%',
        backgroundColor: '#EFEFF5',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },

});

export default Course