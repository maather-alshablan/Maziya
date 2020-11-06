import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import serviceProvider from '../screens/serviceProvider'
import Map from '../screens/map'
function MapStack() {
    const MapStack = createStackNavigator()
    return (
        <MapStack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >

            <MapStack.Screen name='Home' component={Map}
                option={{
                    headerTransparent: true
                }} unmountOnBlur={true} />
            <MapStack.Screen name='serviceProvider' component={serviceProvider} option={{
                    headerTransparent: true
                }} unmountOnBlur={true}  />
        </MapStack.Navigator>
    )
}


export default MapStack;