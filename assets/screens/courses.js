import React, { Component } from 'react'
import { Text, View, Button, Image, Dimensions } from 'react-native'
import {Entypo} from '../constants/icons'

// add bottom navigation 
// drawer navigation 
export default class courses  extends Component{
    render(){
    return(
        <View style={ { flex:1, alignItems: "center", justifyContent: "center",backgroundColor:'white'}}>
          
          <Entypo name='chevron-left' size={30} color='blue'  style={{marginTop:40}} onPress={()=> this.props.navigation.goBack()} />

            <Text>الدورات المسجلة </Text>
            
      
        </View>


    
    );

    
    }
};



