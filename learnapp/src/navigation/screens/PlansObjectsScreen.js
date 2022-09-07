import React, { Component, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TitleText } from '../../../Components/Text';
import * as Store from '../components/auth/Store';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { List } from '../components/list';
import { COLORS } from '../../styles/color';
import { GeneralView, BtnSetting ,Notification, CustomImg, TextBold, TextRegular, Btn} from '../components/CommanComponents';


//Main Function
const PlansObjectivesScreen = ({ navigation }) => {

  //variables
  const [mydata, setmydata] = useState('');       //set saved userdata

  // View will appear
  useEffect(() => {
    setTimeout(async () => {
      var userData = await Store.getData(Store.userData)
      setmydata(userData)
    })
  }, [])

  //Flat list for recent plans & objectives
  const DATA = [
    {
      id: '1',
      title: 'Trushil Langaliya',
      image: require("../../../assets/flag1.png"),
      date: '01/01/2021'
    },
    {
      id: '2',
      title: 'Trushil Langaliya',
      image: require("../../../assets/flag3.png"),
      date: '01/01/2021'
    },
  ];

  //design of recent plans & objectives
  const Item = ({ title, image, date }) => (
    <View style={{ height: height / 10, width: width, justifyContent: 'center', alignItems: 'center' }}>
      <View style={[styles.item, { backgroundColor: '#ffffff', width: '90%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
        <View style={{marginLeft:height/40}}>
          <CustomImg src={image}  height={height / 20} width={height / 20} borderRadius={height / 10}/>
        </View>
        
       
        <View style={{ flexDirection: 'column',marginLeft:height/30 }}>
          <TextBold children={title} size={height/50}/>
          <View style={{alignSelf:'flex-start'}}>
            <TextRegular children={date} color='darkgrey'/>
          </View>
        </View>

        <View style={{position:'absolute', right:10}}>
          <FontAwesomeIcon icon={faAngleRight} />
        </View>
        
      </View>
    </View>
  );
  const plansObjectives = ({ item }) => (
    <Item title={item.title} image={item.image} date={item.date} />
  );


//Flat list for your recent plans & objectives
  const PandODATA = [
    {
      id: '1',
      title: 'P&O',
      date: '01/01/2021',
      image: require("../../../assets/flag1.png"),
    },
    {
      id: '2',
      title: 'P&O',
      date: '01/01/2021',
      image: require("../../../assets/flag3.png"),
    },
    {
      id: '3',
      title: 'P&O',
      date: '01/01/2021',
      image: require("../../../assets/flag2.png"),
    },
    {
      id: '4',
      title: 'P&O',
      date: '01/01/2021',
      image: require("../../../assets/flag1.png"),
    },
    {
      id: '5',
      title: 'P&O',
      date: '01/01/2021',
      image: require("../../../assets/flag2.png"),
    },
  ];


 //design of your recent plans & objectives
  const Item1 = ({ title, image, date }) => (
    <View style={{ height: height / 5.5, width: width / 2.5, justifyContent: 'center', alignItems: 'center', }}>
      <View style={[styles.item, { backgroundColor: 'white', height: '90%', width: width / 2.8, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }]}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ marginVertical: 5 }}></View>
        <Text style={[styles.subTitle, { color: 'darkgrey' }]}>{date}</Text>
        <View style={{ marginVertical: 5 }}></View>
        <View style={styles.userIconView}>
          <Image
            source={image}
            style={{ height: '100%', width: '100%', borderRadius: 35 }}
          />
        </View>
      </View>
    </View>
  );
  const PandO = ({ item }) => (
    <Item1 title={item.title} image={item.image} date={item.date} />
  );


  //Return  View
  return (
    <GeneralView>

        {/* Top Bar */}
          <View style={styles.viewTitle}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 40, width: 40 }} onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </TouchableOpacity>
            <TextBold children='P & O' size={height/30}/>
          </View>

        {/* User Details View */}
        <View style={{width: '100%', height: height / 6, alignItems:'center'}}>
          {
            mydata.role == 'client' ?
                <View style={styles.clientsDetailsFirstView}>
                  <View style={styles.TeacherDetails1}>

                  <View style={[ { marginLeft: 20 }]}>
                  <CustomImg src={{ uri: `${mydata.userImage}` }} height={ height / 10} width={ height / 10} radius={height/5} borderColor='#fff' borderWidth={2}/>
                  
                  </View>
                  <View style={[ { marginLeft: height / 20 }]}>
                    <Text style={[styles.txtbasicDetails1, { fontSize: height / 45}]}>{mydata.firstName + " " + mydata.lastName}</Text>
                    <Text style={[styles.txtbasicDetails2, { fontSize: height / 60 }]}>02/01/2020</Text>
                  </View>
                  <TouchableOpacity style={styles.btnSettings}>
                    <BtnSetting tintClr='#fff'/>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View style={styles.TeacherDetailsFirstView}>
                <View style={[styles.TeacherDetails1, { backgroundColor:  mydata.role == 'Admin' ? COLORS.Admin : '#081825', }]}>
                  <View style={{ marginLeft: height/90}}> 
                    <CustomImg src={{ uri: `${mydata.userImage}` }} height={ height / 12} width={ height / 12} radius={height/6} borderColor='#fff' borderWidth={2}/>
                  </View>
                  <View style={[ { marginLeft: height / 20 }]}>
                    <TextBold children={mydata.firstName + " " +  mydata.lastName} size={height / 45} color='#fff'/>
                    <View style={{ marginVertical: 5 }} />
                    <TextRegular  children='02/01/2020' size={height / 60} color='lightgrey'/>
                  </View>
                </View>
                <View style={{ marginVertical: 5 }} />

                <Btn children='+' color={mydata.role == 'Admin' ? COLORS.Admin : COLORS.lightgreen} height={height/20} width={height/12} radius={height/90} txtClr='#fff' txtSize={height/25}/>
              


                <TouchableOpacity style={[styles.btnEdit,{backgroundColor:  mydata.role == 'Admin' ? '#ffffff' : COLORS.lightgreen}]}>
                <Image style={{ height:'60%', width:'60%', justifyContent:'center',alignSelf:'center', tintColor:  mydata.role == 'Admin' ? COLORS.Admin :'#ffffff' }} source={require('../../../assets/edit.png')} />
                  </TouchableOpacity>
              </View>
          }
        </View>


        <View style={{ marginVertical: 15 }}></View>
        <View style={styles.ListMainView}>
          <View style={styles.txtTitleView}>
            <Text style={[styles.txtbasicDetails1, { color: 'black', width: '100%', }]}>Recent Plans & Objectives</Text>
          </View>
          <List data={DATA} renderItem={plansObjectives} />
        </View>
        <View style={{ marginVertical: 10 }}></View>
        <View style={styles.ListMainView}>
          <View style={[styles.txtTitleView,{flexDirection: 'row' }]}>
            <Text style={[styles.txtbasicDetails1, { color: 'black', }]}>Your Plans & Objectives</Text>
            <TouchableOpacity style={styles.btnFilter}>
              <Image
                source={require('../../../assets/filter.png')}
                style={{ height: '80%', width: '80%', tintColor: 'white', }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <List data={PandODATA} renderItem={PandO} direction={true} />

        </View>
        <View style={{height:undefined, width:undefined,position:'absolute', top:10,right:20}}>
          <Notification  role={mydata.role} />
        </View>

    </GeneralView>
  );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  viewTitle: {
    width: '90%',
    height: height / 12,
    alignItems: 'center',
    flexDirection: 'row',
  },

 //Client View
  clientsDetailsFirstView: {
    height:'100%',
    width: '90%',
    backgroundColor: '#081825',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
 
  clientsDetailsImg: {
    height: height / 10,
    width: height / 10,
    borderRadius: height / 5,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'white',
    
  },

  clientsDetailsDetails2: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    marginLeft: 20
  },


  //Teacher View
  TeacherDetailsFirstView: {
    height: height/8,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
  },
  TeacherDetails1: {
    height:'100%',
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  TeacherDetailsImg: {
    height: height / 12,
    width: height / 12,
    borderRadius: height / 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 20
  },
  
  txtbasicDetails1: {
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: height / 40,
  
  },
  txtbasicDetails2: {
    color: 'grey',
    fontFamily: 'Poppins-Regular',
    fontSize: height / 60,
  },
  ListMainView:{
    alignItems: 'center', 
    width: '100%', 
    height: height / 4, 
  },
  txtTitleView :{
    width: '90%', 
    height: height / 20, 
    justifyContent: 'flex-start',
    
  },
  btnFilter:{
    height: height / 30, 
    width: height / 30, 
    borderRadius: height / 90, 
    backgroundColor: COLORS.menuClr, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 20 
  },
  
  title: {
    color: 'black',
    fontSize: height / 50,
    fontFamily: 'Poppins-SemiBold',
    width:'80%',
    textAlign:'center'
  },
  subTitle: {
    color: 'black',
    fontSize: height / 80,
    fontFamily: 'Poppins-regular',

  },
  userIconView: {
    height: height / 20,
    width: height / 20,
    borderRadius: height / 10,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userIcon: {
    height: 30,
    width: 30,
  },
  btnSettings: {
    marginLeft: 15,
    position: 'absolute', 
    top: 20,
    right: 10,
  },
  btnEdit: {
    marginLeft: 15,
    position: 'absolute', 
    top: 20,
    right: 10,
    borderRadius: 20,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    alignContent:'center',
    height: height/40,
    width: height/40
  },
});

export default PlansObjectivesScreen