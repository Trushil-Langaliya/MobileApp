import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Btn, CustomImg, Loader, TextBold, TextRegular } from '../../components/CommanComponents';
import { List } from '../../components/list';
import * as Store from '../../components/auth/Store'
import Api from '../../components/auth/Api';

//Main Function
const Practice = ({ navigation,route }) => {

    const isFocused = useIsFocused();
    const [loader, setLoader] = useState(true)
 
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (isFocused) {
            setLoader(true)
            setTimeout(async () => {
                Api.planning(route.params.date)
                .then(responseJson => {
                    Store.setData(Store.planning, responseJson)
                    setResponse(responseJson)
                    setLoader(false)
                })
                .catch(error => console.warn(error));
            })
        }
    }, [isFocused]);

  

    const PracticeLevel = ({ item, index }) => {
        
        const onPress = (index) => {
            console.log("index",index)

            navigation.navigate('Course',{Index: index,selected: route.params.selected, date : route.params.date })
        }
       
        
        return (

        <TouchableOpacity onPress={() => onPress(index)}>
            <View style={{ height: 80, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.item, { backgroundColor: '#1B45AF', width: '100%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <TextBold children={item.heading} size={height / 40} color="#FFF" textAlign="center" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )};

   

    //Return  View
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ height: 80, justifyContent: 'center', width: '80%', alignSelf: 'center' }}>
                    <TextBold children="Choose your practice" size={25} />
                </View>


                <View style={styles.viewKeepPlanning}>
                    <View style={styles.subviewKeepPlanning}>
                        <CustomImg src={require('../../../../assets/plan_4.png')} height={200} width='100%' resizeMode="cover" />
                        <TextBold children="Try to vary your practice and make sure you challenge yourself, don't just pick the ones you find easy." size={20} textAlign="center" />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }} />
                <View style={{ height: 250, width: '90%', alignSelf: 'center' }}>
                {
                    loader ? <Loader /> :
                       
                    <List data={response.data.planType[route.params.selected].practiceLevel} renderItem={PracticeLevel} />
                      
                }
                    
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

export default Practice