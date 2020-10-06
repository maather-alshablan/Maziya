import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {Entypo, Feather , MaterialCommunityIcons, MaterialIcons, FontAwesome5} from '../constants/icons'
import colors from '../constants/colors'

import HomescreenServiceProvider from '../screens/serviceProviderHomescreen'
import ServiceProviderPage from '../screens/serviceProvider'
import ProfileServiceProvider from '../screens/SPprofile'
import addOffer from '../screens/NewOffer'
import HomeStack from '../Navigation/SPHomeStack'
import resetPassword from '../screens/resetPasswordLoggedIn'
import login from '../screens/LoginScreen'



function EditProfileStack(){
  const SPProfileStack = createStackNavigator()
  return (
<SPProfileStack.Navigator
initialRouteName="Home"
screenOptions={{ headerShown: false }}
>

<SPProfileStack.Screen name = 'Home' component= {ProfileServiceProvider}
option={{
headerTransparent: true}}/>
<SPProfileStack.Screen name='resetPassword' component={resetPassword} />
<SPProfileStack.Screen name='Login' component={login} unmountOnBlur={true}/>
  </SPProfileStack.Navigator>
  )
}


function spTabNavigator(){


const Tab = createBottomTabNavigator()
    return (

      <Tab.Navigator  initialRouteName ='HomescreenServiceProvider' tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primaryBlue,
        activeBackgroundColor:'white'
      }}>
        
        <Tab.Screen name='HomescreenServiceProvider' component={HomeStack}
         options={{
          
          tabBarIcon:  ({ tintColor, focused }) => (
            <MaterialCommunityIcons 
            name={focused ? "home" : "home-outline"} 
            color={colors.primaryBlue} 
            size={30} />
          )

        }} />
        <Tab.Screen name='Page' component={ServiceProviderPage}
         options={{
          
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons 
            name={focused ? "store" : "store"} 
            color={colors.primaryBlue} 
            size={30} />
          )

        }} />
        <Tab.Screen name='Profile' component={EditProfileStack}
         options={{
          
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons 
            name={focused ? "account" : "account-outline"} 
            color={colors.primaryBlue} 
            size={30} />
          )
        }} />
      </Tab.Navigator>
    )
    }

    export default spTabNavigator;