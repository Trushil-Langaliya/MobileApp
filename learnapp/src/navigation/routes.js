import React, { useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotScreen from './screens/ForgotScreen';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import SignupRoles from './screens/SignupRoles';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import TabBar from './components/TabBar';
import ClientScreeen from './screens/ClientScreen';
import Invoices from './screens/Invoices';
import ProfileScreen from './screens/ProfileScreen';
import { BackHandlerevent } from "./components/Backhandler";
import CalendarScreen from "./screens/CalenderScreen";
import PlansObjectivesScreen from "./screens/PlansObjectsScreen";
import LandingScreen from "./screens/landingScreen";
import SignupScreen from "./screens/SignupScreen";
import CMSScreen from "./screens/CMSScreen";
import VerifyEmail from "./screens/VerifyEmail";
import SignupForm from "./screens/SignupForm";
import CheckInSteps from "./screens/CheckIn/CheckinSteps";
import Checkin from "./screens/CheckIn/Checkin";


const Stack = createNativeStackNavigator();

const routes = () => {
     
    BackHandlerevent()
    
    const MyTheme = {
        colors: {
          background:'#ffffff'
        },
      };
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: 'SplashScreen',headerShown: false }}></Stack.Screen>
                <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ title: 'LandingScreen',headerShown: false }}></Stack.Screen>
                <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'SignupScreen',headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Signin" component={Signin} options={{ title: 'Signin',headerShown: false, gestureEnabled: false }}></Stack.Screen>
                <Stack.Screen name="CMSScreen" component={CMSScreen} options={{ title: 'CMSScreen',headerShown: false, gestureEnabled: false }}></Stack.Screen>
                <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{ title: 'VerifyEmail',headerShown: false, gestureEnabled: false }}></Stack.Screen>
                <Stack.Screen name="SignupForm" component={SignupForm} options={{ title: 'SignupForm',headerShown: false, gestureEnabled: false }}></Stack.Screen>
                <Stack.Screen name="TabBar" component={TabBar} options={{ title: 'TabBar',headerShown: false, gestureEnabled: false  }}></Stack.Screen>  
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'HomeScreen',headerShown: false, gestureEnabled: false }}></Stack.Screen>
                <Stack.Screen name="ClientScreeen" component={ClientScreeen} options={{ title: 'ClientScreeen',headerShown: false, gestureEnabled: false }}></Stack.Screen>
                <Stack.Screen name="plansObjectivesScreen" component={PlansObjectivesScreen} options={{ title: 'plansObjectivesScreen'}}></Stack.Screen>
                <Stack.Screen name="Invoices" component={Invoices} options={{ title: 'Invoices',headerShown: false, gestureEnabled: false }}></Stack.Screen>
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile', headerShown: false,}}></Stack.Screen>
                <Stack.Screen name="Checkin" component={Checkin} options={{ title: 'Checkin',headerShown: false  }}></Stack.Screen>  
                <Stack.Screen name="CheckInSteps" component={CheckInSteps} options={{ title: 'CheckInSteps',headerShown: false  }}></Stack.Screen>  
                <Stack.Screen name="CalenderScreen" component={CalendarScreen} options={{animation: 'none', title: 'CalenderScreen',headerShown: false  }}></Stack.Screen>  
                <Stack.Screen name="ForgotScreen" component={ForgotScreen} options={{ title: 'ForgotScreen',headerShown: false, gestureEnabled: false  }}></Stack.Screen>
                <Stack.Screen name="SignupRoles" component={SignupRoles} options={{ title: 'Signup Roles',headerShown: false}}/>
                <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup',headerShown: false }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default routes;