import React, { useState , Component} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button} from 'react-native'
import colors from '../constants/colors'
import {Entypo} from '../constants/icons'
import  SignInButton from '../components/SignInButton'

import {firebase, auth }  from '../config/firebase'





 export default class Registration extends Component {

    state = { email: '', password: '',confirmPassword:'', errorMessage: null }

    handleSignUp = () => {

        
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match.")
            return
        }

        if (!this.validate(this.email))
        {
            this.errorMessage = 'wrong email domain'
            
        }
        auth.
         createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Homescreen'))
        .catch(
            error => this.setState({ errorMessage: error.message }))
    }

// validate email 
// ref: https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e

    validate = ({text}) => {
        console.log({text});
        
        if (!{text}.endsWith('ksu.edu.sa')){

          console.log("Email is Not Correct");
          this.setState({ errorMessage: 'Email not within domain' })
          return false;
        }
        else {

          this.setState({ email: {text} })

          console.log("Email is Correct");
        }
      }


    render(){
    return (
       <View style={styles.container}>

        <Image 
        source = {require('../images/logo.png')} 
        style={{
            height: Dimensions.get('window').height *0.25,
           
        }}
        resizeMode = 'contain'
        />


       <View style={styles.Header}>
        
            <Text style={styles.HeaderText}>
                إنشاء الحساب
            </Text>
  
    

       </View> 


         {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

         <View style={styles.fields}>
             <Text style={styles.fieldLabels} >البريد الإلكتروني </Text>
         <TextInput 
         style={styles.TextInput}
         placeholder='البريد الإلكتروني'

         onChangeText={email => this.validate(email)} 
         value={this.state.email}

         autoCapitalize="none"
         />
         </View>

         
         <View style={styles.fields}>
         <Text style={styles.fieldLabels}>كلمة المرور </Text>
        <TextInput 
         style={styles.TextInput}
         placeholder='كلمة المرور'
         secureTextEntry
         onChangeText={password => this.setState({ password })}
         value={this.state.password}
         autoCapitalize="none"
         />
         </View>

         <View style={styles.fields}>
            <Entypo name='lock' size={30}/>
         <Text style={styles.fieldLabels}>تأكيد كلمة المرور </Text>
        <TextInput 
         style={styles.TextInput}
         placeholder='تأكيد كلمة المرور '
         secureTextEntry
         onChangeText={confirmPassword => this.setState({ confirmPassword })}
         value={this.state.confirmPassword}
         autoCapitalize="none"
         />
         </View>
         <TouchableOpacity onPress={this.handleSignUp}>
          <SignInButton text={'إنشاء الحساب'} ></SignInButton>

         </TouchableOpacity>

         
         
         

       <TouchableOpacity >
            <Text 
            //onPress= {() => this.props.navigation.navigate('RegistrationServiceProvider')}
            style={styles.SignUpText}>
                تسجيل كمقدم للخدمة
            </Text>
        </TouchableOpacity>
         

              
        
        </View>
       
      
       
       
    )
}
}
            



const styles = StyleSheet.create({
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
    
    },
    TextInput:{
        
        flexDirection:'row-reverse',
        height: 30,
        alignSelf:'center',
        width: Dimensions.get('window').width *0.5,
        alignSelf:'center',
        borderColor: colors.primaryGrey,
        borderWidth: 1,
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white',
        textAlign:'right'   
        
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
