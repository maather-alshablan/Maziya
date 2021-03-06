import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, StatusBar, Image, ImageBackground, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { database, auth, storage } from "../config/firebase";
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons } from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
import { QRCode } from 'react-native-custom-qr-codes';
import SignInButton from "../components/SignInButton";
import { DatePicker } from 'native-base'




export default class editOffer extends React.Component  {  
    constructor(props){
        super(props);
        console.log(props);
        const offerKey = props?.route?.params?.offerKey;
        this.state={
          OfferId : offerKey , 
          
        }
      }
      

    state = {
        title: "",
        Descripiton: "",
        OfferId:'',
        expdate:"",
        code:"",
        
        
    
      };
    
      handleOfferIdChange = () => {
        this.setState({ code: this.state.OfferId  });
      }
    
componentDidMount(){
   
  const readData =  (Descripiton,expdate,title,code) => {
   this.setState({
     Descripiton: Descripiton,
     expdate: expdate,
     title: title,
    code : code
   });
 };

// console.log(this.props.navigation.getParam())

  var self = this;
  database.ref('serviceProvider/'+ auth.currentUser.uid+ "/offers")
  .once('value')
  .then(function(snapshot){
    const offers = snapshot.val();
    const offersDetails = offers[self.state.OfferId];
    console.log('snapshot', snapshot.val());
    var Descripiton=  (offersDetails.Descripiton)
    var expdate =  (offersDetails.expdate)
    var title= (offersDetails.title)
    var code = offersDetails.code
   readData(Descripiton,expdate,title,code);
    });
    
    }
  


 
removeOffer=() => {
  console.log(this.state.OfferId);
  database
      .ref()
      .child("serviceProvider")
      .child(auth.currentUser.uid)
      .child("offers").child(this.state.OfferId)
      .remove()

    //also removed from used and favorited offers 

.catch(error => alert(error)).then(Alert.alert('???? ?????? ?????????? ??????????'))
.then(this.props.navigation.pop())
}

  handleUpdate = () => {
    //   var userId = auth.currentUser.uid;

  database.ref('serviceProvider/'+ auth.currentUser.uid + "/offers").child(this.state.OfferId).
  update({ 
  'Descripiton': this.state.Descripiton, 
  'expdate': this.state.expdate,
  'title': this.state.title,
  'code': this.state.code,

      }).catch(Alert.alert('error occured')).then(Alert.alert('successful update'))

  }

  // handletitleChange = title => {
  //   this.setState({ title: title  });
  // };


// handletitleChange = title => {
//   this.setState({ title: title  });
// };



 handleDateChange = expdate => {
     this.setState({ expdate: expdate  });
  };


 confirmDelete =() =>{
Alert.alert(
    '?????? ',
    '???? ?????? ?????????? ???? ?????? ????????????',
    [
      {
        text: '??????',
        onPress: () => {this.removeOffer()},
        style: 'default'
      },
      {
        text: '????',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
    ],
    { cancelable: false }
  )};
 

  
render(){
 
    return (

      <View style={styless.container}>
        <ScrollView style={styles.scrollView}>
          <StatusBar backgroundColor='#0278ae' barStyle='light-content' />
          <TouchableOpacity>
            <Entypo name='chevron-left' size={30} color={colors.primaryBlue} style={{ marginTop: 15 }} onPress={() => this.props.navigation.pop()} />
          </TouchableOpacity>
          <View style={styless.header}>
            <Text style={styless.header1}> ?????????? ?????????? </Text>
            {/* error message appear here */}
            {this.state.errors && (
              <View style={styles.header}>
                <Text style={styles.errors}>{this.state.errorMessage}</Text>
              </View>
            )}
            <View >
              <Image source={require('../images/logoDis.jpg')} style={{ width: 100, height: 100, marginLeft: 120 }} />
            </View>
          </View>

          <View style={styles.container} >
            <TouchableOpacity onPress={this.confirmDelete}>
              <MaterialCommunityIcons
                name="delete"
                color={"red"}
                size={30}
                style={styles.fieldLabels}

              />
            </TouchableOpacity>
          </View>

          <View style={styless.footer}>
            <Text style={styless.text_footer}>??????????????</Text>
            <View style={styless.action}>
              <TextInput style={styless.textInput}
                autoCapitalize="none"
                textAlign='right'
                onChangeText={title => this.setState({ title: title })}
                value={this.state.title} />
            </View>



            <Text style={styless.text_footer}>??????????</Text>
            <View style={styless.action}>
              <TextInput style={styless.textInput}
                autoCapitalize="none"
                onChangeText={Descripiton => this.setState({ Descripiton: Descripiton })}
                textAlign='right'
                value={this.state.Descripiton} />
            </View>
 
            
                <View style={styless.footer}>
          
                {/* <Text style={styless.text_footer}>??????????????</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={expdate =>this.setState( { expdate: expdate} ) }
                  value={this.state.expdate}
                  textAlign='right'/>
                  
                </View> */}
                 <Text style={styless.text_footer}>?????????? ???????????? ??????????</Text>
            <View style={styless.action}>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                value={this.state.expdate}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                mode={'date'}
                placeHolderText="??????????????"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                textAlign={'right'}
                onDateChange={date => this.handleDateChange(date)}
                disabled={false}
              />
            </View>

                
 
                <View>
                {/* <ImageBackground source={require('../images/image.png')} style={{width:200,height:200,marginLeft:50}}> */}
                  <View style={styless.action}>
                    <TextInput 
                   placeholder='???????? ??????????' 
                  
                   style={styless.TextInput,{paddingTop:50,marginLeft:120}}
                   autoCapitalize="none" 
                   onChangeText={code =>this.setState( { code: code} ) }
                   value={this.state.code}/>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.handleOfferIdChange}>
                        <SignInButton text={'QR ??????????'} onPress={this.handleOfferIdChange}></SignInButton>
                        </TouchableOpacity>
                      </View>
                    <View style={styles.container} >
                   
                     <QRCode content={this.state.code} 
                     logo={require('../images/logo.png')} /> 
                   </View>
                </View>
 
 
                
                <View style={styless.buttom}>
                    <TouchableOpacity style={styless.signIn} onPress={this.handleUpdate} >
                    <LinearGradient
                        colors={['#0278ae', '#0278ae']}
                        style={styless.signIn}
                    > 
                        <Text style={[styless.textSign, { color: '#fff' }]}> ?????????? ?????? </Text>

                    </LinearGradient>  
                    </TouchableOpacity> 
                    <View style={styles.container} >
                        <TouchableOpacity  onPress={this.confirmDelete}>
                   <MaterialCommunityIcons
                    name="delete"
                    color={"red"}
                    size={30}
                    style={styles.fieldLabels}
                   
                  />
                  </TouchableOpacity>
                   </View>
                </View>

                {
                    /* https://www.npmjs.com/package/react-native-qrcode-generator */
                }
            </View>
</View>


        </ScrollView>
      </View>
    )
  }

}


const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'white'
        
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop:20
    },
    header1:{
      color:'#0278ae',
      fontWeight:'bold',
      fontSize:25,
      marginLeft:150,
    },
    
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,

        paddingHorizontal: 30
    },
    text_header: {
      paddingTop:100,
        color: '#0278ae',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft:150
    },
    header1:{
      color: '#0278ae',
      fontWeight: 'bold',
      fontSize: 25,
      alignSelf:'center'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        //marginLeft:200,
        alignSelf:'flex-end',
        marginTop:15

        
    },
    buttom:{
       alignItems: 'flex-end',
        marginTop: 30
    },
   
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
 
    },
    textInput: {
        flex: 1,
        marginTop:  12,
        paddingLeft: 10,
        color: 'black'
    },
    
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
 
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
    
 
 
});