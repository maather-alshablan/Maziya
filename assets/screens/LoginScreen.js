
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button} from 'react-native'
import colors from '../constants/colors'
import  SignInButton from '../components/SignInButton'
import  ForgotPasswordLabel from '../components/ForgotPasswordLabel'
import LoginCheck from '../components/LoginCheck'


export default function LoginScreen ({navigation}) {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('') 
  var [ isPress, setIsPress ] = React.useState(false);

     
    
    var pressedProps = { 
    style: isPress ? styles.OptionSelected : styles.OptionUnselected, 
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    }

    return (
       <View style={styles.container}>

        <Image 
        source = {require('../images/logo.png')} 
        style={{
            width: Dimensions.get('window').height *0.35,
           
        }}
        resizeMode = 'contain'
        />


        <View style={styles.LoginOptions}>
        <TouchableOpacity>
            <Text style={styles.OptionSelected}>
                تسجيل الدخول
            </Text>
        </TouchableOpacity>
        
        <TouchableOpacity {...pressedProps}>
            <Text 
            onPress= {() => navigation.navigate('Registration')}
            style={styles.OptionUnselected}>
                سجل الأن
            </Text>
        </TouchableOpacity>
         </View> 



         <View style={styles.fields}>
             <Text>البريد الإلكتروني </Text>
         <TextInput 
         style={styles.TextInput}
         placeholder='البريد الإلكتروني'
         onChangeText={(text) => setEmail(text)}
         value={email}
         autoCapitalize="none"
         />
         </View>

         
         <View style={styles.fields}>
         <Text style={{
             marginRight:10,
         }}>كلمة المرور </Text>
        <TextInput 
         style={styles.TextInput}
         placeholder='كلمة المرور'
         secureTextEntry
         onChangeText={(text) => setPassword(text)}
         value={password}
         autoCapitalize="none"
         />
         </View>

         <SignInButton onPress={() => LoginCheck({email,password})}></SignInButton>


         <TouchableOpacity onPress = {
        navigation.navigate('Forgot')}>
         <ForgotPasswordLabel ></ForgotPasswordLabel>
         </TouchableOpacity>

                {/* <View >
                    
                    <Text onPress={onFooterLinkPress} >Sign up</Text>
                </View>*/ }
        </View>
          /* <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../images/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {LoginCheck} }>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
          </KeyboardAwareScrollView>*/
       
    )
            }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },

    logo:{
        
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
    LoginOptions:{
        flexDirection: 'row-reverse',
        alignItems: 'stretch',
        
        
    },
    OptionSelected:{
        marginHorizontal: 15,
        color: colors.primaryBlue,
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    OptionUnselected:{
        marginHorizontal: 15,
        color: colors.primaryGrey,
        fontSize: 20
    }
    
  });
  