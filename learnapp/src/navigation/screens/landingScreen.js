//packages
import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, ImageBackground,Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import commanStyles from '../../styles/commanStyles';
import { Btn, CustomImg, TextBold, TextRegular } from '../components/CommanComponents';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

//Main Function
const LandingScreen = ({ navigation }) => {

    //Variables
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const [nextRef, setNextRef] = useState('');
   

    //Slider in Landing Screens
    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
        }
    };

    //Btn Next
    const { currentPage: pageIndex } = sliderState;
    const Next = () => {
        var { currentPage } = sliderState;
        currentPage = currentPage + 1
        nextRef.scrollTo({ x: currentPage * width, y: 0, animated: true })
    }

    //Btn Skip
    const Skip = () => {
        navigation.navigate('SignupScreen')
    }

    //Btn Signup
    const btnSignup = () => {
        navigation.navigate('SignupScreen')
    }

    //Btn SignIn
    const btnSignin = () => {
        navigation.navigate('Signin')
    }
   

    //Pagination dots
    const Pagination = () => {
        return (
            <View>
                <View style={styles.paginationWrapper}>
                    {Array.from(Array(4).keys()).map((key, index) => (
                        <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                    ))}
                </View>

                <View style={{ position: 'absolute', left: 20, bottom: Platform.OS === 'ios' ? 100 : 35 }}>
                    <Btn children='SKIP' height={height / 30} width={width / 5} txtSize={height / 60} txtClr='#fff' onPress={Skip} />
                </View>

                <View style={{ position: 'absolute', right: 25, bottom: Platform.OS === 'ios' ? 100 : 35, height: 60, width: 60, borderRadius: 30, }}>
                    <Btn height='100%' width='100%' radius={30} color='#fff' onPress={Next}>
                        <FontAwesomeIcon icon={faAngleRight} size={25} />
                    </Btn>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                ref={(node) => setNextRef(node)}
                onScroll={(event: any) => {
                    setSliderPage(event);
                }}
            >
                {/* 1st Screen */}
                <View style={{ width, height }}>
                    <View style={styles.topView}>
                        <ImageBackground
                            source={require('../../../assets/L1.jpeg')}
                            style={commanStyles.mainView}
                        />
                    </View>
                    <View style={styles.bottomView}>
                        <ImageBackground
                            source={require('../../../assets/bgLanding.png')}
                            style={[commanStyles.mainView, { alignItems: 'center' }]}
                        >
                            <View style={{ marginVertical: height / 25 }} />
                            <CustomImg src={require('../../../assets/L&co_logo_white.png')} height={300} width='100%' resizeMode='contain' />
                        </ImageBackground>
                        <Pagination />
                    </View>
                </View>

                {/* 2nd Screen */}
                <View style={{ width, height }}>
                    <View style={styles.topView}>
                        <ImageBackground
                            source={require('../../../assets/L2.png')}
                            style={commanStyles.mainView}
                        />
                    </View>
                    <View style={styles.bottomView}>
                        <ImageBackground
                            source={require('../../../assets/bgLanding.png')}
                            style={[commanStyles.mainView, commanStyles.centerView]}
                        >
                            <View style={{ width: '80%', height: '50%', alignSelf: 'center' }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <TextBold children='LANGUAGE COURSES FOR ANY LEVEL' color='#fff' size={height / 35} />
                                    <View style={{ marginVertical: 2 }} />
                                    <View style={{ alignContent: 'flex-start', width: '100%' }}>
                                        <TextRegular children="Age. Knowlege. Ability. It doesn't matter. Learn&Co is here for everybody" color='#F8F0E3' size={height / 35} />
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                        <Pagination />
                    </View>
                </View>

                {/* 3rd Screen */}
                <View style={{ width, height }}>
                    <View style={styles.topView}>
                        <ImageBackground
                            source={require('../../../assets/L4.png')}
                            style={commanStyles.mainView}
                        />
                    </View>
                    <View style={styles.bottomView}>
                        <ImageBackground
                            source={require('../../../assets/bgLanding.png')}
                            style={[commanStyles.mainView, commanStyles.centerView]}
                        >
                            <View style={{ width: '80%', height: '50%', alignSelf: 'center' }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <TextBold children='LESSONS TO LOOK FORWORD TO' color='#fff' size={height / 35} />
                                    <View style={{ marginVertical: 2 }} />
                                    <TextRegular children="Enjoy interactive sessions and a plan that's built just for you with captivating teachers." color='#F8F0E3' size={height / 38} />
                                </View>
                            </View>
                        </ImageBackground>
                        <Pagination />
                    </View>
                </View>

                {/* 4th Screen */}
                <View style={{ width, height }}>
                    <View style={styles.topView}>
                        <ImageBackground
                            source={require('../../../assets/L3.jpeg')}
                            style={commanStyles.mainView}
                        />
                    </View>

                    <View style={styles.bottomView}>
                        <ImageBackground
                            source={require('../../../assets/bgLanding.png')}
                            style={[commanStyles.mainView, commanStyles.centerView]}
                        >
                            <View style={{ width: '80%', height: '60%', alignSelf: 'center' }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <TextBold children='FOCUS ON FEELING GOOD' color='#fff' size={height / 33} />
                                    <View style={{ marginVertical: 2 }} />
                                    <TextRegular children="This is about more than learning a new language. It's about how good we can help you feel. " color='#F8F0E3' size={height / 45} />
                                </View>
                                <View style={{ marginVertical: 10 }} />

                                <View style={styles.paginationWrapper2}>
                                    {Array.from(Array(4).keys()).map((key, index) => (
                                        <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                                    ))}
                                </View>

                                <View style={{ marginVertical: 15 }} />

                                {/* Sign Up Button */}
                                <Btn children={'SIGN UP'} color='#fff' width='100%' height={height / 15} radius={20} txtClr='#53B4CE' txtSize={20} fontFamily='Poppins-SemiBold' onPress={btnSignup}/>

                                <View style={{ marginVertical: height / 60 }}></View>

                                {/* Sign In Button */}
                                <View style={[{ flexDirection: 'row' }, commanStyles.centerView]}>
                                    <TextRegular children="ALREADY HAVE AN ACCOUNT?" size={height / 58} color='#fff' />
                                    <View style={{ marginLeft: 5, }}>
                                        <Btn children={'SIGN IN'} txtClr='#fff' txtSize={height / 55} fontFamily='Poppins-SemiBold' textDecorationLine='underline' onPress={btnSignin}/>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>

    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({

    topView: {
        height: height / 1.9,
        width: '100%',
        position: 'absolute',
        top: 0
    },
    bottomView: {
        height: height / 1.5,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },


    paginationWrapper: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 140 : 70,
        left: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    paginationWrapper2: {
        flexDirection: 'row',
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#fff',
        marginLeft: 10,
    },
});

export default LandingScreen