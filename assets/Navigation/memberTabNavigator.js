import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator} from '@react-navigation/drawer';
import {Entypo, Feather , Ionicons, MaterialCommunityIcons,FontAwesome} from '../constants/icons'
import colors from '../constants/colors'

import Homescreen from '../screens/Homescreen'
import Favorite from '../screens/FavoriteList'
import Map from '../screens/map'
import ScanQR from '../screens/ScanQR'
import Profile from '../screens/Memberprofile'





function memberTabNavigator(){

const Tab = createBottomTabNavigator()


    return (

      <Tab.Navigator  initialRouteName='Homescreen'  tabBarOptions={{
        showLabel: false,
        inactiveTintColor: colors.primaryGrey,
        activeTintColor: colors.primaryBlue
      }}>
        <Tab.Screen name='Homescreen' component={Homescreen}
        options={{
          
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons 
            name={focused ? "home" : "home-outline"}  
            color={colors.primaryBlue} 
            size={30} />
          )

        }} />
        <Tab.Screen name='Map' component={Map} 
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome 
            name={focused ? "map" : "map-o"}  
            color={colors.primaryBlue} 
            size={25} />
          )
        }} />
        <Tab.Screen name='Favorite' component={Favorite} 
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons 
            name={focused ? "heart" : "heart-outline"}  
            color={colors.primaryBlue} 
            size={30} />
          )
        }}  />
        <Tab.Screen name='ScanQR' component={ScanQR} 
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons 
            name={focused ? "qrcode-scan" : "qrcode-scan"}  
            color={colors.primaryBlue} 
            size={30} />
          )
        }} />

      </Tab.Navigator>
    )}

    export default memberTabNavigator;