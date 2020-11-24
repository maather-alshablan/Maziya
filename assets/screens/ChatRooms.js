import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, SafeAreaView,StyleSheet,Dimensions,FlatList,
  ScrollView,
} from 'react-native'
import colors from '../constants/colors'
import { Entypo } from '../constants/icons'
import { List, Divider } from 'react-native-paper';
import { Card } from "@paraboly/react-native-card";

import { firebase, auth, database } from '../config/firebase'
import emojiUtils from 'emoji-utils'

export default class ChatRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms:[],
            existMessages:false,
            isMember: props?.route?.params?.isMember ,
            isServiceProvider: props?.route?.params?.isServiceProvider,
            userType:'' 
          }}

          componentDidMount(){
           
           
            var self = this;

            //Determine location of reference
            if (this.state.isServiceProvider )
            var reference = database.ref('serviceProvider/'+auth.currentUser.uid+'/ChatRooms')
            else 
            var reference = database.ref('users/'+auth.currentUser.uid+'/ChatRooms')

           
            if (reference)
            reference.on('value', data =>{
              
                const roomList = data.val()
                //console.log(data.val())
                if (roomList){

                  self.setState({
                    existMessages: true
                  })
              console.log(this.state.existMessages, 'exist messages')
                const rooms_ =[]
              

                Object.keys(roomList).map(key=>{
                var lastText= this.retrieveLastText(key);
                var time = this.retrieveTime(key);
                    console.log(key)

                    console.log(lastText, 'last text')

                  var obj = {
                    roomKey: key,
                    member: roomList[key].member,
                    serviceProvider:roomList[key].serviceProvider,
                    memberName:  roomList[key].memberName , 
                    brandName: roomList[key].brandName,
                    lastText: lastText,
                    time: time
                   }
                  
                        rooms_.push(obj)

                   
                self.setState({rooms:rooms_})
                })}
             })
              console.log('hi')
             
          }

          retrieveLastText = (roomKey) =>{
            var lastText=''
            console.log(roomKey)
            var sub = database.ref('Rooms/'+roomKey+'/messages').limitToFirst(1).on('child_added',function(data) {
              
            lastText = data.exportVal().text
    
            })
            return lastText
          }


          retrieveTime = (roomKey) =>{
            var time =null
            console.log(roomKey)
            var sub = database.ref('Rooms/'+roomKey+'/messages').limitToFirst(1).on('child_added',function(data) {
              
            time = data.exportVal().createdAt
            
            })
            var date = new Date(time)
            
       
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }
    render(){
       

        return(
            <View style={styles.container}>
                 <SafeAreaView > 
                    <View style={styles.headerContainer}>
                    <TouchableOpacity>
                     <Entypo name='chevron-left' size={30} color={colors.primaryBlue} style={{ alignSelf: 'flex-start' }} onPress={() => this.props.navigation.goBack()} />
                      </TouchableOpacity>

                    <Text style={styles.headerText} >
                        الرسائل
                    </Text>
                    </View>
              </SafeAreaView> 
            
                
                {/* <View>
                <FlatList
                 data={this.state.rooms}
                keyExtractor={item => item}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                  
                 <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('chatRoom')} //{ roomKey: item.key })}
                   >   
                   {console.log(Object.keys(item))}
                <List.Item
              title={this.state.isServiceProvider? item.member: item.serviceProvider}
              description={'Item description'}
              titleNumberOfLines={1}
              //titleStyle={styles.listTitle}
             // descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      /></View> */}
      {/* {console.log('here')}*/}
            {!!this.state.existMessages? 
             this.state.rooms.map(room => {
                return(  
                  <View style={{alignSelf:'center', marginVertical:20}}>
                    {console.log(room.roomKey)}
                <Card 
                iconDisable  
                title={this.state.isServiceProvider ? room.memberName: room.brandName}
                content={room.lastText}
                bottomRightText={room.time}
                styles={{ width: 200 }}
                onPress={() => 
                this.props.navigation.navigate('chatRoom', {keyRoom: room.roomKey,isMember: this.state.isMember })}/>
                  </View>
               )})
            :<View>
            <Text style={{ alignSelf: 'center', fontSize: 20, color: colors.primaryGrey, marginTop: 250 }}>لا يوجد لديك رسائل </Text>
            </View>} 
             
            
            </View>
        )
    }
}

const screenWidth  = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
      flex: 1,
     // paddingHorizontal: 20,
      backgroundColor: 'white',
    },
    headerContainer:{
        
        width: screenWidth,
        height:80,
        alignItems: "center",
        textAlign: "center" ,
        flexDirection:'row',
 },
    headerText:{
        color:colors.primaryBlue,
        fontSize:30,
        alignSelf: "center",
        marginHorizontal:120
      
    },
});