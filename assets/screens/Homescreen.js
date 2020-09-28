import React from 'react'
import { Text, View, Button, Image, Dimensions } from 'react-native'
import {firebase, auth } from '../config/firebase'

// add bottom navigation 
// drawer navigation 
const Homescreen =({ navigation}) => {
    return(
        <View style={ { flex:1, alignItems: "center", justifyContent: "center"}}>
          
          
            <Image 
                source = {require('../images/background.jpg')} 
                style={{
                width: Dimensions.get('window').height *1.5,
            
                }}
                resizeMode = 'contain'
             />

            
            <Button  type="outline" title="Log out"  color="black" border="solid" border-color="black" onPress={() => auth
            .signOut()
            .then(() => navigation.navigate('Login'))}
            
            />
        </View>


    
    );

    
};



export default Homescreen;