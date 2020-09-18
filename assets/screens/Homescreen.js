import React from 'react'
import { Text, View, Button } from 'react-native'
import {firebase, auth } from '../config/firebase'


const Homescreen =({ navigation}) => {
    return(
        <View style={{ flex:1, alignItems: "center", justifyContent: "center"}}>
            <Text>Home</Text>
            <Button title="Log out" onPress={() => auth
            .signOut()
        .then(() => navigation.navigate('Login'))}/>
        </View>
    );
};

export default Homescreen;