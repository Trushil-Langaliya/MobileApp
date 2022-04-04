import React,{useState} from 'react';
import {View} from 'react-native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'


const DropDown = (Reason) => {

    
    const Reasons = [
        {item: 'Interest in the Language(s)',id: '1',},
        {item: 'Personal Development',id: '2',},
        {item: 'Communicate with your partner and family',id: '3',},
        {item: 'Part of Corporate Package',id: '4',},
        {item: 'Other (selecting this should enable a textbox for the user to input their reason)',id: '5',},
      ]
    const styles = {
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
      };
  return (
    <View style={styles.txtinputUpload}>
        <SelectBox
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
            isMulti                
            selectedValues={Reason}
        />
    </View>
  );
}

export default DropDown;