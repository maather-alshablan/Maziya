import React, { Component } from 'react'
import { Text, View, Button, Image, Dimensions } from 'react-native'
import {firebase, auth } from '../config/firebase'

export default class serviceProviderHomescreen extends Component{

render(){
    return(
        <View style={ { flex:1, alignItems: "center", justifyContent: "center" , backgroundColor:'white'}}>
          <Text >Service Provider Homescreen</Text>
          
         
            
            <Button  type="outline" title="Log out"  color="black" border="solid" border-color="black" onPress={() => auth
            .signOut()
            .then(() => navigation.navigate('Login'))}
            
            />
        </View>


    
    );
}

}