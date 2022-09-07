/**
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type {Node} from 'react';
 import {View, Image} from 'react-native';
 
 const AspectImage = ({src, height}): Node => {
   const styles = {
     imgStyle: {
       width: '100%',
       height: height,
       resizeMode: 'contain',
       
     },
     viewStyle: {
       width: '100%',
     },
   };
   return (
     <View style={styles.viewStyle}>
       <Image style={styles.imgStyle} source={src} />
     </View>
   );
 };
 
 export default AspectImage;
 