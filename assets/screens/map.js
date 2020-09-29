import React, { Component } from 'react'
import { Text, View, Button, Image, Dimensions } from 'react-native'
import {firebase, auth } from '../config/firebase'

export default class Map extends Component{

render(){
    return(
        <View style={ { flex:1, alignItems: "center", justifyContent: "center" , backgroundColor:'white'}}>
          <Text >Map</Text>
          
         
        </View>


    
    );
}

}