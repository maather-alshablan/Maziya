
import React, { useState , Component} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button} from 'react-native'
import colors from '../constants/colors'
import styles from '../constants/styles'
import  SignInButton from '../components/SignInButton'

import {firebase, auth} from '../config/firebase'
import { Entypo } from '../constants/icons'





 export default class LoginScreen extends Component {
    state = { email: '', password: '', errorMessage: null }
  
    handleLogin = () => {

    // validate email with domain @**ksu.edu.sa ** using regular expressions

    const { email, password } = this.state
      
        auth.
         signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Homescreen'))
        .catch(error => this.setState({ errorMessage: error.message }))

        this.state.email="";
        this.state.password="";
        this.state

    }

    
    render(){
    return (
       <View style={styles.container}>

        <Image 
        source = {require('../images/logo.png')} 
        style={{
            width: Dimensions.get('window').height *0.35,
           
        }}
        resizeMode = 'contain'
        />


       <View style={styles.Header}>
        
            <Text style={styles.HeaderText}>
                تسجيل الدخول
            </Text>
  
    

       </View> 


         {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

         <View style={styles.fields}>
             <Entypo name='lock' size='30' />
             <Text style={styles.fieldLabels} >البريد الإلكتروني </Text>
         <TextInput 
         style={styles.TextInput}
         placeholder='البريد الإلكتروني'
         
         onChangeText={email => this.setState({ email })}
        value={this.state.email}
         autoCapitalize="none"
         />
         </View>

         
         <View style={styles.fields}>
         <Text style={styles.fieldLabels} >كلمة المرور </Text>
        <TextInput 
         style={styles.TextInput}
         placeholder='كلمة المرور'
         secureTextEntry
         onChangeText={password => this.setState({ password })}
         value={this.state.password}
         autoCapitalize="none"
         />
         </View>
         <TouchableOpacity onPress={this.handleLogin}>
         <SignInButton text={'تسجيل الدخول'} onPress={this.handleLogin}></SignInButton>
         </TouchableOpacity>

         
         <TouchableOpacity style={styles.forgotPasswordView}>
         <Text style={styles.forgotPassword} 
               onPress = {()=> this.props.navigation.navigate('Forgot')}> 
        نسيت كلمة المرور؟
         </Text>
         </TouchableOpacity>
         

       <TouchableOpacity >
            <Text 
            onPress= {() => this.props.navigation.navigate('Registration')}
            style={styles.SignUpText}>
                سجل كمستخدم جديد
            </Text>
        </TouchableOpacity>
        
        </View>
       
      
       
       
    )
}
}
            



/*const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },

    fieldLabels:{
            marginRight:10,
            marginTop:13,
            marginLeft:18,
        
    },

    fields:{
    flexDirection:'row-reverse',
    margin:15 ,
    paddingRight:50,
    alignItems:'center'
    
    },
    TextInput:{
        
        flexDirection:'row-reverse',
        height: 30,
        width: Dimensions.get('window').width *0.5,
        borderColor: colors.primaryGrey,
        borderWidth: 1,
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white',
        textAlign: 'right'
    },
    Header:{
        flexDirection: 'row-reverse',
        alignItems: 'stretch',
    },
    HeaderText:{
        marginHorizontal: 15,
        color: colors.primaryBlue,
        fontSize: 25,
        
    },
    SignUpText:{
        marginTop:20 ,
        marginHorizontal: 15,
        color: colors.primaryBlue,
        fontSize: 15
    },
    forgotPassword:{
        "fontFamily": "Bodoni 72 Smallcaps",
        "fontSize": 15,
        "color": "rgba(121, 121, 121, 255)",
      },
      forgotPasswordView:{
        marginTop: 10,
        "alignItems": "flex-start"
      }
  
    
  });
*/