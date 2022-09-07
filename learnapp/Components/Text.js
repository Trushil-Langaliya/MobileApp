import React from 'react';
import {Text,Dimensions} from 'react-native';
//Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = {
  bodyText: {
    fontSize: height/55,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
  },
  titleText: {
    fontSize: height/35,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
  },
  subtitleText: {
    fontSize: height/55,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
  },
  highlight: {
    fontWeight: '700',
  },

  boldText: {
    fontSize: 22,
    // fontFamily: "Riveruta Bold",
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000'
  },
  

};

const BodyText = ({children}) => {
  return <Text style={styles.bodyText}>{children}</Text>;
};

const TitleText = ({children}) => {
  return <Text style={styles.titleText}>{children}</Text>;
};

const SubtitleText = ({children}) => {
  return <Text style={styles.subtitleText}>{children}</Text>;
};

const BoldText = ({children}) => {
  return <Text style={styles.boldText}>{children}</Text>;
};

export {BodyText, TitleText, SubtitleText,BoldText};
