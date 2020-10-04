import * as React from 'react'
import { createSwitchNavigator,createAppContainer} from 'react-navigation';
import appDrawer from '../Navigation/appdrawer'
import mainStack from '../Navigation/MainStackNavigator'
import spNavigator from '../Navigation/spTabNavigator'

function AppContainer(){




const appSwitch = createSwitchNavigator({
    Authuntication: { screen: mainStack },
    user: { screen: appDrawer}
  });
const Appcontainer = createAppContainer(appSwitch);

return (
    <Appcontainer/>
)

}

export default AppContainer;
