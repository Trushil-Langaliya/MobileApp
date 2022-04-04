import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotScreen from './screens/ForgotScreen';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import SignupRoles from './screens/SignupRoles';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

const routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: 'SplashScreen',headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Signin" component={Signin} options={{ title: 'Signin',headerShown: false }}></Stack.Screen>
                <Stack.Screen name="ForgotScreen" component={ForgotScreen} options={{ title: 'ForgotScreen',headerShown: false }}></Stack.Screen>
                <Stack.Screen name="SignupRoles" component={SignupRoles} options={{ title: 'Signup Roles',headerShown: false }}/>
                <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup',headerShown: false }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default routes;