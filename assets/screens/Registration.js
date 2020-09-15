import React, { useState , Component} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button} from 'react-native'
import colors from '../constants/colors'
import  SignInButton from '../components/SignInButton'
import firebase from '../config/firebase'
// import firebase auth 




 export default class Registration extends Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    
    render(){
    return (
       <View style={styles.container}>

        <Image 
        source = {require('../images/logo.png')} 
        style={{
            width: Dimensions.get('window').height *0.25,
           
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
         onChangeText={email => this.setState({ email })}
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
         <TouchableOpacity onPress={this.handleLogin}>
         <SignInButton text={'إنشاء الحساب'} onPress={this.handleLogin}></SignInButton>
         </TouchableOpacity>

         
         
         

       <TouchableOpacity >
            <Text 
            onPress= {() => this.props.navigation.navigate('RegistrationServiceProvider')}
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
        width: Dimensions.get('window').width *0.5,
        borderColor: colors.primaryGrey,
        borderWidth: 1,
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white'

        
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
