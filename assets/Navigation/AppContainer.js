import * as React from 'react'
import { createSwitchNavigator,createAppContainer} from 'react-navigation';
import appDrawer from '../Navigation/appdrawer'
import mainStack from '../Navigation/MainStackNavigator'
import spNavigator from '../Navigation/spTabNavigator'

function AppContainer(){


const userSwitch = createSwitchNavigator({
    member: {screen: appDrawer},
    sp: {screen: spNavigator}
})
const appSwitch = createSwitchNavigator({
    Authuntication: { screen: mainStack },
    user: { screen: userSwitch}
  });
const AppContainer = createAppContainer(appSwitch);

export default AppContainer;
   
}

export default AppContainer;
