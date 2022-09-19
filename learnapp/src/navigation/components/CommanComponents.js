import React, { useState, useRef } from 'react';
import { Dimensions, View, TouchableOpacity, Image, Alert, Text, KeyboardAvoidingView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../styles/color';
import { List } from './list';
import commanStyles from '../../styles/commanStyles';


// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


// Main View of Screen
const GeneralView = ({ children }) => {
    return (
        <SafeAreaView style={styles.SafeAreaProvider}>
                <View style={styles.mainView}>
                    {/* <ImageBackground style={styles.mainView} source={require('../../../assets/theme1.png')}>  */}
                        {children}
                    {/* </ImageBackground> */}
                   
                </View>
        </SafeAreaView>
    );
};

// Main View of Screen
const BtnSetting = ({ children, tintClr }) => {
    return (
        <View style={{
            width: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image
                source={require('../../../assets/settings.png')}
                style={{ height: 15, width: 15, alignSelf: 'flex-start', tintColor: tintClr, }}
            />
        </View>
    );
};

// Logout
const AlertPermission = (msg, { navigation }) => {

    return (
        Alert.alert(
            'Learn&CO',
            msg,
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => navigation.navigate('Signin'), style: 'destructive' },
            ],
            { cancelable: false }
        )
    );
};

//Alert
const AlertDiolog = (msg) => {
    Alert.alert('Learn&Co', msg,
        [
            { text: 'Ok' },
        ],
        {
            cancelable: true
        }
    )
};

//Loader 
const Loader = () => {
    return (
        <ActivityIndicator style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }} size='large' color="black" />
    )
}

//Image 
const CustomImg = ({ src, height, width, bgclr, radius, tintClr, borderWidth, borderColor,resizeMode}) => {
    const styles = {
        imgStyle: {
            width: width,
            height: height,
            backgroundColor: bgclr != '' ? bgclr : '',
            resizeMode: resizeMode,
            borderRadius: radius,
            tintColor: tintClr,
            borderWidth: borderWidth, 
            borderColor: borderColor
        },
    };
    return (
        <Image style={styles.imgStyle} source={src} />
    );
};

//Keyboard avoiding View
const Keyboard = ({ children }) => {
    const styles = {

    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            
        >
            {children}
        </KeyboardAvoidingView>
    );
};

//Text
const TextBold = ({ children, size, color, textAlign }) => {
    const styles = {
        TextBold: {
            fontSize: size,
            fontFamily: 'Poppins-SemiBold',
            textAlign: textAlign,
            color: color != '' ? color : 'black'
        },
    }
    return <Text style={styles.TextBold}>{children}</Text>;
};
const TextRegular = ({ children, size, color , textAlign}) => {
    const styles = {
        TextRegular: {
            fontSize: size,
            fontFamily: 'Poppins-Regular',
            textAlign: textAlign,
            color: color
        },
    }
    return <Text style={styles.TextRegular}>{children}</Text>;
};


//Button
const Btn = ({ children, onPress, color, width, height, radius, txtClr, txtSize, fontFamily, textDecorationLine }) => {
    const styles = {
        textBtn: {
            backgroundColor: color,
            alignSelf: 'center',
            width: width,
            height: height,
            justifyContent: 'center',
            borderRadius: radius,
            alignItems: 'center',
        },
        txtBtn: {
            color: txtClr,
            textAlign: 'center',
            fontSize: txtSize,
            fontFamily: 'Poppins-SemiBold',
            textDecorationLine: textDecorationLine != '' ? textDecorationLine : ''
        }
    };
    return (
        <TouchableOpacity style={styles.textBtn} onPress={onPress}>
            <Text style={styles.txtBtn}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
//FormInput
const FormInputText = ({ placeholder, obscure, onchange, keyboardType, returnKeyType, onSubmitEditing, ref, value }) => {
    const emailToPass = useRef(null);
    const styles = {
        textInputStyle: {
            borderRadius: 10,
            height: 60,
            padding: 16,
            width: '96%',
            backgroundColor: 'white',
            fontFamily: 'Poppins-SemiBold',
            color: '#000000',
            alignSelf: 'center'
        },
    };
    return (
        <View style={{ marginVertical: 15 }}>
            <TextInput
                placeholderTextColor="#999"
                style={[styles.textInputStyle, commanStyles.boxShadow]}
                placeholder={placeholder}
                secureTextEntry={obscure ? true : false}
                onChangeText={onchange}
                returnKeyType={returnKeyType}
                keyboardType={keyboardType}
                value={value}
                onSubmitEditing={() => onSubmitEditing}
            // ref={ref}
            />
        </View>
    )
};

//Notification
const Notification = (role) => {
    const [showNotification, setshowNotification] = useState(false);
    const NotificationToday = [
        {
            id: '1',
            txt: 'Hi There, Good morning. Hope everything is going well. '
        },
        {
            id: '2',
            txt: 'Hi There, Good morning. Hope everything is going well. '
        },

    ];
    const NotificationWeek = [
        {
            id: '1',
            txt: 'Hi There, Good morning. Hope everything is going well. '
        },
        {
            id: '2',
            txt: 'Hi There, Good morning. Hope everything is going well. '
        },
        {
            id: '3',
            txt: 'Hi There, Good morning. Hope everything is going well. '
        },
    ];

    const ClickNotification = () => {
        setshowNotification(!showNotification)
    }
    const Notification = ({ txt }) => (
        <View style={{
            marginVertical: 2,
            marginHorizontal: 2,
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <View style={{ marginVertical: 5 }}></View>
            <Text style={{ color: 'black', fontSize: 10, fontFamily: 'Poppins-regular' }}>{txt}</Text>
            <View style={{ marginVertical: 5 }}></View>
            <View style={{ backgroundColor: '#E8E4E3', width: '90%', height: 1 }}></View>
        </View>
    );
    const NotificationPlans = ({ item }) => (
        <Notification txt={item.txt} />
    );
    return (
        <View>
            {
                showNotification == false ?
                    <View style={{ width: height / 20, height: height / 20, position: 'absolute', top: 10, right: 10 }}>
                        <TouchableOpacity style={{ width: 30, height: 30, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: role.role == 'client' ? COLORS.Client : role.role == 'teacher' ? COLORS.Teacher : COLORS.Admin }}
                            onPress={() => ClickNotification()}
                        >
                            <Image
                                source={require('../../../assets/bell.png')}
                                style={{ height: 20, width: 20, borderRadius: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ width: height / 2, height: height / 3, position: 'absolute', top: 0, right: 0 }}>
                        <View style={{ height: '100%', width: '60%', backgroundColor: '#FFFFFFF2', position: 'absolute', alignSelf: 'flex-end', marginRight: 60, borderRadius: 15, }}>
                            <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                                <View style={{ height: '90%', width: '90%', alignSelf: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, alignSelf: 'center' }}>Notifications</Text>
                                        <View style={{ width: 30, height: 30, justifyContent: 'flex-end', flex: 1 }}>
                                            <TouchableOpacity style={{ width: 30, height: 30, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: '#524C78' }}
                                                onPress={() => ClickNotification()}
                                            >
                                                <Image
                                                    source={require('../../../assets/bell.png')}
                                                    style={{ height: 20, width: 20, borderRadius: 10 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <ScrollView>
                                        <View style={{ marginVertical: 4 }}></View>
                                        <View style={{ backgroundColor: '#E8E4E3', width: '20%', height: 2 }}></View>
                                        <View style={{ marginVertical: 4 }}></View>
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>Today</Text>
                                        <List data={NotificationToday} renderItem={NotificationPlans} />
                                        <View style={{ marginVertical: 4 }}></View>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, }}>This Week</Text>
                                        <List data={NotificationWeek} renderItem={NotificationPlans} />
                                    </ScrollView>
                                    <View style={{ marginVertical: 4 }}></View>
                                    <TouchableOpacity>
                                        <Text style={{ color: 'black', fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>View all publications</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
            }
        </View>
    )
};

const styles = {
    SafeAreaProvider: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    ScrollView: {
        flex: 1,
    },
    mainView: {
        height: '100%',
        width: '100%',
        flex: 1,
    
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 2.5,
        borderRadius: 5,
      },
     
      label: {
        color: '#fff',
        fontSize: 15,
      },
};




export default function InputBox(props) {
    const styles = {
       
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 2.5,
            borderRadius: 5,
          },
         
          label: {
            color: '#fff',
            fontSize: 15,
          },
          input: {
            fontSize: 15,
            height: 50,
            color: '#fff',
            borderBottomColor: '#fff',
            borderBottomWidth: 2,
            fontFamily: 'Poppins-SemiBold',
          },
          
    };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="#9F9F9F"
          style={styles.input}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          editable={props.editable}
        />
      </View>
    </View>
  );
}


export { GeneralView, BtnSetting, AlertPermission, AlertDiolog, Notification, CustomImg, Keyboard, TextBold, TextRegular, FormInputText, Btn, Loader };
