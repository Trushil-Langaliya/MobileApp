import React, { } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Text, Dimensions, Alert } from 'react-native';
import { List } from '../../components/list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Btn, CustomImg, TextBold, TextRegular } from '../../components/CommanComponents';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import commanStyles from '../../../styles/commanStyles';

//Main Function
const Checkin = ({ navigation }) => {


  const checkInSteps = [
    {
      id: '1',
      title: 'STEP 1',
      subtitle: 'Mesuare your progress',
      image: require("../../../../assets/graph.png"),
    },
    {
      id: '2',
      title: 'STEP 2',
      subtitle: 'Tell us how you feel',
      image: require("../../../../assets/data.png"),
    },
    {
      id: '3',
      title: 'STEP 3',
      subtitle: 'Reflect on next steps',
      image: require("../../../../assets/reflextion.png"),
    },
  ];

  const Next = () => {
    navigation.navigate('CheckInSteps')
  }

  //design of recent plans & objectives
  const Item = ({ title, image, subtitle }) => (
    <View style={{ height: height / 6, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <View style={[styles.item, { backgroundColor: '#E6E9F1', width: '100%', height: '80%', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}>
        <View style={{ flexDirection: 'column', marginLeft: height / 30 }}>
          <TextBold children={title} size={height / 40} />
          <View style={{ alignSelf: 'flex-start' }}>
            <TextRegular children={subtitle} size={height / 45} />
          </View>
        </View>
        <View style={{ marginLeft: height / 40, position: 'absolute', right: 15, justifyContent: 'center', height: '80%' }}>
          <CustomImg src={image} height="100%" width={height / 8} borderRadius={height / 10} resizeMode="cover" />
        </View>
      </View>
    </View>
  );

  const Steps = ({ item }) => (
    <Item title={item.title} image={item.image} subtitle={item.subtitle} />
  );

  //Return  View
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={[commanStyles.mainView, { backgroundColor: 'white' }]}>
        <ScrollView>
          <View style={{ alignItems: 'center', width: '95%', alignSelf: 'center' }}>

            {/* Check In title */}
            <View style={styles.viewCheckin}>
              <TextBold children="Check in" size={height / 30} />
            </View>

            {/* Msg Box View */}
            <View style={styles.viewMsgbox}>
              <View style={styles.subViewMsgbox}>
                <View style={styles.sub2ViewMsgbox}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextBold children="Maria," size={height / 55} />
                    <TextRegular children="You smashed the month of July" size={height / 55} textAlign="left" />
                  </View>
                  <TextRegular children="Beginner Course A1/A2" size={height / 55} textAlign="left" />
                  <View style={{ marginVertical: 10 }} />
                  <TextRegular children="Now, you can check-in. it only takes 10 minutes. And once you're done you're onto your next month." size={height / 55} textAlign="left" />
                </View>
              </View>
            </View>

            {/* Check in girl Image */}
            <View style={{ marginVertical: 10 }} />
            <View style={{ height: height / 3, width: '100%', backgroundColor: '#1B45AF', borderRadius: 30 }}>
              <CustomImg src={require('../../../../assets/checkin_girl.png')} width="100%" height="100%" resizeMode="cover" radius={30} />
            </View>

            {/* Title for 3 Steps */}
            <View style={{ marginVertical: 15 }} />
            <TextBold children="3 Steps to check-in!" size={height / 40} />

            {/* view for 3 Steps */}
            <View style={{ marginVertical: 10 }} />
            <View style={{ height: height / 1.9, width: '100%' }}>
              <List data={checkInSteps} renderItem={Steps} />
            </View>

            <View style={{ height: height / 4, width: '100%', backgroundColor: '#1B45AF', borderRadius: 30 }}>
              <View style={{ height: '95%', width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
                <TextBold children="Check-in time is a great opportunity for self-reflection- as well as to see your progress and celebrate it." size={height / 40} color="#fff" textAlign="center" />
              </View>
            </View>

          </View>

        </ScrollView>
        <View style={{ position: 'absolute', right: 25, bottom: 0, height: 60, width: 60, borderRadius: 30, }}>
          <Btn height='100%' width='100%' radius={30} color='#1B45AF' onPress={Next} >
            <FontAwesomeIcon icon={faAngleRight} size={25} color="#fff" />
          </Btn>
        </View>
      </View>

    </SafeAreaView>

  );
};

// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  viewCheckin: {
    height: height / 16,
    width: '80%',
    alignSelf: 'center'
  },

  viewMsgbox: {
    height: height / 5,
    width: '100%',
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    justifyContent: 'center',
  },
  subViewMsgbox: {
    height: '90%',
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  sub2ViewMsgbox: {
    height: '90%',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 15,
  }

});

export default Checkin