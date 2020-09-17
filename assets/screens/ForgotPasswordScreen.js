import React , {Component} from 'react'
import {Text, View, StyleSheet, Button , TextInput} from 'react-native'
import colors from '../constants/colors'
import styles from '../constants/styles'
import {Entypo} from '../constants/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../config/firebase'
import auth from  '@firebase/auth';




export default class ForgotPasswordScreen extends Component  {
  state = { email: '', errorMessage: null }
   
  forgotPassword = () => {
    firebase.auth().sendPasswordResetEmail(Email)
      .then(function (user) {
        Alert.alert('تم ارسال طلب تعديل كلمة المرور على بريدك الإلكتروني')
      }).catch(function (e) {
        console.log(e)
      })
  }

    render(){
    return (
    <View style={pg.container}>
        <Text style={pg.header}> إستعادة كلمة المرور</Text>
       <Entypo name="rocket" size={30} color="#900" />

        <TextInput 
         style={styles.TextInput}
         placeholder='البريد الإلكتروني'
         onChangeText={email => this.setState({ email })}
         value={this.state.email}
         autoCapitalize="none"
         />

  <TouchableOpacity> 
    <View style = {pg.buttonStyle}>
            <Text style = {pg.textButton} > إستعادة</Text>
    </View>
  </TouchableOpacity>  


    </View>
   
    )
}
}

const pg = StyleSheet.create({
    
    container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
           
    },
    header:{
        
        "fontFamily": "Bradley Hand",
        "fontWeight": "bold",
        "fontSize": 35,
        
        "color": colors.primaryBlue,
      //  textDecorationStyle: 'underline',
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
      "borderColor": "rgba(247, 247, 247, 255)",
      "backgroundColor": "rgba(1, 132, 189, 255)"

      },
      textButton:{

        "fontFamily": "Bodoni 72 Smallcaps",
        "fontSize": 25,
        "color": 'rgba(247, 247, 247, 255)',
      }

    })