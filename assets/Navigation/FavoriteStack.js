import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import serviceProvider from '../screens/serviceProvider'
import Favorite from '../screens/FavoriteList'
function FavoriteStack() {
    const FavoriteStack = createStackNavigator()
    return (
        <FavoriteStack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >

            <FavoriteStack.Screen name='Home' component={Favorite}
                option={{
                    headerTransparent: true
                }} unmountOnBlur={true} />
            <FavoriteStack.Screen name='serviceProvider' component={serviceProvider} />
        </FavoriteStack.Navigator>
    )
}


export default FavoriteStack;