import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Alert, Dimensions, Image, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import ClientScreeen from '../screens/ClientScreen';
import Invoices from '../screens/Invoices';
import ProfileScreen from '../screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalenderScreen from '../screens/CalenderScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkin from '../screens/CheckIn/Checkin';
import CheckInSteps from '../screens/CheckIn/CheckinSteps';
import Step2 from '../screens/CheckIn/CheckinStep2/Step2';
import Step2Review from '../screens/CheckIn/CheckinStep2/Step2Review';
import Step3 from '../screens/CheckIn/CheckinStep3/Step3';


//Main Function
const TabBar = ({ navigation }) => {


    const Tab = createBottomTabNavigator();
    const HomeStack = createNativeStackNavigator();

    useEffect(() => {
        setTimeout(async () => {

        })

    }, [])

    const HomeNavigator = () => {
        return (
            <SafeAreaProvider>
            <NavigationContainer independent={true}>
                <HomeStack.Navigator initialRouteName={"HomeScreen"}>
                    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                    <HomeStack.Screen name="CalenderScreen" component={CalenderScreen} options={{ headerShown: false }} />
                    <HomeStack.Screen name="Checkin" component={Checkin} options={{ headerShown: false }} />
                    <HomeStack.Screen name="CheckInSteps" component={CheckInSteps} options={{ headerShown: false }} /> 
                    <HomeStack.Screen name="Step2" component={Step2} options={{ headerShown: false }} /> 
                    <HomeStack.Screen name="Step2Review" component={Step2Review} options={{ headerShown: false }} /> 
                    <HomeStack.Screen name="Step3" component={Step3} options={{ headerShown: false }} /> 

                </HomeStack.Navigator>
            </NavigationContainer>
            </SafeAreaProvider>
        );
    };
    //Return  View
    return (


        <View style={{
            flex: 1
        }}>

            <Tab.Navigator

                screenOptions={{
                    headerShown: false, tabBarStyle: {
                        backgroundColor: 'rgba(255,255,255,0)',

                    }
                }}
                tabBarOptions={{

                }}
            >
                <Tab.Screen name="TODAY" component={HomeNavigator} 
                   
                options={{
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={styles.bottomTabIcon}
                            source={require('../../../assets/today.png')
                            } />
                    )
                }} />
                <Tab.Screen name="CALENDER" component={CalenderScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={styles.bottomTabIcon}
                            source={require('../../../assets/calender.png')

                            } />
                    )
                }} />
                <Tab.Screen name="TRAIN" component={HomeScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={styles.bottomTabIcon}
                            source={require('../../../assets/Train.png')
                            } />
                    )
                }} />
                <Tab.Screen name="PLAN" component={HomeScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={styles.bottomTabIcon}
                            source={require('../../../assets/plan.png')
                            } />
                    )
                }} />
                <Tab.Screen name="PROFILE" component={ProfileScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={styles.bottomTabIcon}
                            source={require('../../../assets/profile.png')
                            } />
                    )
                }} />
            </Tab.Navigator>

        </View>

    );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        marginVertical: 5,
    },
    bottomBar: {},
    btnCircle: {
        width: height / 15,
        height: height / 15,
        borderRadius: height / 7.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
        bottom: 50,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    img: {
        width: 30,
        height: 30,
    },

    bottomTabIcon: {
        height: 35,
        width: 35,
        tintColor: 'black',
        resizeMode: 'cover'
    }
});

export default TabBar
