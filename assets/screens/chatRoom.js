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
        memberName: '',
        isMember: props?.route?.params?.isMember,
        sentMessage: false
      
        
      }}
 
      componentDidMount(){
        var self = this

        
        // if (this.state.roomKey === null && this.state.sentMessage)
        // this.createRoom();

        if(this.state.roomKey){
       database.ref('Rooms/'+ this.state.roomKey).once('value', snapshot=>{
        var memberID = snapshot.val().member
        var memberName = snapshot.val().memberName
        var spID = snapshot.val().serviceProvider
        var brand = snapshot.val().brandName

        self.setState({
          
          member: memberID,
          memberName: memberName,
          serviceProvider:spID,
          nameBrand:brand,
        })
        console.log(this.state.roomKey,this.state.member,this.state.memberName,this.state.serviceProvider,this.state.nameBrand)



       database.ref('users/'+auth.currentUser.uid).once('value', user => {
      //    var name = user.val().name
      //    self.setState({memberName: name})
      //  })
      var accountType = user.val().accountType
      if (accountType == 'member')
      self.setState({isMember:true})
       })
      //  database.ref('serviceProvider/'+sp).once('value', sp_ =>{
      //    var brand = sp_.val().nameBrand
      //    self.setState({nameBrand: brand})
      //  })
        })
        // database.ref('Rooms/'+ this.state.roomKey).set({
        //   brandName: this.state.nameBrand,
        //   memberName: this.state.memberName
        // })
      }

        //Retrieve messages 
        if(this.state.roomKey ) //possible error of messages here 
         database.ref('Rooms/'+ this.state.roomKey+'/messages').on('value', snapshot=>{
           let messages = [];
           snapshot.forEach((snap)=>{
             messages.push(snap.val())
           });
           this.setState({messages: messages})

         }
         )
      }

      //   //Creating room is only member side
      // createRoom = ()=>{
      //   console.log('creating new room.. ')
      //   var key = database.ref().child('Rooms').push().key

      //   database.ref('users/'+auth.currentUser.uid).once('value', user => {
      //     var name = user.val().name

      //     this.setState({
      //       memberName: name,
      //       roomKey: key
      //   })})

      //   var room ={
      //          member: auth.currentUser.uid,
      //          roomKey: this.state.roomKey,
      //          memberName:  this.state.memberName , 
      //          serviceProvider: this.state.serviceProvider,
      //          brandName: this.state.nameBrand
      //   }
      //   this.setState({
      //   member: auth.currentUser.uid,
      //   roomKey: this.state.roomKey,
      //   memberName:  this.state.memberName , 
      //   serviceProvider: this.state.serviceProvider,
      //   brandName: this.state.nameBrand})

      //   var updates = {}
      //   updates['Rooms/'+key] = room
      //   updates['users/'+auth.currentUser.uid+'/ChatRooms/'+key] = room
      //   updates['serviceProvider/'+ this.state.serviceProvider+'/ChatRooms/'+key] = room
      //   database.ref().update(updates).then(() => console.log('new room created')).catch(e => console.warn('room creation'))
        
          
      //   }
   

      onSend(messages = []) {

       
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
         // sentMessage: true
        }))
        console.log('   break')
        console.log(this.state.messages)
         this.writeDatabase();

      }

      writeDatabase(){
        console.log(this.state.roomKey)
        if(this.state.roomKey)
        database.ref('Rooms/'+this.state.roomKey).update({
          messages: this.state.messages
        }).catch('unable to write')
        else console.log('unable to write')
    
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
      const sender = this.state.isMember? 
         this.state.memberName : this.state.nameBrand 

        return(
            <View style={styles.container}>
                 <SafeAreaView > 
                    <View style={styles.headerContainer}>
                    <TouchableOpacity>
                     <Entypo name='chevron-left' size={30} color={colors.primaryBlue} style={{ alignSelf: 'flex-start' }} 
                      onPress={() => this.props.navigation.pop() } />
                      </TouchableOpacity>

                    <Text style={styles.headerText} >
                      {this.state.isMember? 
                      this.state.nameBrand : this.state.memberName}
                    </Text>
                    </View>
              </SafeAreaView> 
              <GiftedChat

            messages={this.state.messages}
            user={{
                _id: auth.currentUser.uid,
                name: sender
              }}
              showUserAvatar
              renderBubble={this.renderBubble}
              onSend={newMessage => this.onSend(newMessage)}
            placeholder='Type your message here....'
            alwaysShowSend
            timeFormat={'LT'}
            isTyping={true}
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
        textAlign:'center',
         marginHorizontal:90 
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      }
});