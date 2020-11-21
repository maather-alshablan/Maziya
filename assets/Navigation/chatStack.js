import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import chatRooms from '../screens/ChatRooms'
import chatRoom from '../screens/chatRoom'

function chatStack(){
const ChatStack = createStackNavigator()
return (
<ChatStack.Navigator
initialRouteName="Home"
screenOptions={{ headerShown: false }}
>

<ChatStack.Screen name = 'Home' component= {chatRooms}
option={{
headerTransparent: true}} unmountOnBlur={true}/>
 <ChatStack.Screen name= 'Room' component={chatRoom} initialParams={{isMember:true}} /> 

</ChatStack.Navigator>
)}
export default chatStack;