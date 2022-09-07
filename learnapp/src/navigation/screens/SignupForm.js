//packages
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, ImageBackground, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commanStyles from '../../styles/commanStyles';
import { Btn, CustomImg, Keyboard, TextBold, TextRegular } from '../components/CommanComponents';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
import RadioGroup from 'react-native-radio-buttons-group';

//Main Function
const SignupForm = ({ navigation }) => {

    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const [nextRef, setNextRef] = useState('');
    const { width, height } = Dimensions.get('window');

    const [txtFirstName, setFirstName] = useState('');
    const [txtLastName, setLastName] = useState('');
    const [txtContact, setContact] = useState('');
    const [txtAdd1, setAdd1] = useState('');
    const [txtAdd2, setAdd2] = useState('');
    const [txtAdd3, setAdd3] = useState('');
    const [txtAdd4, setAdd4] = useState('');
    const [txtAdd5, setAdd5] = useState('');

    //variables for tuition for 
    const [isSelected1, setSelection1] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [isSelected3, setSelection3] = useState(false);



    
    const btnAge = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        name: '24-29',
    }, {
        id: '2',
        name: '30-39',
    }, {
        id: '3',
        name: '40-49',
    }, {
        id: '4',
        name: '50-59',
    }, {
        id: '5',
        name: '60+',
    }]



    const [btnAgeFor, setbtnAge] = useState(btnAge)
    function onPressAgeButton(radioButtonsArray) {
        setbtnAge(radioButtonsArray);
    }


    //AGE GROUP OF CLIENT
    const [isAge1, setAge1] = useState(false);
    const [isAge2, setAge2] = useState(false);
    const [isAge3, setAge3] = useState(false);
    const [isAge4, setAge4] = useState(false);
    const [isAge5, setAge5] = useState(false);
    const [isAge6, setAge6] = useState(false);

    //LANGUAGES
    const [isLan1, setisLan1] = useState(false);
    const [isLan2, setisLan2] = useState(false);
    const [isLan3, setisLan3] = useState(false);
    const [isLan4, setisLan4] = useState(false);
    const [isLan5, setisLan5] = useState(false);
    const [isLan6, setisLan6] = useState(false);
    const [isLan7, setisLan7] = useState(false);
    const [isLan8, setisLan8] = useState(false);
    const [isLan9, setisLan9] = useState(false);
    const [isLan10, setisLan10] = useState(false);

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

    const { currentPage: pageIndex } = sliderState;

    const Next = () => {
        var { currentPage } = sliderState;
        currentPage = currentPage + 1
        nextRef.scrollTo({ x: currentPage * width, y: 0, animated: true })
        console.log('Selcted tution for is ::', checkedItems)
        if (currentPage == '5') {
            navigation.navigate('TabBar')
        }
    }


    const BtnNext = () => {
        return (
            <View style={{ position: 'absolute', right: 25, bottom: 100, height: 60, width: 60, borderRadius: 30, }}>
                <Btn height='100%' width='100%' radius={30} color='#fff' onPress={Next}>
                    <FontAwesomeIcon icon={faAngleRight} size={25} />
                </Btn>
            </View>
        )
    }


    const Checkbox = ({ value, onValueChange, txt }) => {
        return (
            <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ width: '15%', alignSelf: 'center' }}>
                    <CheckBox
                        value={value}
                        onValueChange={onValueChange}
                        style={styles.checkbox}
                        onFillColor={"#fff"}
                    />
                </View>

                <View style={{ width: '85%', alignSelf: 'center', margin: 10 }}>
                    <TextRegular children={`${txt}`} size={height / 45} color='#fff' />
                </View>
            </View>
        )
    }

    const [checkedItems, setCheckedItems] = useState({}); //plain object as state

    const handleChange = (event) => {
        // updating an object instead of a Map
        console.log("event: ", event);
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    }
    useEffect(() => {
        console.log("checkedItems: ", checkedItems);
    }, [checkedItems]);

    const checkboxes = [
        {
            name: 'YOURSELF',
        },
        {
            name: 'YOUR PARTNER',
        },
        {
            name: 'OTHERS',
        }
    ];

    //Return  View
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


                <View style={{ width, height }}>
                    <View style={{ height: "100%", width: '100%' }}>
                        <View style={{ height: '55%', width: '100%', }}>
                            <ImageBackground
                                source={require('../../../assets/signin2.png')}
                                style={[commanStyles.mainView]}
                            />
                        </View>

                        <View style={{ height: '75%', width: '100%', justifyContent: 'center', position: 'absolute', bottom: 0 }}>
                            <ImageBackground
                                source={require('../../../assets/bg3.png')}
                                style={[{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center' }]}

                            >
                                <TextBold children="WELCOME TO LEARN&CO" size={height / 35} color="#fff" />
                                <View style={{ height: 2, width: '70%', backgroundColor: '#fff' }} />
                                <View style={{ margin: 20, width: '80%' }}>
                                    <TextRegular children="Let's get you started learning a new language. Fill out the form to tell us a bit more about yourself." size={height / 40} color="#fff" textAlign='center' />

                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                    <BtnNext />
                </View>


                <View style={{ width, height }}>
                    <View style={{ height: "100%", width: '100%' }}>
                        <Keyboard>
                            <ImageBackground
                                source={require('../../../assets/Splashbg.png')}
                                style={[commanStyles.mainView, { alignItems: 'center' }]}
                            >
                                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                    <ScrollView style={{ width: '100%', height: '100%' }}>

                                        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>

                                            <View style={{ marginVertical: 10 }} />
                                            <View style={{ height: '15%', width: '40%', alignSelf: 'center' }}>
                                                <CustomImg src={require('../../../assets/L&co_logo_white.png')} width='100%' height='100%' resizeMode='contain' />
                                            </View>
                                            <View style={{ marginVertical: 10 }} />
                                            <View style={{ width: '80%' }}>

                                                <TextBold children="LAST NAME" color="#fff" size={height / 40} />
                                                <TextInput
                                                    style={{
                                                        fontSize: 15,
                                                        height: height / 20,
                                                        color: '#fff',
                                                        borderBottomColor: '#fff',
                                                        borderBottomWidth: 2,
                                                        fontFamily: 'Poppins-SemiBold'
                                                    }}
                                                    onChangeText={(txtLastName) => setLastName(txtLastName)}
                                                />
                                                <View style={{ marginVertical: 10 }} />
                                                <TextBold children="CONTACT NUMBER" color="#fff" size={height / 40} />
                                                <TextInput
                                                    style={{
                                                        fontSize: 15,
                                                        height: height / 20,
                                                        color: '#fff',
                                                        borderBottomColor: '#fff',
                                                        borderBottomWidth: 2,
                                                        fontFamily: 'Poppins-SemiBold'
                                                    }}
                                                    onChangeText={(txtContact) => setContact(txtContact)}
                                                />
                                                <View style={{ marginVertical: 10 }} />

                                                <TextBold children="ADDRESS" color="#fff" size={height / 40} />
                                                <TextInput
                                                    style={{
                                                        fontSize: 15,
                                                        height: height / 20,
                                                        color: '#fff',
                                                        borderBottomColor: '#fff',
                                                        borderBottomWidth: 2,
                                                        fontFamily: 'Poppins-SemiBold'
                                                    }}
                                                    onChangeText={(txtAdd1) => setAdd1(txtAdd1)}
                                                    placeholder="House no."
                                                    placeholderTextColor='lightgrey'
                                                />
                                                <View style={{ marginVertical: 10 }} />
                                                <TextInput
                                                    style={{
                                                        fontSize: 15,
                                                        height: height / 20,
                                                        color: '#fff',
                                                        borderBottomColor: '#fff',
                                                        borderBottomWidth: 2,
                                                        fontFamily: 'Poppins-SemiBold'
                                                    }}
                                                    onChangeText={(txtAdd2) => setAdd2(txtAdd2)}
                                                    placeholder="Street 1"
                                                    placeholderTextColor='lightgrey'
                                                />
                                                <View style={{ marginVertical: 10 }} />
                                                <TextInput
                                                    style={{
                                                        fontSize: 15,
                                                        height: height / 20,
                                                        color: '#fff',
                                                        borderBottomColor: '#fff',
                                                        borderBottomWidth: 2,
                                                        fontFamily: 'Poppins-SemiBold'
                                                    }}
                                                    onChangeText={(txtAdd3) => setAdd3(txtAdd3)}
                                                    placeholder="Street 2"
                                                    placeholderTextColor='lightgrey'
                                                />
                                                <View style={{ marginVertical: 10 }} />
                                                <TextInput
                                                    style={{
                                                        fontSize: 15,
                                                        height: height / 20,
                                                        color: '#fff',
                                                        borderBottomColor: '#fff',
                                                        borderBottomWidth: 2,
                                                        fontFamily: 'Poppins-SemiBold'
                                                    }}
                                                    onChangeText={(txtAdd4) => setAdd4(txtAdd4)}
                                                    placeholder="City"
                                                    placeholderTextColor='lightgrey'
                                                />
                                                <View style={{ marginVertical: 10 }} />
                                                <TextInput
                                                    style={{
                                                        fontSize: 15,
                                                        height: height / 20,
                                                        color: '#fff',
                                                        borderBottomColor: '#fff',
                                                        borderBottomWidth: 2,
                                                        fontFamily: 'Poppins-SemiBold',
                                                    }}
                                                    onChangeText={(txtAdd5) => setAdd5(txtAdd5)}
                                                    placeholder="Postcode"
                                                    placeholderTextColor='lightgrey'
                                                />

                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </ImageBackground>
                        </Keyboard>
                    </View>
                    <BtnNext />
                </View>


                <View style={{ width, height }}>
                    <View style={{ height: "100%", width: '100%' }}>
                        <ImageBackground
                            source={require('../../../assets/Splashbg.png')}
                            style={[commanStyles.mainView, { alignItems: 'center' }]}
                        >
                            <ScrollView>
                                <View style={{ width: width }}>
                                    <View style={{ marginVertical: 10 }} />
                                    <View style={{ height: '20%', width: '40%', alignSelf: 'center' }}>
                                        <CustomImg src={require('../../../assets/L&co_logo_white.png')} width='100%' height='100%' resizeMode='contain' />
                                    </View>
                                    <View style={{ marginVertical: 10 }} />
                                    <View style={{ width: '80%', alignSelf: 'center' }}>
                                        <TextBold children="WHO'S THE TUITION FOR" color="#fff" size={height / 40} />
                                       
                                        {
                                            checkboxes.map(item => (
                                                <Checkbox txt={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                            ))
                                        }



                                        <View style={{ marginVertical: 10 }} />
                                        <TextBold children="AGE GROUP OF CLIENT" color="#fff" size={height / 40} />
                                        {
                                            btnAge.map(item => (
                                                <Checkbox txt={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                            ))
                                        }

                                    </View>
                                </View>
                            </ScrollView>
                        </ImageBackground>
                    </View>
                    <BtnNext />
                </View>



                <View style={{ width, height }}>
                    <View style={{ height: "100%", width: '100%' }}>
                        <ImageBackground
                            source={require('../../../assets/Splashbg.png')}
                            style={[commanStyles.mainView, { alignItems: 'center' }]}
                        >
                            <ScrollView>
                                <View style={{ marginVertical: 10 }} />
                                <View style={{ height: '20%', width: '40%', alignSelf: 'center' }}>
                                    <CustomImg src={require('../../../assets/L&co_logo_white.png')} width='100%' height='100%' resizeMode='contain' />
                                </View>

                                <View style={{ width: '90%', margin: 10, alignSelf: 'center' }}>
                                    <TextBold children="WHICH LANGUAGES(S) WHOULD YOU LIKE TO STUDY" color="#fff" size={height / 40} />
                                    <Checkbox txt="FRENCH" value={isLan1} onValueChange={setisLan1} />
                                    <Checkbox txt="ITALIAN" value={isLan2} onValueChange={setisLan2} />
                                    <Checkbox txt="GERMAN" value={isLan3} onValueChange={setisLan3} />
                                    <Checkbox txt="PORTUGUESE" value={isLan4} onValueChange={setisLan4} />
                                    <Checkbox txt="SPANISH" value={isLan5} onValueChange={setisLan5} />
                                    <Checkbox txt="MANDARIN" value={isLan6} onValueChange={setisLan6} />
                                    <Checkbox txt="RUSSIAN" value={isLan7} onValueChange={setisLan7} />
                                    <Checkbox txt="JAPONESE" value={isLan8} onValueChange={setisLan8} />
                                    <Checkbox txt="ARABIC" value={isLan9} onValueChange={setisLan9} />
                                    <Checkbox txt="OTHER" value={isLan10} onValueChange={setisLan10} />
                                </View>
                            </ScrollView>
                        </ImageBackground>
                    </View>
                    <BtnNext />
                </View>

                <View style={{ width, height }}>
                    <View style={{ height: "100%", width: '100%' }}>
                        <Keyboard>
                            <ImageBackground
                                source={require('../../../assets/Splashbg.png')}
                                style={[commanStyles.mainView, { alignItems: 'center' }]}
                            >
                                <ScrollView style={{ width: '100%', height: '100%', }}>

                                    <View style={{ width: '100%', height: 1000, }}>

                                        <View style={{ marginVertical: 10 }} />
                                        <View style={{ height: height / 6, width: '35%', alignSelf: 'center' }}>
                                            <CustomImg src={require('../../../assets/L&co_logo_white.png')} width='100%' height='100%' resizeMode='contain' />
                                        </View>
                                        <View style={{ marginVertical: 10 }} />
                                        <View style={{ width: '90%', alignSelf: 'center' }}>
                                            <TextBold children="Frequency of Lessons Required" color="#fff" size={height / 40} />
                                            <Checkbox txt="1 hour per week" value={isSelected1} onValueChange={setSelection1} />
                                            <Checkbox txt="1.5 hours per week" value={isSelected2} onValueChange={setSelection2} />
                                            <Checkbox txt="2 hours per week" value={isSelected3} onValueChange={setSelection3} />
                                            <Checkbox txt="3 hours per week" value={isSelected3} onValueChange={setSelection3} />
                                            <Checkbox txt="Personal Tailored Package/Other" value={isSelected3} onValueChange={setSelection3} />

                                            <View style={{ marginVertical: 10 }} />
                                            <TextBold children="AGE GROUP OF CLIENT" color="#fff" size={height / 40} />

                                            <Checkbox txt="18-23" value={isAge1} onValueChange={setAge1} />
                                            <Checkbox txt="24-29" value={isAge2} onValueChange={setAge2} />
                                            <Checkbox txt="30-39" value={isAge3} onValueChange={setAge3} />
                                            <Checkbox txt="40-49" value={isAge4} onValueChange={setAge4} />
                                            <Checkbox txt="50-59" value={isAge5} onValueChange={setAge5} />
                                            <Checkbox txt="60+" value={isAge6} onValueChange={setAge6} />
                                        </View>
                                    </View>
                                </ScrollView>

                            </ImageBackground>
                        </Keyboard>
                    </View>
                    <BtnNext />
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
        height: 25,
        width: 25,
    },
    label: {
        width: '90%',
    },
});

export default SignupForm