import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Btn, BtnSetting, CustomImg, GeneralView, Notification, TextBold, TextRegular } from '../components/CommanComponents';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../components/auth/Store'
import commanStyles from '../../styles/commanStyles';
import { List } from '../components/list';
import { COLORS } from '../../styles/color';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Main Function
const Invoices = ({ navigation }) => {

    const [mydata, setmydata] = useState('');       //set saved userdata

    //View will appear 
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setTimeout(async () => {
                var userData = await Store.getData(Store.userData)
                setmydata(userData)
            })
        }
    }, [isFocused]);


    //Flat list for your Invoices
    const Invoices = [
        {
            id: '1',
            title: 'Boris Johnson',
            date: '10 June 2022',
            image: require("../../../assets/p1.png"),
            invoice: 'Unpaid',
            amount: '997'
        },
        {
            id: '2',
            title: 'Kate Winslet',
            date: '8 Jan 2022',
            image: require("../../../assets/p2.png"),
            invoice: 'Overdue',
            amount: '240'
        },
        {
            id: '3',
            title: 'Maria Toubbe',
            date: '7 Jan 2022',
            image: require("../../../assets/p3.png"),
            invoice: 'Paid',
            amount: '997'
        },
        {
            id: '4',
            title: 'Trush Langaliya',
            date: '16 Jan 2022',
            image: require("../../../assets/p4.png"),
            invoice: 'Overdue',
            amount: '497'
        },
        {
            id: '5',
            title: 'Samuel Ameyaw',
            date: '7 Jan 2022',
            image: require("../../../assets/p5.png"),
            invoice: 'Paid',
            amount: '497'
        },
        {
            id: '6',
            title: 'Samuel Ameyaw',
            date: '7 Jan 2022',
            image: require("../../../assets/p5.png"),
            invoice: 'Paid',
            amount: '497'
        },
        {
            id: '7',
            title: 'Samuel Ameyaw',
            date: '7 Jan 2022',
            image: require("../../../assets/p5.png"),
            invoice: 'Paid',
            amount: '497'
        },

    ];



    //Invoice status button component
    const BtnStatus = ({ txt, src }) => {
        return (
            <View style={commanStyles.centerView}>
                <Btn height={height / 14} width={height / 14} radius={20} color='#fff'>
                    <View style={[commanStyles.centerView, commanStyles.mainView]}>
                        <CustomImg src={src} height={height / 20} width={height / 20} />
                    </View>
                </Btn>
                <View style={{ marginVertical: 3 }} />
                <TextRegular children={txt} size={height / 70} />
            </View>
        )
    }

    //design of recent plans & objectives
    const Item = ({ title, image, date, invoice, amount }) => (
        <View style={styles.flatListView}>
            <View style={styles.flatListSubView}>
                <View style={styles.userIconView}>
                    <CustomImg src={image} height='100%' width='100%' radius={35} />
                </View>
                <View style={styles.flatListDetailsView}>
                    <TextBold children={title} size={height / 60} />
                    <TextRegular children={date} size={height / 80} color='darkgrey'/>
                </View>
                <View style={styles.flatListAmountView}>
                    <TextBold children={invoice} size={height / 60} color={invoice == 'Paid' ? COLORS.lightgreen : invoice == 'Overdue' ? 'red' : 'black'} />
                    <TextRegular children={`£${amount}`} size={height / 60} color={invoice == 'Paid' ? COLORS.lightgreen : invoice == 'Overdue' ? 'red' : 'black'} />
                </View>
            </View>
        </View>
    );
    const plansObjectives = ({ item }) => (
        <Item title={item.title} image={item.image} date={item.date} invoice={item.invoice} amount={item.amount} />
    );

    //Return  View
    return (
        <GeneralView>
            {/* Profile View */}
            <View style={styles.profileView}>
                {
                    mydata.role == 'client' ?
                        <View style={{ height: '100%', width: '15%', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ justifyContent: 'center', position: 'absolute', left: 30 }} onPress={() => back()}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </TouchableOpacity>
                        </View>
                        :
                        mydata.role == 'teacher' ?
                            <View style={{ height: '100%', width: '15%', justifyContent: 'center' }} />
                            :
                            <View style={{ height: '100%', width: '5%', justifyContent: 'center' }} />

                }

                <CustomImg src={{ uri: `${mydata.userImage}` }} height={height / 14} width={height / 14} radius={height / 7} />
                <TouchableOpacity style={styles.btnSettings} onPress={() => navigation.navigate('ProfileScreen')}>
                    <BtnSetting tintClr='black' />
                </TouchableOpacity>
            </View>

            {/* Invoice text View */}
            <View style={{ marginVertical: 10 }} />
            <View style={styles.invoiceView}>
                <TextBold children="Invoices Raised" size={height / 28} color='black' />
                {
                    mydata.role == 'admin' ?
                    <View style={[{marginLeft: 10, alignSelf:'center',alignItems:'center'}]}>
                          <Btn height={height / 30} width={height / 30} radius={height / 90} color={COLORS.Admin}>
                                <CustomImg src={require('../../../assets/filter.png')} height={height / 40} width={height / 40} tintClr='#fff' />

                        </Btn>
                    </View>
                      
                        :
                        null
                }
            </View>

            {/* Invoice status View */}
            <View style={styles.invoiceStatusView}>
                <BtnStatus txt='Paid' src={require('../../../assets/Paid.png')} />
                <BtnStatus txt='Unpaid' src={require('../../../assets/Unpaid.png')} />
                <BtnStatus txt='Overdue' src={require('../../../assets/alarm.png')} />
                {
                    mydata.role == 'teacher' ?
                        <BtnStatus txt='Add Invoice' src={require('../../../assets/add.png')} />
                        :
                        mydata.role == 'client' ?
                            <BtnStatus txt='URGENT' src={require('../../../assets/urgent.png')} />
                            :
                            null
                }
            </View>

            {/* Invoice status View */}
            <View style={{ height: height / 2, width: '100%' }}>
                <List data={Invoices} renderItem={plansObjectives} />
            </View>

            {/* Notification */}
            <View style={{ position: 'absolute', right: 10, top: 10, height: '50%', alignSelf: 'center' }}>
                <Notification role={mydata.role} />
            </View>
        </GeneralView>
    );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    btnSettings: {
        marginLeft: 15,
        marginTop: 20,
        height: '100%'
    },
    userIconView: {
        height: height / 20,
        width: height / 20,
        marginLeft: height / 30
    },
    profileView: {
        height: height / 10,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    invoiceView: {
        height: height / 20,
        width: '80%',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    invoiceStatusView: {
        height: height / 6,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    flatListView: {
        height: height / 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListSubView: {
        backgroundColor: '#ffffff',
        width: '90%',
        height: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    flatListDetailsView: {
        flexDirection: 'column',
        marginLeft: height / 60,
        width: '50%',
        alignItems: 'flex-start',
    },
    flatListAmountView: {
        flexDirection: 'column',
        marginLeft: height / 90,
        width: '20%',
        alignItems: 'flex-end',
        marginRight: height / 50
    }


});

export default Invoices