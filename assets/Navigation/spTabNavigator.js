import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {Entypo, Feather , MaterialCommunityIcons, MaterialIcons, FontAwesome5} from '../constants/icons'
import colors from '../constants/colors'

import HomescreenServiceProvider from '../screens/serviceProviderHomescreen'
import ServiceProviderPage from '../screens/serviceProvider'
import ProfileServiceProvider from '../screens/SPprofile'


function spTabNavigator(){

  
const Tab = createBottomTabNavigator()
    return (

      <Tab.Navigator  initialRouteName ='HomescreenServiceProvider' tabBarOptions={{
        showLabel: false,
        inactiveTintColor: colors.primaryGrey,
        activeTintColor: colors.primaryBlue
      }}>
        
        <Tab.Screen name='HomescreenServiceProvider' component={HomescreenServiceProvider}
         options={{
          
          tabBarIcon: () => (
            <Entypo name="home" color={colors.primaryBlue} size={25} />
          )

        }} />
        <Tab.Screen name='Page' component={ServiceProviderPage}
         options={{
          
          tabBarIcon: () => (
            <FontAwesome5 name="store" color={colors.primaryBlue} size={20} />
          )
        }} />
        <Tab.Screen name='Profile' component={ProfileServiceProvider}
         options={{
          
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color={colors.primaryBlue} size={30} />
          )
        }} />
      </Tab.Navigator>
    )
    }

    export default spTabNavigator;