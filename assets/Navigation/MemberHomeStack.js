import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Homescreen from '../screens/Homescreen'
import serviceProvider from '../screens/serviceProvider'

function HomeStack(){
    const HomeStack = createStackNavigator()
    return (
<HomeStack.Navigator
initialRouteName="Home"
screenOptions={{ headerShown: false }}
>

<HomeStack.Screen name = 'Home' component= {Homescreen}
option={{
headerTransparent: true}} unmountOnBlur={true}/>
<HomeStack.Screen name= 'serviceProvider' component={serviceProvider}/>
    </HomeStack.Navigator>
    )
}

  
  export default HomeStack;