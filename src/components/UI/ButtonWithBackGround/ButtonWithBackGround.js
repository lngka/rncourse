import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

const buttonWithBackGround = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={[styles.buttonWithBackGround, {backgroundColor: props.color}]}>
                <Text>{props.children}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    buttonWithBackGround: {
        padding: 5,
        borderWidth: 1,
        borderColor: "lightslategray",
        borderRadius: 8
    }
});

export default buttonWithBackGround;