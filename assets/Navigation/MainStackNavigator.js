import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/LoginScreen'
import Registration from '../screens/Registration'
import Forgot from '../screens/ForgotPasswordScreen'
import Homescreen from '../screens/Homescreen'



function MainStackNavigator() {
    const Stack = createStackNavigator()
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Forgot' component={Forgot} />
          <Stack.Screen name='Homescreen' component={Homescreen} />
          <Stack.Screen name='Registration' component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
  export default MainStackNavigator
