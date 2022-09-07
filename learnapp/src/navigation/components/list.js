import React from 'react';
import { StyleSheet, Dimensions, View, Text, FlatList,Image } from 'react-native';
// Styles
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = {
    
};

const List = ({ data, renderItem, direction,onRefresh }) => {
    
    return (
        <View>
            <FlatList
                horizontal={direction}
                data={data}
                onRefresh={onRefresh}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator ={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};


export { List };
