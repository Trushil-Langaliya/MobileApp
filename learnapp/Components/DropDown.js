/**
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type {Node} from 'react';
 import {View, Image} from 'react-native';
 import { Dropdown } from 'react-native-element-dropdown';
 import AntDesign from 'react-native-vector-icons/AntDesign';
 
 const DropDowns = ({src, height}): Node => {
   const styles = {
        dropdown: {
            margin: 16,
            height: 50,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
        },
        icon: {
            marginRight: 5,
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
    };
   return (
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
        setValue(item.value);
        }}
        renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
    />
   );
 };
 
 export default DropDowns;
 