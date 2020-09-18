import React, { useState , Component} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button, KeyboardAvoidingView} from 'react-native'
import colors from '../constants/colors'
import {Entypo} from '../constants/icons'
import  SignInButton from '../components/SignInButton'
import InputField from '../components/InputField'
import NextArrowButton from '../components/NextArrowButton'
import {firebase, auth }  from '../config/firebase';





 export default class Registration extends Component {

    state = { email: '', password: '',confirmPassword:'', errorMessage: null }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0
        },
        headerTransparent: true,
        headerTintColor: 'white'
      });
    

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

      handleEmailChange = email => {
        this.setState({ email: email });
      };


    render(){
        return (

        <KeyboardAvoidingView
        style={[ pg.wrapper]}
        behavior="padding"
         ><View style={pg.form}>
            <Text style={pg.ForgotPasswordHeading}>
                  إنشاء حساب مستخدم جديد
            </Text>
           
            <InputField
              customStyle={{ marginTop: 50 }}
              textColor='white'
              labelText="البريد الإلكتروني"
              labelTextSize={14}
              labelColor='white'
              borderBottomColor='white'
              inputType="email"
              textAlign='right'
              onChangeText={email => this.handleEmailChange(email)}
            />
            <InputField
            customStyle={{ marginTop: 50 }}
            textColor='white'
            labelText="    كلمة المرور    "
            labelTextSize={14}
            labelColor='white'
            borderBottomColor='white'
            secureTextEntry
            textAlign='right'
            onChangeText={password => this.setState({ password })}
          />
          <InputField
          customStyle={{ marginTop: 50 }}
          textColor='white'
          labelText="تأكيد كلمة المرور"
          labelTextSize={14}
          labelColor='white'
          borderBottomColor='white'
          secureTextEntry
          textAlign='right'
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />


        </View> 
            
        <TouchableOpacity 
        //handelPress= {this.props.navigation.navigate('RegistrationServiceProvider')}
        >
        <Text style={pg.ForgotPasswordSubHeading} >          
          تسجيل كمقدم للخدمة           
             </Text>
             </TouchableOpacity>
       
        <NextArrowButton handelPress={this.handleSignUp} disabled={false} />
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
              marginTop: 90,
              paddingLeft: 20,
              paddingRight: 20,
              flex: 1,
            },
            ForgotPasswordHeading: {
              fontSize: 28,
              color: '#FFFFFF',
              fontWeight: "300",
              textAlign: 'right'
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
 

