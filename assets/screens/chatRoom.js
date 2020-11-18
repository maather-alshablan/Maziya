import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, SafeAreaView,StyleSheet,Dimensions,
  ScrollView,FlatList,
  Alert,
} from 'react-native'
import colors from '../constants/colors'
import { Entypo, AntDesign } from '../constants/icons'
import { Card } from "@paraboly/react-native-card";
import { firebase, auth, database } from '../config/firebase'
import { GiftedChat , Bubble,Send } from 'react-native-gifted-chat'

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: [],
        member: props?.route?.params?.member,
        nameBrand: props?.route?.params?.nameBrand,
        roomKey: props?.route?.params?.keyRoom ,
        serviceProvider: props?.route?.params?.serviceProvider,
        memberName: null,
      
        
      }}
 
      componentDidMount(){
        var self = this

        //Retrieve user name SERVICE PROVIDER SIDE
        if(this.state.roomKey != null ){
       database.ref('Rooms/'+ this.state.roomKey).on('value', snapshot=>{
        var member = snapshot.val().member
        var sp = snapshot.val().serviceProvider

       database.ref('users/'+member).once('value', user => {
         var name = user.val().name
         self.setState({memberName: name})
       })

       database.ref('serviceProvider/'+sp).once('value', sp_ =>{
         var brand = sp_.val().nameBrand
         self.setState({nameBrand: brand})
       })
        })
        database.ref('Rooms/'+ this.state.roomKey).set({
          brandName: this.state.nameBrand,
          memberName: this.state.memberName

        })
      }

        //Retrieve messages 
        if(this.state.roomKey != null)
         database.ref('Rooms/'+ this.state.roomKey+'/messages').on('value', snapshot=>{
           let messages = [];
           snapshot.forEach((snap)=>{
             messages.push(snap.val())
           });
           this.setState({messages: messages})

         }
         )

         
      }

        //Creating room is only member side
      createRoom = ()=>{
        console.log('creating new room.. ')
        var key = database.ref().child('Rooms').push().key
        this.setState({roomKey: key})
        var room ={
               member: auth.currentUser.uid,
               roomKey: key,
               //memberName: this.state.member?  this.state.memberName : this.state.brand , 
               serviceProvider: this.state.serviceProvider
            
        }
        var updates = {}
        updates['Rooms/'+key] = room
        updates['users/'+auth.currentUser.uid+'/ChatRooms/'+key] = room
        updates['serviceProvider/'+ this.state.serviceProvider+'/ChatRooms/'+key] = room
        database.ref().update(updates).then(() => console.log('new room created')).catch(e => console.warn('room creation'))
        
    
        }
   

      onSend(messages = []) {

        if (this.state.roomKey == null)
        this.createRoom()

        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
        console.log('   break')
        console.log(this.state.messages)
         this.writeDatabase();

      }

      writeDatabase(){

       
      
        database.ref('Rooms/'+this.state.roomKey).set({
          messages: this.state.messages
        }).catch('unable to write')
    
      }

      

      renderSend(props) {
        return (
          <Send {...props}>
            <View style={styles.sendingContainer}>
              <Entypo name='chevron-right'size={32} color={colors.primaryBlue} />
            </View>
          </Send>
        );
      }
      renderBubble = (props) => {
        return (
          // Step 3: return the component
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                // Here is the color change
               
              }
            }}
            textStyle={{
              right: {
                color: '#fff'
              }
            }}
          />
        );
      }


    render(){
      const name = this.state.member? 
         this.state.memberName : this.state.nameBrand 

        return(
            <View style={styles.container}>
                 <SafeAreaView > 
                    <View style={styles.headerContainer}>
                    <TouchableOpacity>
                     <Entypo name='chevron-left' size={30} color={colors.primaryBlue} style={{ alignSelf: 'flex-start' }} 
                      onPress={() => this.state.member ? this.props.navigation.pop() :
                      this.props.navigation.pop()
                    } />
                      </TouchableOpacity>

                    <Text style={styles.headerText} >
                      {this.state.member? 
                      this.state.nameBrand : this.state.memberName}
                    </Text>
                    </View>
              </SafeAreaView> 
              <GiftedChat

            messages={this.state.messages}
            user={{
                _id: auth.currentUser.uid,
                name: name
              }}
              renderAvatar={null}
              renderBubble={this.renderBubble}
              onSend={newMessage => this.onSend(newMessage)}
            placeholder='Type your message here....'
            alwaysShowSend
            renderSend={this.renderSend}
            scrollToBottom
      />
                  
            </View>
        )
    }
}

const screenWidth  = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
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
        marginHorizontal:50 
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      }
});