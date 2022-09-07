import React, { useEffect } from 'react'
import { View, Image, ImageBackground} from 'react-native'
import commanStyles from '../../styles/commanStyles'
import { CustomImg, GeneralView, TextBold } from '../components/CommanComponents'
const splashLogo = require("../../../assets/Splashbg.png")
import * as Store from '../components/auth/Store'

const SplashScreen = (props) => {

    useEffect(() => {
        setTimeout(async () => {
            var userStoredToken = await Store.getData(Store.userToken)
            console.log("*************",userStoredToken)

            if(userStoredToken === ""){
                props.naviation.navigate('LandingScreen')
            }else if(userStoredToken == null){
                props.navigation.navigate('LandingScreen')
            }else{
                props.navigation.navigate('TabBar')
            }
            
        }, 3000);
    }, [])

    return (
        <View style={[commanStyles.mainView]}>
            <ImageBackground source={splashLogo} style={[commanStyles.mainView,commanStyles.centerView,{resizeMode: 'cover'}]}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <CustomImg src={require('../../../assets/L&co_logo_white.png')} width='50%' height='50%'/>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SplashScreen