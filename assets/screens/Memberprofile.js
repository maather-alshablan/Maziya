import React, { useState ,Component } from 'react'
import { Text, View, Button, Image, Dimensions , Alert, TouchableOpacity,Label,  StyleSheet,  KeyboardAvoidingView} from 'react-native'
import {firebase, auth , database  } from '../config/firebase'
import colors from '../constants/colors'
import {Entypo} from '../constants/icons'
import InputField from '../components/InputField'
import { TouchableHighlight } from 'react-native-gesture-handler'

export default class Profile extends Component{

render(){
    return(
      <KeyboardAvoidingView
      style={[ pg.wrapper]}
      behavior="padding"
       >
           
          <Entypo name='chevron-left' size={30} color='white'  style={{marginTop:40}} onPress={()=> this.props.navigation.navigate('Tab')} />
           
           <View style={pg.form}>
          <Text style={pg.ForgotPasswordHeading }>
                صفحتي
          </Text>

          <InputField
            customStyle={{ marginTop: 30 }}
            textColor='white'
            labelText="الإسم"
            labelTextSize={14}
            labelColor='white'
            borderBottomColor='white'
            inputType="email"
            textAlign='right'
            
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
        
        />
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