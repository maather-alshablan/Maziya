import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Homescreen from '../screens/Homescreen'
import serviceProvider from '../screens/serviceProvider'
import chatRoom from '../screens/chatRoom'
import chatRooms from '../screens/ChatRooms'

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
<HomeStack.Screen name= 'chatRooms' component={chatRooms} 
unmountOnBlur={true}/>
<HomeStack.Screen name= 'chatRoom' component={chatRoom} initialParams={{member:false }}/>


    </HomeStack.Navigator>
    )
}

  
  export default HomeStack;