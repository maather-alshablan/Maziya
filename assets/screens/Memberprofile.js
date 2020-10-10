import React, { useState ,Component } from 'react'
import { Text, View, Button, Image, Dimensions , Alert, TouchableOpacity,Label,  StyleSheet,  KeyboardAvoidingView} from 'react-native'
import {firebase, auth , database  } from '../config/firebase'
import colors from '../constants/colors'
import {Entypo} from '../constants/icons'
import InputField from '../components/InputField'
import { TouchableHighlight } from 'react-native-gesture-handler'
import resetPassword from './resetPasswordLoggedIn'

export default class Profile extends Component{
 state = { 
  username:'',
  email:'',
  password:''
}

componentDidMount(){
   
   const readData =  (username,email,password) => {
    this.setState({
      username: username,
      email: email,
      password: password
    });
  };
    database.ref('users/'+ auth.currentUser.uid).once('value').
   then(function(snapshot){
     
     var username=  (snapshot.val() && snapshot.val().name)
     var email =  (snapshot.val() && snapshot.val().email)
    var password= (snapshot.val() && snapshot.val().password)
    readData(username,email, password);
     });
     

}
  
   
    

  handleUpdate = () => { 
    var userId = auth.currentUser.uid;

    database.ref('users/'+userId).update(
      {
      'name': this.state.username,
      
  }
  ).catch(error => alert(error)).then(Alert.alert('successful update'))
  }


render(){
  
  
    return(
      <KeyboardAvoidingView
      style={[ pg.wrapper]}
      behavior="padding"
       >
           
          <Entypo name='chevron-left' size={30} color='white'  style={{marginTop:40}} onPress={()=> this.props.navigation.goBack()} />
           
           <View style={pg.form}>
          <Text style={pg.ForgotPasswordHeading }>
                صفحتي
          </Text>

          <InputField
            customStyle={{ marginTop: 30 }}
            textColor='white'
            labelText="الإسم"
            labelTextSize={14}
            onChangeText={name =>this.setState( { username: name} ) }
            labelColor='white'
            borderBottomColor='white'
            inputType="email"
            textAlign='right'
            value={this.state.username}
            
          />
          <InputField
            customStyle={{ marginTop: 40 }}
            textColor='white'
            labelText="البريد الإلكتروني"
            labelTextSize={14}
            labelColor='white'
            borderBottomColor='white'
            inputType="email"
            textAlign='right'
            value={this.state.email}
            editable={false}
          />
          <InputField
          customStyle={{ marginTop: 40 }}
          textColor='white'
          labelText="    كلمة المرور    "
          labelTextSize={14}
          labelColor='white'
          borderBottomColor='white'
          secureTextEntry
          inputType="password"
          textAlign='right'
          value={this.state.password}
          editable={false}
        
        />

        <Button title='update' onPress={this.handleUpdate} color='white'/>
        <Button title='update' onPress= {() => this.props.navigation.navigate('resetPassword')} color='white'/>

        </View>

      </KeyboardAvoidingView> 


    
    );
}

}

const pg = StyleSheet.create({
          
  container: {
          flex: 1,
          backgroundColor: colors.primaryBlue,
          alignItems: 'center',
         
  },
  header:{
      
      fontFamily: "Bradley Hand",
      fontWeight: "bold",
      fontSize: 35,
      
      color: colors.primaryBlue,
      marginTop: 50,
      marginBottom:100
      
  },
  button: {
      "flexDirection": "row",
      "alignItems": "center",
      alignSelf: "stretch",
      justifyContent: "center",
      "borderRadius": 22.5,
      "borderWidth": 1,
      "borderColor": "rgba(247, 247, 247, 255)",
      "backgroundColor": "rgba(1, 132, 189, 255)",
      
    }, 
    buttonStyle:{
    "flexDirection": "row",
    "alignItems": "center",
    "paddingStart": 50,
    "paddingTop": 4,
    paddingBottom: 4,
    "width": 150,
    "height": 40,
    margin: 15,
    marginTop:20,
    "borderRadius": 22.5,
    "borderWidth": 1,
    "borderColor": "white",
    "backgroundColor": "rgba(1, 132, 189, 255)"

    },
    textButton:{

      "fontFamily": "Bodoni 72 Smallcaps",
      "fontSize": 25,
      "color": 'white',
    }, 
    wrapper: {
      display: "flex",
      flex: 1,
      backgroundColor: colors.primaryBlue
    },
    form: {
      marginTop: 70,
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
    },
    ForgotPasswordHeading: {
      fontSize: 28,
      color: '#FFFFFF',
      fontWeight: "300",
      textAlign: 'right',
      marginTop:0
    },
    ForgotPasswordSubHeading: {
      color: 'white',
      fontWeight: "800",
      fontSize: 15,
      textAlign:'center',
      marginRight: 150,
      marginTop:20

    }

  });