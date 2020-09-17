import React from 'react'
import { Text, View } from 'react-native'
import {firebase, auth } from '../config/firebase'

export default function HomeScreen(props) {

const signout  = () => {
auth
  .signOut()
  .then(() => console.log('User signed out!')); } 

    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}