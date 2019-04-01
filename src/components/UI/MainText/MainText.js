import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = (props) => {
    return (
        <Text style={styles.mainText} {...props} >{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    mainText: {
        color: "darkslategray",
        backgroundColor: "transparent"
    }
});
export default mainText;