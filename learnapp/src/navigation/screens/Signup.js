//packages
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, Dimensions, View, SafeAreaView, StatusBar, ScrollView, Text, TouchableOpacity, LogBox, KeyboardAvoidingView, TextInput, Modal, Animated, Easing, Button } from 'react-native';
import AspectImage from '../../../Components/AspectImage';
import styles from '../../styles/styles';
import FormInput from '../../../Components/FormInput';
import { BodyText, BoldText, SubtitleText, TitleText } from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useIsFocused } from "@react-navigation/native";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import Api from '../components/auth/Api';
import { ViewModel } from '../components/model';
import { AlertDiolog } from '../components/CommanComponents';


LogBox.ignoreAllLogs(true)  // hide warnings

//Main Function
const Signup = ({ route, navigation }) => {

  //variables
  const { role } = route.params;
  const [showModal, setShowModal] = useState(false);
  const isFocused = useIsFocused();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isTop, setIsTop] = useState(true);

  const startAnimation = toValue => {
    Animated.timing(
      animatedValue, {
      toValue,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      setIsTop(!isTop);
    });
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();
  }


  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 3, height / 3],
    extrapolate: 'clamp'
  })
  // useEffect(() => {
  //   if (isFocused) {
  //     console.log("role is:", role)
  //   }
  // }, [isFocused]);


  const [txtFirstName, setTxtFirsttName] = useState('');
  const [txtLastName, setTxtLastName] = useState('');
  const [txtNumber, setTxtNumber] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  //DropDown for clients
  const [selectedReason, setSelectedReason] = useState([]);
  const [selectedLanguage, setSelecteLanguage] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);

  //DropDown for teachers
  const [selectedLanguageTaught, setSelectedLanguageTaught] = useState([]);
  const [selectedLanguageSpoken, setSelectedLanguageSpoken] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedEnglish, setSelectedEnglish] = useState([]);
  const [Experience, setExperience] = useState('');
  const [testimonial, settestimonial] = useState([]);
  const [txtqualification, settxtqualification] = useState('');
  const [feesCharged, setfeesCharged] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [otherAgency, setOtherAgency] = useState([])
  const [filename, setfilename] = useState('');
  const [profileImg, setprofileImg] = useState('');

  //Dropdown arrays 
  const Reason = [
    { item: 'Interest in the Language(s)', id: '1', },
    { item: 'Personal Development', id: '2', },
    { item: 'Communicate with your partner and family', id: '3', },
    { item: 'Part of Corporate Package', id: '4', },
    { item: 'Other (selecting this should enable a textbox for the user to input their reason)', id: '5', },
  ]

  const Age = [
    { item: '18 - 23', id: '1', },
    { item: '24 - 29', id: '2', },
    { item: '30 - 39', id: '3', },
    { item: '40 - 49', id: '4', },
    { item: '50 - 59', id: '5', },
    { item: '60+', id: '6', },
  ]

  const Frequency = [
    { item: '1 hour per week', id: '1', },
    { item: '1.5 hours per week', id: '2', },
    { item: '2 hours per week', id: '3', },
    { item: '3 hours per week', id: '4', },
    { item: 'Personal Tailored Package/Other', id: '5', },
  ]

  const Language = [
    { item: 'French', id: '1', },
    { item: 'Spanish', id: '2', },
    { item: 'German', id: '3', },
    { item: 'English', id: '4', },
    { item: 'Italian', id: '5', },
    { item: 'Portuguese', id: '6', },
    { item: 'Japanese', id: '7', },
    { item: 'Mandarin', id: '8', },
    { item: 'Russian', id: '9', },
    { item: 'Arabic', id: '10', },
    { item: 'Other', id: '11', },
  ]

  const LanguageTaught = [
    { item: 'A1', id: '1', },
    { item: 'A2', id: '2', },
    { item: 'B1', id: '3', },
    { item: 'B2', id: '4', },
    { item: 'C1', id: '5', },
    { item: 'C2', id: '6', },
  ]

  const English = [
    { item: 'Native', id: '1', },
    { item: 'Fluent', id: '2', },
    { item: 'Proficient', id: '3', },
  ]


  function onmultiselected(text) {
    if (text == 'reason') {
      return (item) => setSelectedReason(xorBy(selectedReason, [item], 'id'))
    } else if (text == 'language') {
      return (item) => setSelecteLanguage(xorBy(selectedLanguage, [item], 'id'))
    }

    if (text == 'languageTaught') {
      return (item) => setSelectedLanguageTaught(xorBy(selectedLanguageTaught, [item], 'id'))
    } else if (text == 'languageSpoken') {
      return (item) => setSelectedLanguageSpoken(xorBy(selectedLanguageSpoken, [item], 'id'))
    }
  }

  function onChange(text) {
    if (text == 'age') {
      return (val) => setSelectedAge(val)
    } else if (text == 'frequency') {
      return (val) => setSelectedFrequency(val)
    }

    if (text == 'LevelsTaught') {
      return (val) => setSelectedLevels(val)
    } else if (text == 'English') {
      return (val) => setSelectedEnglish(val)
    }
  }



  const btnupload = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      setfilename(response[0].name);
    } catch (err) {
      console.warn(err);
    }
  }, []);



  const btnimgUpload = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.images],
      });
      setprofileImg(response[0].name);
    } catch (err) {
      console.warn(err);
    }
  }, []);


  //Signin Action
  const btnSignup = () => {
   
    const EmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (txtEmail.trim().length == 0) {
      AlertDiolog("The email field is required.");
    } else if (EmailValidation.test(txtEmail) == false) {
      AlertDiolog("The email field must be a valid email.");
    } else if (txtPassword.trim().length < 7) {
      AlertDiolog("The password field must be at least 8 characters.");
    } else if (txtFirstName.trim().length == 0) {
      AlertDiolog("The first name field is required.");
    } else if (txtLastName.trim().length == 0) {
      AlertDiolog("The Last name field is required.");
    } else if (txtNumber.trim().length < 9) {
      AlertDiolog("The contact number field is required.");
    } else if (role == 'Client') {
      if (selectedReason.length == 0) {
        AlertDiolog("Please select reason for studying the languages");
      } else if (selectedAge.length == 0) {
        AlertDiolog("Please select age group of client");
      } else if (selectedFrequency.length == 0) {
        AlertDiolog("Please select frequency of Lessons Required");
      } else if (selectedLanguage.length == 0) {
        AlertDiolog("Please Language(s) you would like to study");
      } else {
        var reasonArray = [];
        for (var i = 0; i < selectedReason.length; i++) {
          console.log("data is ::",)
          reasonArray.push(selectedReason[i].item)
        }
        var LanguageArray = [];
        for (var j = 0; j < selectedLanguage.length; j++) {
          LanguageArray.push(selectedLanguage[j].item)
        }
        const userdata = {
          "firstName": txtFirstName,
          "lastName": txtLastName,
          "email": txtEmail,
          "contactNumber": txtNumber,
          "age": selectedAge.item,
          "studying-reason": reasonArray.toString(),
          "lesson-frequency": selectedFrequency.item,
          "language": LanguageArray.toString(),
          "password": txtPassword
        }
        console.log("user is ::", userdata)
        //console.log("data is ::",selectedReason.item[0].item)
        var a = Api(apiName = 'user/client', data = userdata, method = 'POST');
        a.then((result) => setdata(result))
      }
    } else if (role == "Teacher") {

      
        var levelsTaughtArray = [];
        for (var i = 0; i < selectedLanguageTaught.length; i++) {
          levelsTaughtArray.push(selectedLanguageTaught[i].item)
        }
        var languagesTaughtArray = [];
        for (var j = 0; j < selectedLanguageTaught.length; j++) {
          languagesTaughtArray.push(selectedLanguageTaught[j].item)
        }
        var languagesSpokenArray = [];
        for (var j = 0; j < selectedLanguageSpoken.length; j++) {
          languagesSpokenArray.push(selectedLanguageSpoken[j].item)
        }
      
       

      const userdata = {
        "email": txtEmail,
        "password": txtPassword,
        "firstName": txtFirstName,
        "lastName": txtLastName,
        "contactNumber": txtNumber,
        "languagesSpoken": languagesSpokenArray.toString(),
        "languagesTaught": languagesTaughtArray.toString(),  
        "role" : role,
        "english": selectedEnglish.item,
        "experience": Experience,
        "feeCharged": feesCharged,
        "levelsTaught" : selectedLevels.item,
        "qualifications": txtqualification,
        "cv": filename,
      }

      console.log('user :::::::',userdata)
      var a = Api(apiName = 'user/teacher', data = userdata, method = 'POST');
      a.then((result) => setdata(result))

     
    } 
  }
  setdata = (result) => {
    if (result.success == false) {
      AlertDiolog(`${result.data.msg}`)
    } else {
      setShowModal(!showModal);
      startAnimation(isTop ? 1 : 1);
      // AlertDiolog(`${result.data.msg}`)
    }
  }
  //Return  View
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}

        style={style.container}
      >
        <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />

        <View style={{ backgroundColor: '#ffffff', width: '100%', height: '100%', alignItems: 'center' }}>

          <View style={style.imgView}>
            <AspectImage src={require('../../../assets/signup.png')} height={250} />
          </View>

          <ViewModel showModal={showModal}>
          <Animated.View style={[style.imgView, {
                  position: 'absolute',
                  transform: [{ translateY }]
                }]}>
                  <AspectImage src={require('../../../assets/signup.png')} height={250} />
                </Animated.View>
                <View style={{ width: 100, height: 100, position: 'absolute', top: 5, right: -50 }}>
                  <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                    <AspectImage src={require('../../../assets/white_cross.png')} height={40} />
                  </TouchableOpacity>
                </View>
                <AspectImage src={require('../../../assets/L&co_logo_white.png')} height={100} />
                <View>

                  <Animated.View style={{

                    opacity: fadeAnim,         // Bind opacity to animated value
                  }}>
                    <View style={{ marginVertical: 20 }}></View>
                    <BodyText><Text style={{ color: '#fff', fontSize: 15, }}>We have received your application and we will contact you shortly!</Text></BodyText>
                    <View style={{ marginVertical: 10 }}></View>
                    <BodyText><Text style={{ color: '#fff', fontSize: 15 }}>Thanks for your patience</Text></BodyText>
                  </Animated.View>

                </View>

          </ViewModel>


          

          <View style={style.mainContainer}>
            <View style={{ width: '100%', height: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: '#ffffff' }}>
              <View style={{ marginVertical: '3%' }}></View>
              <BoldText>Let's get you signed up</BoldText>
              <View style={{ marginVertical: '1%' }}></View>
              <View style={{ height: '80%', width: '100%', borderRadius: 25, backgroundColor: '#ffffff' }}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                  {/* <DropDown Language={Language} selectedLanguageTaught={selectedLanguageTaught} onMultiSelect={onmultiselected('languageTaught')} onTapClose={onmultiselected('languageTaught')}/> */}
                  <FormInput placeholder="Email" keyboardType='email-address'  onchange={(txtEmail) => setTxtEmail(txtEmail)} returnKeyType='next'/>
                  <FormInput placeholder="Password" obscure={true} onchange={(txtEmail) => setTxtPassword(txtEmail)} returnKeyType='next'/>
                  <FormInput placeholder="First Name" onchange={(txtEmail) => setTxtFirsttName(txtEmail)} returnKeyType='next'/>
                  <FormInput placeholder="Last Name" onchange={(txtEmail) => setTxtLastName(txtEmail)} returnKeyType='next'/>
                  <FormInput placeholder="Contact Number" keyboardType={'numeric'} onchange={(txtEmail) => setTxtNumber(txtEmail)} returnKeyType='next'/>
                  {
                    role == 'Teacher' ?
                      <View>
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            inputFilterContainerStyle={{ backgroundColor: 'red' }}
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="Languages Taught"
                            options={Language}
                            selectedValues={selectedLanguageTaught}
                            containerStyle={{ alignItems: 'center' }}
                            onMultiSelect={onmultiselected('languageTaught')}
                            onTapClose={onmultiselected('languageTaught')}
                            isMulti
                          />
                        </View>
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            containerStyle={{ alignItems: 'center' }}
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="Language(s) Spoken"
                            options={Language}
                            selectedValues={selectedLanguageSpoken}
                            onMultiSelect={onmultiselected('languageSpoken')}
                            onTapClose={onmultiselected('languageSpoken')}
                            isMulti
                          />
                        </View>
                        <FormInput placeholder="Teaching Qualifications" onchange={(txtqualification) => settxtqualification(txtqualification)} />
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="Levels Taught"
                            options={LanguageTaught}
                            containerStyle={{ alignItems: 'center' }}
                            value={selectedLevels}
                            onChange={onChange('LevelsTaught')}
                          />
                        </View>
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="English"
                            options={English}
                            containerStyle={{ alignItems: 'center' }}
                            value={selectedEnglish}
                            onChange={onChange('English')}
                          />
                        </View>
                        <FormInput placeholder="Experience in years" onchange={(Experience) => setExperience(Experience)} returnKeyType='next'/>
                        <FormInput placeholder="Fee Charged?" onchange={(feesCharged) => setfeesCharged(feesCharged)} returnKeyType='next'/>
                        {/* <FormInput placeholder="Website Name (if yes)" onchange={(websiteURL) => setWebsiteURL(websiteURL)} returnKeyType='next'/> */}
                        {/* <FormInput placeholder="Other Agencies/schools you work for" onchange={(otherAgency) => setOtherAgency(otherAgency)} returnKeyType='next'/> */}
                        {/* <FormInput placeholder="Testimonial (at least 3)" onchange={(testimonial) => setTxtPassword(testimonial)} returnKeyType='next'/> */}
                        <View style={style.txtinputUpload}>
                          <TextInput placeholder="CV" value={filename} placeholderTextColor="#999" editable={false} style={style.txtinput}></TextInput>
                          <TouchableOpacity style={style.btnUpload} onPress={() => btnupload()}><Text style={{ color: "#999" }}>Add File</Text></TouchableOpacity>
                        </View>
                        {/* <View style={style.txtinputUpload}>
                          <TextInput placeholder="Profile Picture" value={profileImg} editable={false} placeholderTextColor="#999" style={style.txtinput}></TextInput>
                          <TouchableOpacity style={style.btnUpload} onPress={() => btnimgUpload()}><Text style={{ color: "#999" }}>Add File</Text></TouchableOpacity>
                        </View> */}
                      </View>
                      :
                      <View>
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="Reason for studying the languages"
                            options={Reason}
                            selectedValues={selectedReason}
                            onMultiSelect={onmultiselected('reason')}
                            onTapClose={onmultiselected('reason')}
                            isMulti
                            containerStyle={{ alignItems: 'center' }}
                          />
                        </View>
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="Age group of client"
                            options={Age}
                            value={selectedAge}
                            onChange={onChange('age')}
                            containerStyle={{ alignItems: 'center' }}
                          />
                        </View>
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="Frequency of Lessons Required"
                            options={Frequency}
                            value={selectedFrequency}
                            onChange={onChange('frequency')}
                            containerStyle={{ alignItems: 'center' }}
                          />
                        </View>
                        <View style={style.txtinputUpload}>
                          <SelectBox
                            listOptionProps={{ nestedScrollEnabled: true }}
                            label=""
                            labelStyle={{ height: 0 }}
                            arrowIconColor="black"
                            searchIconColor="black"
                            toggleIconColor="black"
                            hideInputFilter
                            multiOptionContainerStyle={{ backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2 }}
                            optionsLabelStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputFilterStyle={{ fontFamily: 'Poppins-regular', color: '#000000', }}
                            inputPlaceholder="Language(s) you would like to study"
                            options={Language}
                            selectedValues={selectedLanguage}
                            onMultiSelect={onmultiselected('language')}
                            onTapClose={onmultiselected('language')}
                            isMulti
                            containerStyle={{ alignItems: 'center' }}
                          />
                        </View>
                      </View>
                  }
                  <View style={{ marginVertical: '3%' }}></View>
                  <TextButton children={'Submit'} onPress={btnSignup} />

                </ScrollView>

              </View>

            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    width: width / 1.2,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  imgView: {
    width: '100%',
    alignSelf: 'center',
  },
  mainContainer: {
    backgroundColor: '#ffffff',
    width: width,
    height: undefined,
    position: 'absolute',
    borderRadius: 25,
    bottom: 0,
    top: 210,
    //android specific
    elevation: 10,
    //ios specific
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginTop: 2,
    shadowColor: '#000',
  },
  txtinputUpload: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    height: undefined,
    padding: 12,
    width: '92%',
    shadowColor: '#000',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
    // justifyContent: 'flex-end',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    //android specific
    elevation: 5,
    //ios specific
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    marginVertical: 10,
  },

  txtinput: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    width: '65%'
  },
  btnUpload: {
    borderColor: '#999',
    borderWidth: 2,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },



  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6F989E',
    padding: 40,

  },

});
export default Signup