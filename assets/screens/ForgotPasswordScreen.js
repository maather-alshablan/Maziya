import React , {Component} from 'react'
import {Text, View, StyleSheet,  TextInput,KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
import colors from '../constants/colors'
import InputField from '../components/InputField'
import {auth} from '../config/firebase'
import NextArrowButton from '../components/NextArrowButton'
import {Entypo} from '../constants/icons'




export default class ForgotPasswordScreen extends Component  {
  state = { email: '', errorMessage: null, textInput:'' }
   

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0
    },
    headerTransparent: true,
    headerTintColor: 'white'
  });


  forgotPassword = () => {
       auth.sendPasswordResetEmail(this.state.email)
      .then(function () {
        Alert.alert('تم ارسال طلب تعديل كلمة المرور على بريدك الإلكتروني')
        this.props.navigation.navigate("Login");
      }).catch(function (error) {
        Alert.alert(error.message);
      });
  }

  handleEmailChange = email => {
    this.setState({ email: email });
  };

  
render() {
  return (
    <KeyboardAvoidingView style={[ pg.wrapper]}
      behavior="padding"
    >
             <Entypo name='chevron-left' size={30} color='white'  style={{marginTop:10}} onPress={()=> this.props.navigation.navigate('Login')} />

        <View style={pg.form}>
          <Text style={pg.ForgotPasswordHeading}>
                نسيت كلمة المرور؟
          </Text>
          <Text style={pg.ForgotPasswordSubHeading}>
              ادخل بريدك الإلكتروني لأستعادة كلمة المرور
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
      </View> 
      
      <NextArrowButton handelPress={this.forgotPassword} disabled={false} 
      style={{
        marginTop:50
      }}/>
     
    
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