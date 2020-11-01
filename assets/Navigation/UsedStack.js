import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import serviceProvider from '../screens/serviceProvider'
import used from '../screens/usedOffers'
function UsedStack() {
    const UsedStack = createStackNavigator()
    return (
        <UsedStack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >

            <UsedStack.Screen name='Home' component={used}
                option={{
                    headerTransparent: true
                }} unmountOnBlur={true} />
            <UsedStack.Screen name='serviceProvider' component={serviceProvider} />
        </UsedStack.Navigator>
    )
}


export default UsedStack;