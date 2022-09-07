import React, { useState } from 'react';
import { View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'


const DropDown = (Language, selectedLanguageTaught,onMultiSelect,onTapClose) => {
  console.log("Language is ::", Language)
  console.log("selectedLanguageTaught is ::", selectedLanguageTaught) 
  console.log("onMultiSelect is ::", onMultiSelect)
  const styles = {
    txtinputUpload: {
      flexDirection: 'row',
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
  };
  return (
    <View style={styles.txtinputUpload}>
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
        onMultiSelect={onMultiSelect}
        onTapClose={onTapClose}
        isMulti
      />
    </View>
  );
}

export default DropDown;