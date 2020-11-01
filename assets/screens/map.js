import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View, Button, Image, Dimensions,StyleSheet } from 'react-native'
import {firebase, auth } from '../config/firebase'
import { Constants, Location } from 'expo';
import * as  Permissions from 'expo';



export default class Map extends Component{
  state = {
    locationResult: null
    };

    componentDidMount() {
      this._getLocationAsync();
      }


      _getLocationAsync = async () => {
        // the following line causes error
        
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
        this.setState({
        locationResult: 'Permission to access location was denied',
        });
        }

        let location = await Location.getCurrentPositionAsync({});
this.setState({ locationResult: JSON.stringify(location) });
};



render(){
    return(
      <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={this.state.locationResult}
        showsUserLocation={true}
        zoom={30}
      >
      </MapView>
    </View>
    
    );
}

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 900,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });