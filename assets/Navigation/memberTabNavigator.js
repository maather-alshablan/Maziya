import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo, Feather, Ionicons, MaterialCommunityIcons, FontAwesome } from '../constants/icons'
import colors from '../constants/colors'

import homeStack from '../Navigation/MemberHomeStack'
import Homescreen from '../screens/Homescreen'

import Map from '../Navigation/mapStack'

import ScanQR from '../screens/ScanQR'
import FavoriteStack from '../Navigation/FavoriteStack'




function memberTabNavigator() {

  const Tab = createBottomTabNavigator()


  return (

    <Tab.Navigator initialRouteName='Homescreen' tabBarOptions={{
      showLabel: false,
      inactiveTintColor: colors.primaryGrey,
      activeTintColor: colors.primaryBlue
    }}>
      <Tab.Screen name='Homescreen' component={homeStack}
        options={{

          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={focused ? colors.primaryBlue:colors.primaryGrey} 
              size={30} />
          )

        }} />
      <Tab.Screen name='Map' component={Map}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome
              name={focused ? "map" : "map-o"}
              color={focused ? colors.primaryBlue:colors.primaryGrey} 
              size={25} />
          )
        }} />
      <Tab.Screen name='Favorite' component={FavoriteStack}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={"heart"}
              color={focused ? colors.primaryBlue:colors.primaryGrey} 
              size={30} />
          )
        }} />
      <Tab.Screen name='ScanQR' component={ScanQR}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "qrcode-scan" : "qrcode-scan"}
              color={focused ? colors.primaryBlue:colors.primaryGrey} 
              size={30} />
          )
        }} />

    </Tab.Navigator>
  )
}

export default memberTabNavigator;