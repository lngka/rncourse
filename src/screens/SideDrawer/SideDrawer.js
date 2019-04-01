import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class SideDrawer extends Component {
    render() {
        return ( 
            <View style={[styles.container, {width: Dimensions.get("window").width * 0.8}]}>
                <Text>side drawer</Text> 
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: "white",
        // width: Dimensions.get("window").width * 0.8, //specify width statically 
    }
});
export default SideDrawer;