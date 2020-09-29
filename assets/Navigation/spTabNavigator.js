import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import HomescreenServiceProvider from '../screens/serviceProviderHomescreen'
import ServiceProviderPage from '../screens/serviceProvider'
import ProfileServiceProvider from '../screens/SPprofile'
import Homescreen from '../screens/Homescreen'


function spTabNavigator(){

  
const Tab = createBottomTabNavigator()
    return (

      <Tab.Navigator  initialRouteName ='HomescreenServiceProvider'>
        
        <Tab.Screen name='HomescreenServiceProvider' component={HomescreenServiceProvider} />
        <Tab.Screen name='Page' component={ServiceProviderPage} />
        <Tab.Screen name='Profile' component={ProfileServiceProvider} />
      </Tab.Navigator>
    )
    }

    export default spTabNavigator;