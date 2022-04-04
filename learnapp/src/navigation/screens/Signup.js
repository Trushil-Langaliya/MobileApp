//packages
import React, { useState ,useRef, useCallback, useEffect} from 'react';
import { Component } from 'react';  
import {StyleSheet, Dimensions, View, SafeAreaView, StatusBar,ScrollView,Text,TouchableOpacity,LogBox,KeyboardAvoidingView,TextInput} from 'react-native';
import AspectImage from '../../../Components/AspectImage';
import styles from '../../styles/styles';
import FormInput from '../../../Components/FormInput';
import {BodyText, BoldText, SubtitleText, TitleText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';
import DocumentPicker, { types } from 'react-native-document-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from "@react-navigation/native";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import DropDown from '../components/DropDown';
import AlertDiolog from '../components/auth/AlertDiolog';
import Api from '../components/auth/Api';

LogBox.ignoreAllLogs(true)  // hide warnings

//Main Function
const Signup = ({route, navigation}) => {

    //variables
    const [txtFirstName, setTxtFirsttName] = useState('');
    const [txtLastName, setTxtLastName] = useState('');
    const [txtNumber, setTxtNumber] = useState('');
    const [txtEmail, setTxtEmail] = useState('');
    const [txtPassword, setTxtPassword] = useState('');

    const [filename,setfilename] = useState('');
    const [profileImg,setprofileImg] = useState('');
    const { role } = route.params;

    // const isFocused = useIsFocused();

    // useEffect(() => { if(isFocused){       
    //   console.log("role is:",role)
    // }   
    // }, [ isFocused]);


    //DropDown
    const [selectedReason, setSelectedReason] = useState([])
    const [selectedLanguage, setSelecteLanguage] = useState([])
    const [selectedFrequency, setSelectedFrequency] = useState([])
    const [selectedAge, setSelectedAge] = useState([])

    
    
    function onmultiselected(text) {
      if (text == 'reason'){
        return (item) => setSelectedReason(xorBy(selectedReason, [item], 'id'))
      }else if(text == 'language'){
        return (item) => setSelecteLanguage(xorBy(selectedLanguage , [item], 'id'))
      }
        
    }
    
    function onChange(text) {
      if (text == 'age'){
        return (val) => setSelectedAge(val)
      }else if(text == 'frequency'){
        return (val) => setSelectedFrequency(val)
      }
        
    }

    const Reason = [
      {item: 'Interest in the Language(s)',id: '1',},
      {item: 'Personal Development',id: '2',},
      {item: 'Communicate with your partner and family',id: '3',},
      {item: 'Part of Corporate Package',id: '4',},
      {item: 'Other (selecting this should enable a textbox for the user to input their reason)',id: '5',},
    ]
    
    const Age = [
      {item: '18 - 23',id: '1',},
      {item: '24 - 29',id: '2',},
      {item: '30 - 39',id: '3',},
      {item: '40 - 49',id: '4',},
      {item: '50 - 59',id: '5',},
      {item: '60+',id: '6',},
    ]

    const Frequency = [
      {item: '1 hour per week',id: '1',},
      {item: '1.5 hours per week',id: '2',},
      {item: '2 hours per week',id: '3',},
      {item: '3 hours per week',id: '4',},
      {item: 'Personal Tailored Package/Other',id: '5',},
    ]

    const Language = [
      {item: 'French',id: '1',},
      {item: 'Spanish',id: '2',},
      {item: 'German',id: '3',},
      {item: 'English',id: '4',},
      {item: 'Italian',id: '5',},
      {item: 'Portuguese',id: '6',},
      {item: 'Japanese',id: '7',},
      {item: 'Mandarin',id: '8',},
      {item: 'Russian',id: '9',},
      {item: 'Arabic',id: '10',},
      {item: 'Other',id: '11',},
    ]

    // const [value, setValue] = useState(null);

    // const renderItem = (item: any) => {
    //   return (
    //     <View style={styles.item}>
    //       <Text style={styles.textItem}>{item.label}</Text>
    //       {item.value === value && (
    //         <AntDesign
    //           style={styles.icon}
    //           color="black"
    //           name="Safety"
    //           size={20}
    //         />
    //       )}
    //     </View>
    //   );
    //       }



    // const btnupload = useCallback(async () => {
    //   try {
    //     const response = await DocumentPicker.pick({
    //       presentationStyle: 'fullScreen',
    //       type: [types.pdf],
    //     });
    //     setfilename(response[0].name);
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }, []);
  
    
  
    
    // const btnimgUpload = useCallback(async () => {
    //   try {
    //     const response = await DocumentPicker.pick({
    //       presentationStyle: 'fullScreen',
    //       type: [types.images],
    //     });
    //     setprofileImg(response[0].name);
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }, []);

   
   //Signin Action
   const btnSignup = () => {

    const EmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    //   loginValidation(txtEmail, txtPassword);
    if (txtFirstName.trim().length == 0){
      AlertDiolog("The first name field is required.");
    }else if (txtLastName.trim().length == 0) {
        AlertDiolog("The Last name field is required.");
    }else if (txtNumber.trim().length < 9){
        AlertDiolog("The contact number field is required.");
    }else if (txtEmail.trim().length == 0){
      AlertDiolog("The email field is required.");
    }else if (EmailValidation.test(txtEmail) == false) {
        AlertDiolog("The email field must be a valid email.");
    }else if (txtPassword.trim().length < 7){
        AlertDiolog("The password field must be at least 8 characters.");
    }else if (selectedReason.length == 0){
      AlertDiolog("Please select reason for studying the languages");
    }else if (selectedAge.length == 0){
      AlertDiolog("Please select age group of client");
    }else if (selectedFrequency.length == 0){
      AlertDiolog("Please select frequency of Lessons Required");
    }else if (selectedLanguage.length == 0){
      AlertDiolog("Please Language(s) you would like to study");
    }else{
      var reasonArray = [];
      for (var i=0;i<selectedReason.length;i++){
        console.log("data is ::",)
        reasonArray.push(selectedReason[i].item)
      }
      var LanguageArray = [];
      for (var j=0;j<selectedLanguage.length;j++){
        LanguageArray.push(selectedLanguage[j].item)
      }
     
     
        const userdata = {
            "firstName": txtEmail,
            "lastName": txtLastName,
            "email" : txtEmail,
            "contactNumber" : txtNumber,
            "age": selectedAge.item,
            "studying-reason": reasonArray.toString(),
            "lesson-frequency": selectedFrequency.item,
            "language": LanguageArray.toString(),
            "password": txtPassword
        }

        
        console.log("user is ::",userdata)
       
        //console.log("data is ::",selectedReason.item[0].item)
        var a = Api(apiName='client', data=userdata, method='POST');
        a.then((result) =>setdata(result))
    }
  }  
    setdata = (result) => {
      if (result.success == false){
          AlertDiolog(`${result.data.msg}`)
      }else{
          AlertDiolog(`${result.data.msg}`)
      }
  }
    //Return  View
    return(
      <SafeAreaView style={{flex: 1,backgroundColor: '#ffffff'}} >
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 'height'} 
      style={style.container}
      >
      {/* <StatusBar barStyle={'dark-content'} backgroundColor="transparent" />  */}
      <View style={{backgroundColor: '#ffffff', width: '100%', height: '100%', alignItems: 'center'}}>
        <View style = {style.imgView}>
            <AspectImage src={require('../../../assets/signup.png')} height={250} />
        </View>
        
        <View style = {style.mainContainer}>
          <View style = {{width: '100%', height: '100%',borderTopLeftRadius: 25, borderTopRightRadius:25, backgroundColor: '#ffffff'}}>
            <View style={{marginVertical: '3%'}}></View>
            <BoldText>Lets get you signed up</BoldText>
            <View style={{marginVertical: '1%'}}></View>
            <View style={{height: '75%', width: '100%',borderRadius: 25,backgroundColor: '#ffffff'}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" nestedScrollEnabled = {true}>

            <FormInput placeholder="First Name"  onchange={(txtEmail) => setTxtFirsttName(txtEmail)}/>
            <FormInput placeholder="Last Name" onchange={(txtEmail) => setTxtLastName(txtEmail)}/>
            <FormInput placeholder="Contact Number"  onchange={(txtEmail) => setTxtNumber(txtEmail)}/>
            <FormInput placeholder="Email" onchange={(txtEmail) => setTxtEmail(txtEmail)}/>
            <FormInput placeholder="Password"  onchange={(txtEmail) => setTxtPassword(txtEmail)}/>
            {
                  role == 'Teacher' ? 
                    <View>
                        <FormInput placeholder="Level Taught" onchange={(txtEmail) => setEmail(txtEmail)}/>
                        <FormInput placeholder="Languages Taught" onchange={(txtEmail) => setEmail(txtEmail)}/>
                        <FormInput placeholder="Languages Spoken" onchange={(txtEmail) => setEmail(txtEmail)}/>
                        <FormInput placeholder="English Level" onchange={(txtEmail) => setEmail(txtEmail)}/>
                        <FormInput placeholder="Experience in years" onchange={(txtEmail) => setEmail(txtEmail)}/>
                        <FormInput placeholder="Teaching Qualification" onchange={(txtEmail) => setEmail(txtEmail)}/>
                    </View>
                   
                   : 
                   <View>
                      <View style={style.txtinputUpload}>
                      <SelectBox
                          listOptionProps={{ nestedScrollEnabled: true }}
                          label=""
                          labelStyle={{height:0}}
                          arrowIconColor="black"
                          searchIconColor="black"
                          toggleIconColor="black"
                          hideInputFilter
                          multiOptionContainerStyle={{  backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2}}
                          optionsLabelStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputFilterStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputPlaceholder="Reason for studying the languages"
                          options={Reason}
                          selectedValues={selectedReason}
                          onMultiSelect={onmultiselected('reason')}
                          onTapClose={onmultiselected('reason')}
                          isMulti
                        />
                      </View>
                      <View style={style.txtinputUpload}>
                      <SelectBox
                          listOptionProps={{ nestedScrollEnabled: true }}
                          label=""
                          labelStyle={{height:0}}
                          arrowIconColor="black"
                          searchIconColor="black"
                          toggleIconColor="black"
                          hideInputFilter
                          multiOptionContainerStyle={{  backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2}}
                          optionsLabelStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputFilterStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputPlaceholder="Age group of client"
                          options={Age}
                          value={selectedAge}
                          onChange={onChange('age')}
                          
                        />
                      </View>
                      <View style={style.txtinputUpload}>
                      <SelectBox
                          listOptionProps={{ nestedScrollEnabled: true }}
                          label=""
                          labelStyle={{height:0}}
                          arrowIconColor="black"
                          searchIconColor="black"
                          toggleIconColor="black"
                          hideInputFilter
                          multiOptionContainerStyle={{  backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2}}
                          optionsLabelStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputFilterStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputPlaceholder="Frequency of Lessons Required"
                          options={Frequency}
                          value={selectedFrequency}
                          onChange={onChange('frequency')}
                        />
                      </View>
                      <View style={style.txtinputUpload}>
                      <SelectBox
                          listOptionProps={{ nestedScrollEnabled: true }}
                          label=""
                          labelStyle={{height:0}}
                          arrowIconColor="black"
                          searchIconColor="black"
                          toggleIconColor="black"
                          hideInputFilter
                          multiOptionContainerStyle={{  backgroundColor: '#6F989E', borderColor: '#ffffff', borderWidth: 2}}
                          optionsLabelStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputFilterStyle={{fontFamily: 'Poppins-regular', color: '#000000',}}
                          inputPlaceholder="Language(s) you would like to study"
                          options={Language}
                          selectedValues={selectedLanguage}
                          onMultiSelect={onmultiselected('language')}
                          onTapClose={onmultiselected('language')}
                          isMulti
                        />
                      </View>
                   </View>
            }

              
              {/* 
              <View style={style.txtinputUpload}>
                  <TextInput placeholder="CV" value={filename} placeholderTextColor="#999" editable={false} style={style.txtinput}></TextInput>
                  <TouchableOpacity style={style.btnUpload} onPress={() => btnupload()}><Text style={{color:"#999"}}>Add File</Text></TouchableOpacity>
              </View>
              <View style={style.txtinputUpload}>
                  <TextInput placeholder="Profile Picture" value={profileImg} editable={false} placeholderTextColor="#999" style={style.txtinput}></TextInput>
                  <TouchableOpacity style={style.btnUpload} onPress={() => btnimgUpload()}><Text style={{color:"#999"}}>Add File</Text></TouchableOpacity>
              </View>           */}
             </ScrollView> 

            </View>
            
          </View>
        </View>     
        
      </View>
      <View style={{position: 'absolute', bottom: 0,width:'100%',justifyContent:'flex-end',alignSelf: 'flex-end'}}>
          {/* <TextButton borderRadius={10} bgColour={'#6F989E'}  email={txtEmail} password={txtPassword}>
              <Text style={{color: "#fff", fontSize: 20}}>Submit</Text>
          </TextButton> */}
      <TouchableOpacity style={{backgroundColor:'rgba(51, 110, 145,1.0)',borderWidth: 1,
          borderColor: '#fff',
          alignSelf: 'center',
          width: width/2,
          height: height/15,
          justifyContent: 'center', 
          borderRadius:10}} 
          onPress={() => btnSignup()} >
        <Text style={{color: '#fff',textAlign:'center', fontSize: 20, fontFamily: 'Poppins-SemiBold',}}> Submit</Text>
      </TouchableOpacity>
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
    flex:1,
    flexDirection: 'row',
    alignItems:'flex-end',
    height: '100%',
    width:width/1.2,
    alignSelf:'center',
   backgroundColor: '#ffffff',
    justifyContent:'center',
    
 },


    imgView:{
        width: '100%',
        alignSelf:'center',
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
  
    txtinputUpload:{
      flexDirection:'row',   
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      height: undefined,
      padding: 16,
      width: '90%',
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
    btnUpload:{
      borderColor: '#999', 
      borderWidth: 2, 
      width: 100, 
      height: 30, 
      alignItems: 'center', 
      justifyContent:'center', 
      borderRadius: 20
    },
    txtinput:{
      height: 60,
      width: '60%',
      fontFamily: 'Poppins-SemiBold',
      color:'black'
    },
    

    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

    
  });
export default Signup