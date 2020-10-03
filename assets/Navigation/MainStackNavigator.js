import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import spTabNavigator from "../Navigation/spTabNavigator";
import AppDrawer from "../Navigation/appdrawer";
import { auth } from "../config/firebase";

import Login from "../screens/LoginScreen";
import Loading from "../screens/Loading";
import Registration from "../screens/Registration";
import Forgot from "../screens/ForgotPasswordScreen";
import RegistrationServiceProvider from "../screens/RegistrationServiceProvider";
import HomescreenServiceProvider from "../screens/serviceProviderHomescreen";

import Homescreen from "../screens/Homescreen";
import { Entypo } from "../constants/icons";

import profile from "../screens/profile";
import NewOffer from "../screens/NewOffer.js";

function MainStackNavigator() {
  const Stack = createStackNavigator();

  //Reference:  /*authentication :
  // https://rnfirebase.io/auth/usage

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    //  If the user returned within the handler is null we assume the user is currently signed-out
    /*
    return ( // to login/sign up navigation
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Forgot' component={Forgot} />
          <Stack.Screen name='Homescreen' component={Homescreen} />
          <Stack.Screen name='Registration' component={Registration} />
          <Stack.Screen name='RegistrationServiceProvider' component={RegistrationServiceProvider} />

        </Stack.Navigator>
      </NavigationContainer>
    )
    else {
      return (
            <NavigationContainer>
          <Stack.Navigator initialRouteName='Homescreen'>
          <Stack.Screen name='Homescreen' component={Homescreen} />
          <Stack.Screen name='profile' component={profile} />
          <Stack.Screen name='' component={} />
          <Stack.Screen name='' component={} />
          <Stack.Screen name='' component={} />

        </Stack.Navigator>
      </NavigationContainer>
      )
    }
*/
  }

  return (
    // to login/sign up navigation
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={Loading} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="SPhomescreen" component={spTabNavigator} />
        <Stack.Screen name="Homescreen" component={AppDrawer} />

        <Stack.Screen
          name="RegistrationServiceProvider"
          component={RegistrationServiceProvider}
        />
        <Stack.Screen name="NewOffer" component={NewOffer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
