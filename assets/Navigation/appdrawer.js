import * as React from 'react'
import { createDrawerNavigator, DrawerItem,  DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Tab from '../Navigation/memberTabNavigator'
import {Entypo} from '../constants/icons'
import Profile from '../screens/Memberprofile'
import Login from '../screens/LoginScreen'
import resetPassword from '../screens/resetPasswordLoggedIn'
import usedOffers from '../screens/usedOffers'
import colors from '../constants/colors';
import {auth} from '../config/firebase'
import { createStackNavigator } from "@react-navigation/stack";
import usedStack from '../Navigation/UsedStack'



function ProfileStack(){
  const ProfileStack = createStackNavigator()
  return (
<ProfileStack.Navigator
initialRouteName="Profile"
screenOptions={{ headerShown: false }}
>

<ProfileStack.Screen name = 'Profile' component= {Profile}
option={{
headerTransparent: true}} />
<ProfileStack.Screen name= 'resetPassword' component={resetPassword} unmountOnBlur={true}/>
<ProfileStack.Screen name='logout' component={Login} unmountOnBlur={true}/>
  </ProfileStack.Navigator>
  )
}
function drawer(){

function CustomDrawerContent(props) { // fix navigation issue: error > navigation cant be found
  return (
    <DrawerContentScrollView {...props}>
     
      <DrawerItemList {...props} />
      <DrawerItem label='تسجيل الخروج' onPress={()=> auth
          .signOut()
          .then(() => this.props.navigation.navigate('Login'))}
          /> 
      
          </DrawerContentScrollView>
  );
}

 


    const Drawer = createDrawerNavigator();    
        return (
    
            <Drawer.Navigator 
            initialRouteName ='home'  
            drawerPosition='right'
            drawerStyle={{
                backgroundColor: colors.primaryBlue,
                width: 200,
                alignContent:'center',
                color:'white'
              }}
            drawerContentOptions={{
                activeTintColor:'white',
                activeBackgroundColor: 'transparent',
                itemStyle: { marginVertical: 10 , marginRight:20 },
                labelStyle:{fontSize:15 },
            }}
            overlayColor= '1'
            
            //drawerContent={props => <CustomDrawerContent {...props} />} 
            >
              
            <Drawer.Screen name= 'home' component={Tab}
            options={{
                title: 'الرئيسية',
                color:'white',
    
              }}/>
            <Drawer.Screen name= 'profile' component={ProfileStack} options={{
                title: 'صفحتي',
                color:'white',
    
              }}/>
            
            <Drawer.Screen name= 'usedOffers' component={usedStack} options={{
                title: 'العروض المستخدمة',
                color:'white',
    
              }}/>
              <Drawer.Screen name= 'Logout' component={Login} options={{
                title: 'تسجيل الخروج',
                color:'white',
                unmountOnBlur: true,
              }}/>
              
            </Drawer.Navigator>
        )
    
       
          }
        export default drawer;