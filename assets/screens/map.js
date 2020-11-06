import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE , Marker, Callout } from 'react-native-maps';
import { Text, View, Button, Image, Dimensions,StyleSheet } from 'react-native'
import {database} from '../config/firebase'
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons, Feather } from '../constants/icons'
import colors from '../constants/colors'

import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';



export default class Map extends React.Component{
  constructor(props) {
    super(props);

    this.navigateToView = this.navigateToView.bind(this);
}
  state = {
    locationResult: null,
    locations:[],
    region: {
      latitude: 24.7136,
      longitude: 46.6753,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    };


    componentDidMount() {
      this._getLocationAsync();
      var self = this;
     const refSP = database.ref('serviceProvider/')
     refSP.on('value', function(snapshot){
      const ref = snapshot.val()
      const dataLocation  = []
      if (ref != null){
        Object.keys(ref).map(sp => {
          
          if (ref[sp].coordinate){
          console.log(ref[sp])
          dataLocation.push(ref[sp])}
        })
        self.setState({locations: dataLocation})
      } }  )}
      



      _getLocationAsync = async () => {
        // the following line causes error
        
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
        this.setState({
        locationResult: 'Permission to access location was denied',
        });
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
this.setState({ locationResult: location.coords });
};

navigateToView(viewName) {
   this.props.navigation.navigate('serviceProvider', { offer: viewName });

 // navigate(viewName);'serviceProvider', { offer: offer }
}

mapMarkers = () => {
  return this.state.locations.map((location) => <Marker
   // key={location.id}
    coordinate={location.coordinate}
    title={location.nameBrand}
    description={location.description}
    pinColor={colors.primaryBlue} 

  >
    <Callout>
      <Text style={{color:colors.primaryBlue}}>{location.nameBrand}</Text>
      <TouchableOpacity  >
      <Text onPress={this.navigateToView(location)}>
        go to service provider 
      </Text>
      </TouchableOpacity>
    </Callout>
  </Marker >)
}


render(){
  //locations
    return(
      <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={this.state.region }
        showsUserLocation={true}
        zoom={10}
      >
         {this.mapMarkers()} 
        {/* <Marker 
        
        //key={1}
        coordinate={{ latitude: 24.7561, longitude:46.6294 }}
        title={'first marker '}
        pinColor={colors.primaryBlue} 
        >
          <Callout>
            <TouchableHighlight >
              <Text onPress={() => this.navigateToView('serviceProvider')}>Service Provider</Text>
            </TouchableHighlight>
          </Callout>
        </Marker> */}
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