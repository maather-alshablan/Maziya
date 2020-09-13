import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'

import { View , Text, SafeAreaView} from 'react-native';
import MainStackNavigator from './assets/Navigation/MainStackNavigator'




     function App() {

     /*const [loading, setLoading] = useState(true)
     const [user, setUser] = useState(null)*/
      
     return (<MainStackNavigator />)
          
     
    }
    export default App;
  

  /*}  <Stack.Navigator>
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
}*/
