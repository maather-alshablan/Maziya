import * as React from 'react'
import { createDrawerNavigator, DrawerItem,  DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Tab from '../Navigation/memberTabNavigator'
import {Entypo} from '../constants/icons'
import Profile from '../screens/Memberprofile'
import Courses from '../screens/courses'
import usedOffers from '../screens/usedOffers'
import colors from '../constants/colors';
import {auth} from '../config/firebase'



function drawer(){

function CustomDrawerContent(props) { // fix navigation issue: error > navigation cant be found
  return (
    <DrawerContentScrollView {...props}>
     
      <DrawerItemList {...props} />
      <DrawerItem label='تسجيل الخروج' onPress={()=> auth
          .signOut()
          .then(() => this.navigation.navigate('Login'))}
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
                itemStyle: { marginVertical: 10 , marginLeft:70 },
                labelStyle:{fontSize:15 }
                
            }}
            overlayColor= '1'
            drawerContent={props => <CustomDrawerContent {...props} />} >
              
            <Drawer.Screen name= 'home' component={Tab}
            options={{
                title: 'الرئيسية',
                color:'white',
    
              }}/>
            <Drawer.Screen name= 'profile' component={Profile} options={{
                title: 'صفحتي',
                color:'white',
    
              }}/>
            <Drawer.Screen name= 'courses' component={Courses} options={{
                title: 'الدورات المسجلة',
                color:'white',
    
              }}/>
            <Drawer.Screen name= 'usedOffers' component={usedOffers} options={{
                title: 'العروض المستخدمة',
                color:'white',
    
              }}/>
            
    
            </Drawer.Navigator>
        )
    
       
          }
        export default drawer;