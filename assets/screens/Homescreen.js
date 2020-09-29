import React from 'react'
import { Text, View, Button, Image, Dimensions } from 'react-native'
import {firebase, auth } from '../config/firebase'
import {Entypo} from '../constants/icons'

// add bottom navigation 
// drawer navigation 
const Homescreen =({ navigation}) => {
    return(
        <View style={ { flex:1 , justifyContent: "center"}}>
            <View style={{alignItems:'flex-end'}}>
          <Entypo name="menu" color="black" size={30} onPress={()=> navigation.openDrawer()}/>
          </View>
            

            
            <Button  type="outline" title="Log out"  color="black" border="solid" border-color="black" onPress={() => auth
            .signOut()
            .then(() => navigation.navigate('Login'))}
            
            />
        </View>


    
    );

    
};



export default Homescreen;