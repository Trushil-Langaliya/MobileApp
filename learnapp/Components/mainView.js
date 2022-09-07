import React from 'react';
import type {Node} from 'react';
import {View} from 'react-native';
import { color } from 'react-native-reanimated';

const MainView = ({width, height, color}): Node => {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const styles = {
        ViewStyle:{
            height: height,
            width: width,
            // backgroundColor: '#6ED4C8',
        },
        container: {
           flexDirection: 'row',
           alignItems:'flex-end',
           height: height,
           width:width/1.4,
           alignSelf:'center',
        //    backgroundColor: 'red',
           justifyContent:'center',
        },
    };
  return (
    <View style={styles.viewStyle}>
        <View style={styles.container}></View>
    </View>
  );
};

export default MainView;