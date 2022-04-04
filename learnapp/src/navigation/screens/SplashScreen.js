import React, { useEffect } from 'react'
import { View, Image} from 'react-native'
const splashLogo = require("../../../assets/splash.png")

const SplashScreen = (props) => {

    useEffect(() => {
        setTimeout(async () => {
            props.navigation.navigate('Signin')
        }, 3000);
    }, [])

    return (
        <View>
            <Image source={splashLogo} style={{ width: '100%', height: '100%', resizeMode: 'cover'}}/>
        </View>
    )
}

export default SplashScreen