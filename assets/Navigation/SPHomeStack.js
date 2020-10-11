import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import addOffer from '../screens/NewOffer'
import editOffer from '../screens/editOffer'
import HomescreenServiceProvider from '../screens/serviceProviderHomescreen'
import ProfileServiceProvider from '../screens/SPprofile'
import login from '../screens/LoginScreen'

function HomeStack(){
    const HomeStack = createStackNavigator()
    return (
<HomeStack.Navigator
initialRouteName="Home"
screenOptions={{ headerShown: false }}
>

<HomeStack.Screen name = 'Home' component= {HomescreenServiceProvider}
option={{
headerTransparent: true}} unmountOnBlur={true}/>
<HomeStack.Screen name= 'addOffer' component={addOffer}/>
<HomeStack.Screen name= 'editOffer' component={editOffer}/>
<HomeStack.Screen name='logout' component={login} unmountOnBlur={true}/>
    </HomeStack.Navigator>
    )
}

  
  export default HomeStack;