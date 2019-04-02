import React,  { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
            this.props.navigator.toggleDrawer({
                side: "left"
            });
            }
        }
    }

    onPlaceAddedHandler = placeName => {
        return this.props.onAddPlace(placeName);
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>Share a place with us!</Text>
                    <View style={styles.placeholder}>
                        <Text>Image preview</Text>
                    </View>
                    <Button title="Pick Image"/>
                    <View style={styles.placeholder}>
                        <Text>Map preview</Text>
                    </View>
                    <Button title="Pick Location"/>
                    
                        <DefaultInput placeholder="Place name..."/>
                    
                    <Button title="Share"/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    container: {
        flex: 1,
        alignItems: "center"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placename) => dispatch(addPlace(placename))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);