import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login  from './assets/screens/LoginScreen'
import Registration  from './assets/screens/Registration'



export default function App () {
  
    const Stack = createStackNavigator();

        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)
      
        return (
          <NavigationContainer>
                    
          <Stack.Navigator >
              <Stack.Screen name = 'Login' initialRouteName='Login' Component={Login}/>
              <Stack.Screen name='Registration' Component={Registration} />
           
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  

  {/*}  <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/}
