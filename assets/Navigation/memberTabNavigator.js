import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator} from '@react-navigation/drawer';
import {Entypo, Feather , Ionicons} from '../constants/icons'
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
          
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={colors.primaryBlue} size={25} />
          )

        }} />
        <Tab.Screen name='Map' component={Map} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" color={colors.primaryBlue} size={25} />
          )
        }} />
        <Tab.Screen name='Favorite' component={Favorite} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={colors.primaryBlue} size={25} />
          )
        }}  />
        <Tab.Screen name='ScanQR' component={ScanQR} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="camera" 
            color={colors.primaryBlue} size={25} />
          )
        }} />

      </Tab.Navigator>
    )

   
      }
    export default memberTabNavigator;