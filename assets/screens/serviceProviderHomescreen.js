import React, { Component } from 'react'
import { Text, View, Button, Image, Dimensions ,StyleSheet} from 'react-native'
import {firebase, auth, database } from '../config/firebase'
import colors from '../constants/colors';
import Card from '../components/CardComponent'

import NewOffer from './NewOffer'
export default class serviceProviderHomescreen extends Component{
    


       userName = () => {
        const userId = firebase.auth().currentUser.uid;
        const name =  firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            (snapshot.val() && snapshot.val().name)}
        )
       return name;
    }
        


    render(){
    return(
        <View style={ { flex:1, alignItems: "center", justifyContent: "center" , backgroundColor:'white'}}>
          <Text style={styles.header}>Service Provider
          </Text>
<Button title="add Offer" ></Button>
      
          
         
            
            <Button  type="outline" title="Log out"  color="black" border="solid" border-color="black" onPress={() => auth
            .signOut()
            .then(() => navigation.navigate('Login'))}
            
            />
        </View>
    
    );
}
}




const styles = StyleSheet.create({
    header:{
        color: colors.primaryBlue,
        fontSize:25,
        alignItems:'flex-start'
    }
})