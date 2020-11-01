import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE ,Marker }   from 'react-native-maps';
import { Text, View, Button, Image, Dimensions,StyleSheet } from 'react-native'
import {firebase, auth } from '../config/firebase'
import { Constants, Location } from 'expo';
import * as  Permissions from 'expo';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

export default class Map extends Component {
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
       initialRegion={{
        latitude: 24.7136,
        longitude: 46.6753,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.1,
      }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={this.state.locationResult}
        showsUserLocation={true}
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