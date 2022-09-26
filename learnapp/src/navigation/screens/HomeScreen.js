import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions, Linking } from 'react-native';
import { List } from '../components/list';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../components/auth/Store'
import { Btn, BtnSetting, CustomImg, GeneralView, Loader, Notification, TextBold, TextRegular } from '../components/CommanComponents';
import commanStyles from '../../styles/commanStyles';
import { COLORS } from '../../styles/color';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import Api from '../components/auth/Api';
import RenderHTML from "react-native-render-html";
import { Path, G, Svg, Rect } from 'react-native-svg'
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

//Main Function
const HomeScreen = ({ navigation }) => {

  const [blogsdata, setblogsdata] = useState('');       //set saved userdata
  const [selectDate, setSelectDate] = useState('');


  //View will appear 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTimeout(async () => {
        setblogsdata('')
        Blogs()
      })
    }
  }, [isFocused]);



  const Blogs = async () => {
    return fetch('https://lac-test-api.herokuapp.com/api/v1/article')
      .then((response) => response.json())
      .then((response) => {
        setblogsdata(response)
      })
      .catch((error) => {
        console.error(error);
      });
  };



const btnPlanning = () => {
  navigation.navigate('PlanningScreen')
}

  const handleClick = () => {
    Linking.openURL(blogsdata.data.link).catch(err => console.error("Couldn't load page", err));
  };

  LocaleConfig.locales['en'] = {

    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: "Today"

  };
  LocaleConfig.defaultLocale = 'en';

  //Return  View
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
            <TextBold children="Today" size={height / 30} />
            <TextRegular children={`${new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}`} size={height / 45} />

            <View style={{ marginVertical: 20 }}>
              <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 20, color: '#325966' }}>Reading Inspiration</Text>
              <View style={{ marginVertical: 10, height: height / 2.5, width: '100%', borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>

                {blogsdata ?
                  <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={handleClick}>
                    <View style={{ height: "70%", width: '100%' }}>
                      <CustomImg src={{ uri: `${blogsdata.data.image}` }} height="100%" width="100%" radius={10} resizeMode="cover" />
                    </View>
                    <View style={{ height: "30%", width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                      <TextBold children={blogsdata.data.title} />

                    </View>
                  </TouchableOpacity>

                  : <Loader />}
              </View>
              <View style={{ marginVertical: 10, height: height / 2.7, width: '100%', borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={() => navigation.navigate('Checkin')}>
                  <CustomImg src={require('../../../assets/T2.png')} height="100%" width="100%" radius={10} resizeMode="cover" />
                </TouchableOpacity>
              </View>

              <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center', height: 400, width: '100%', borderWidth: 1, borderColor: 'black', borderRadius: 10, backgroundColor: '#EDEDF3' }}>
                <CustomImg src={require('../../../assets/T3.png')} height={150} width={150} radius={10} />
                <TextBold children="Plan ahead" size={height / 40} />
                <View style={{ width: '80%', margin: 10 }}>
                  <TextRegular children="Tap below to plan the practice and exercies for your clients." size={height / 45} textAlign="center" />
                </View>
                <Btn children="Start Planning" radius={10} height={50} width='80%' txtClr="#ffffff" color="#051629" onPress={btnPlanning}/>
              </View>

              <View style={{ marginVertical: 10, height: height / 3, width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('CalenderScreen')}>
                  <Calendar
                    theme={{
                      textSectionTitleColor: 'black',
                      textSectionTitleDisabledColor: 'black',
                      selectedDayBackgroundColor: 'black',
                      selectedDayTextColor: 'red',
                      dayTextColor: 'black',
                      textDayFontWeight: 'bold',
                      todayBackgroundColor: "#f2e6ff",
                      textMonthFontWeight: 'bold',
                      arrowColor: 'black',
                      selectedDayTextColor: "#FFFFFF",
                      textDayHeaderFontWeight: "bold",
                      'stylesheet.calendar.header': {
                        week: {
                          marginTop: 15,
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        },
                      }
                    }}
                    onDayPress={day => {
                      console.log("Selected date is ::", day)
                      setSelectDate(day)
                    }}

                    markingType={'multi-dot'}
                    horizontal={true}
                    hideArrows={false}
                    pagingEnabled={true}
                    calendarWidth={width}
                    hideExtraDays={false}
                  />
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={{ marginVertical: 30, height: height / 2.7, width: '100%' }}>
            <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={() => navigation.navigate('Checkin')}>
              <CustomImg src={require('../../../assets/endImage.png')} height="100%" width="100%" radius={10} resizeMode="cover" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  userInfo: {
    height: height / 8,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    alignSelf: 'center'
  },
  userProfileView: {
    height: height / 12,
    width: height / 12,
  },

  txtTitle: {
    fontSize: height / 45,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
    marginLeft: width / 20
  },


  item: {
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //android specific
    elevation: 5,
    //ios specific
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  title: {
    color: '#ffffff',
    width: '90%',
    fontSize: height / 50,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subTitle: {
    color: '#ffffff',
    fontSize: height / 80,
    width: '95%',
    fontFamily: 'Poppins-regular',
    textAlign: 'center',
    textAlignVertical: 'center',

  },
  userIconView: {

    height: height / 15,
    width: height / 15,
    borderRadius: height / 7.5,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userIcon: {
    height: 30,
    width: 30,
  },
});

export default HomeScreen