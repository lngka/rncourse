import React,  { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';

class SharePlaceScreen extends Component {
    onPlaceAddedHandler = placeName => {
        return this.props.onAddPlace(placeName);
    }
    render () {
        return (
            <View>
                <PlaceInput onPlaceAdded={this.onPlaceAddedHandler}/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placename) => dispatch(addPlace(placename))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);