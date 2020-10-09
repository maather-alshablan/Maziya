import React , {Component} from 'react'
import {Text, View, StyleSheet,  TextInput,KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
import colors from '../constants/colors'
import InputField from '../components/InputField'
import {auth, database} from '../config/firebase'
import NextArrowButton from '../components/NextArrowButton'
import {Entypo} from '../constants/icons'
import Notification from '../components/Notification';




export default class resetPassword extends Component  {
  state = { enteredPassword:'', ConfirmPassword:'',errorMessage: null, textInput:'' ,formValid: true,}
   
  

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTransparent: true,
    headerTintColor: 'white'
  });

  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

  forgotPassword = () => {

    if (this.state.enteredPassword === "" ) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى ادخال جميع البيانات",
      });
    }
    if (this.state.enteredPassword.length < 8 || this.state.enteredPassword.length > 15) {
      
      this.setState({ errorMessage: 'يرجى التأكد من ادخال كلمة المرور من ٨ - ١٥ خانة ', formValid: false })
      return;
    }

    if (this.state.enteredPassword !== this.state.ConfirmPassword) {
    
      this.setState({ errorMessage:     "يرجى التأكد من مطابقة كلمة المرور"
      , formValid: false })
      return;
    }


       auth.currentUser.updatePassword(this.state.enteredPassword)
      .then(function () {
        Alert.alert('تم  تعديل كلمة المرور ')
        
      }).catch(error => this.setState({ errorMessage: 'يرجى التأكد من ادخال البيانات بالشكل الصحيح', formValid: false })
      )
    

      if (this.state.formValid)
      this.props.navigation.pop()

    };
  

       

  handleEmailChange = email => {
    this.setState({ email: email });
  };

  
render() {
  const showNotification = this.state.formValid ? false : true;

  return (
    <KeyboardAvoidingView style={[ pg.wrapper]}
      behavior="padding"
    >
             <Entypo name='chevron-left' size={30} color='white'  style={{marginTop:40}} onPress={()=> this.props.navigation.pop()} />

        <View style={pg.form}>
          <Text style={pg.ForgotPasswordHeading}>
                تغيير كلمة المرور
          </Text>
        
          
          <InputField
            customStyle={{ marginTop: 50 }}
            textColor='white'
            labelText=" كلمة المرور الجديدة"
            labelTextSize={14}
            labelColor='white'
            borderBottomColor='white'
            inputType="password"
            secureTextEntry
            textAlign='right'
            onChangeText={pass => this.setState({enteredPassword: pass}) }
          />

<InputField
            customStyle={{ marginTop: 50 }}
            textColor='white'
            labelText=" تأكيد كلمة المرور "
            labelTextSize={14}
            labelColor='white'
            secureTextEntry
            borderBottomColor='white'
            inputType="password"
            textAlign='right'
            onChangeText={pass => this.setState({ConfirmPassword: pass}) }
          />
      </View> 
      
      <NextArrowButton handelPress={this.forgotPassword} disabled={false} 
      style={{
        marginTop:50
      }}/>
        <Notification
            showNotification={showNotification}
            handleCloseNotification={this.handleCloseNotification}
           // title="Error"
            message={this.state.errorMessage}
          />
    
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
        color: '#FFFFFF',
        fontWeight: "600",
        fontSize: 15,
        textAlign:'right'
      }

    });