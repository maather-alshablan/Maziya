import React, { useState, Component } from 'react'
import { Image, Text, Alert, TouchableOpacity, View, Label, StyleSheet, KeyboardAvoidingView } from 'react-native'
import colors from '../constants/colors'
import { Entypo } from '../constants/icons'
import InputField from '../components/InputField'
import NextArrowButton from '../components/NextArrowButton'
import Notification from '../components/Notification';
import { firebase, auth, database } from '../config/firebase';
import { TouchableHighlight } from 'react-native-gesture-handler'





export default class Registration extends Component {

  state = { name: '', email: '', password: '', confirmPassword: '', errorMessage: null, formValid: true, }


  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

  handleSignUp = () => {


    if (this.state.password !== this.state.confirmPassword) {
      this.state.formValid = false;
      alert("يرجى التأكد من مطابقة كلمة المرور")
      return;

    }
    if (this.state.email === '' && this.state.password === '') {
      this.state.formValid = false;
      alert(" يرجى ادخال جميع البيانات")
      return;

    }
    if (this.state.email == '' || this.state.password == '' || this.state.confirmPassword == '') {
      this.state.formValid = false;
      alert(" يرجى ادخال جميع البيانات")

      return;

    }

    if (this.validate(this.state.email) === false) {
      this.state.formValid = false;
      alert("يرجى ادخال البريد الالكتروني المستخدم لمنسوبي الجامعة")
      return;
    }

    if (this.state.password.length < 8) {
      this.state.errorMessage = "the password should be 8 charecters or more";
      this.state.formValid = false;

      alert("يرجى ادخال كلمة مرور مكونة من ٨ خانات او اكثر")
      return
    }

    /*if ( islegalpassword (password) ) {
         alert("the password should contain capital late, small late and number")
          return 
    }*/


    auth.
      createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        this.successfulRegistration()
      }
      )
      .catch(
        () => this.setState({ errorMessage: 'يرجى التأكد من ادخال البيانات بالشكل الصحيح', formValid: false }))

    if (this.state.errorMessage == '') {

    }
  }

  successfulRegistration = () => {
    auth.currentUser.sendEmailVerification().then((response) => {
      // this.writeUserData
      this.setState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      Alert.alert('please check email')
    }).catch(function (error) {
      // An error happened.
      console.log('did not qritrw')
    });

  }

  writeUserData = () => {

    userid = auth.currentUser.uid;

    database.ref().child('users').child(userid).set({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      accountType: 'member',
    }).then(this.props.navigation.navigate('Homescreen')).catch(error => console.log(error)
    );
  }

  // validate email 
  // ref: https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e

  validate = text => {
    console.log(text);
    const testS = this.state.email
    const test1 = testS.endsWith('ksu.edu.sa')
    const test2 = testS.endsWith('student.ksu.edu.sa')

    if (!test1 || !test1) {
      console.log("Email is Not Correct");
      this.setState({ errorMessage: 'يرجى ادخال البريد الالكتروني المستخدم لمنسوي الجامعة' })
      return false;
    }
    else {
      console.log("Email is Correct");
    }
  }

  handleNameChange = name => {
    // parent class change handler is always called with field name and value
    this.setState({ name: name });
  };
  handleEmailChange = email => {
    // parent class change handler is always called with field name and value
    this.setState({ email: email });
  };
  handlePasswordChange = password => {
    // parent class change handler is always called with field name and value
    this.setState({ password: password });
  };

  handleconfirmPasswordChange = password => {
    // parent class change handler is always called with field name and value
    this.setState({ confirmPassword: password });
  };




  /* isLegalPassword =( {text}) =>{
 
       if (!text.matches(".*[A-Z].*")) return false;
  
       if (!text.matches(".*[a-z].*")) return false;
  
       if (!text.matches(".*[0-9]")) return false;
  
       return true;
  }*/



  render() {
    const showNotification = this.state.formValid ? false : true;

    return (

      <KeyboardAvoidingView
        style={[pg.wrapper]}
        behavior="padding"
      >

        <Entypo name='chevron-left' size={30} color='white' style={{ marginTop: 40 }} onPress={() => this.props.navigation.pop()} />

        <View style={pg.form}>
          <Text style={pg.ForgotPasswordHeading}>
            إنشاء حساب مستخدم جديد
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
            onChangeText={this.handleNameChange}
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
            onChangeText={this.handleEmailChange}
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
            showCheckmark={this.state.password === "12345"}
            onChangeText={this.handlePasswordChange}
          />

          <InputField
            customStyle={{ marginTop: 40 }}
            textColor='white'
            labelText="تأكيد كلمة المرور"
            labelTextSize={14}
            labelColor='white'
            borderBottomColor='white'
            secureTextEntry
            inputType="password"
            textAlign='right'
            onChangeText={this.handleconfirmPasswordChange}
          />


        </View>




        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistrationServiceProvider')}>

          <Text style={pg.ForgotPasswordSubHeading}   >
            تسجيل كمقدم للخدمة؟
             </Text>
        </TouchableOpacity>

        <NextArrowButton handelPress={this.handleSignUp} disabled={false} />

        <Notification
          showNotification={showNotification}
          handleCloseNotification={this.handleCloseNotification}
          title="Error"
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
  header: {

    fontFamily: "Bradley Hand",
    fontWeight: "bold",
    fontSize: 35,

    color: colors.primaryBlue,
    marginTop: 50,
    marginBottom: 100

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
  buttonStyle: {
    "flexDirection": "row",
    "alignItems": "center",
    "paddingStart": 50,
    "paddingTop": 4,
    paddingBottom: 4,
    "width": 150,
    "height": 40,
    margin: 15,
    marginTop: 20,
    "borderRadius": 22.5,
    "borderWidth": 1,
    "borderColor": "white",
    "backgroundColor": "rgba(1, 132, 189, 255)"

  },
  textButton: {

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
    marginTop: 0
  },
  ForgotPasswordSubHeading: {
    color: 'white',
    fontWeight: "800",
    fontSize: 15,
    textAlign: 'center',
    marginRight: 150,
    marginTop: 20

  }

});


