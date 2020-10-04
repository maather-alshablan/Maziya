
import React, { useState , Component} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button, ColorPropType} from 'react-native'
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
        .then(() => 
        this.routeUser()
        ).catch(error => this.setState({ errorMessage: 'يرجى التأكد من ادخال البريد الالكتروني و كلمة المرور الصحيح' }))

        this.state.errorMessage="";

        

    }

    routeUser = () => {
        if (this.state.email.endsWith('ksu.edu.sa')){
        console.log('Directed to member homescreen')
        this.props.navigation.navigate('Homescreen')
        }
        else {
        console.log('Directed to service provider homescreen')
        this.props.navigation.navigate('SPhomescreen')

        }

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



         <View style={styles.fields}>
           
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
         {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
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
            

