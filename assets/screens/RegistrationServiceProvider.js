import React, { Component } from "react";
 import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button, ColorPropType, Alert} from 'react-native'
import colors from "../constants/colors";
import styles from '../constants/styles'
import icons from '../constants/icons'
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import SignUpButton from '../components/SignUpButton'
import RegButton from '../components/RegButton'
import {firebase, auth }  from '../config/firebase';
import RegNotification from '../components/RegNotification';
import {ImagePicker } from 'expo'
import { TouchableHighlight } from 'react-native-gesture-handler'
 

export default class RegistrationServiceProvider extends Component {
  state = {userName:"",phoneNum:"", email: "", password: "", confirmPassword: "", nameBrand:"",Descripiton:"", errorMessage: null };
 
  
  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

  
  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

   handleSignUp = () => {

      
      if (this.state.password !== this.state.confirmPassword) {
        this.state.formValid= false;
        alert("يرجى التأكد من مطابقة كلمة المرور")  
          return;
          
      }
      if(this.state.email === '' && this.state.password === '') {
        this.state.formValid= false;
        alert(" يرجى ادخال جميع البيانات")
        return;
          
        }
        if(this.state.email == '' || this.state.password == '' || this.state.confirmPassword == '') {
          this.state.formValid= false;
          alert(" يرجى ادخال جميع البيانات")
          
          return;
          
        }
onpress
    

      if ( this.state.password.length < 8 ) { 
        this.state.errorMessage= "the password should be 8 charecters or more";
         this.state.formValid= false;
  
        alert("يرجى ادخال كلمة مرور مكونة من ٨ خانات او اكثر") 
        return 
    }
    auth.
     createUserWithEmailAndPassword(this.state.email, this.state.password)
     .then(() => 
     this.props.navigation.navigate('Homescreen') 
     ).catch(error => this.setState({ errorMessage: 'يرجى التأكد من ادخال البريد الالكتروني و كلمة المرور الصحيح' }))

     this.state.errorMessage="";
}



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

  onChooseImgePress = async () => {
       let result = await ImagePicker.launchCameraAsync();
       //let result = await ImagePicker.launchImageLibraryAsync();
  if (!result.cancelled ){
    this.UploadImage(result.uri , "test-image ")
    .then(() => {
Alert.alert("sucess ")
    })
    .catch ((error) => { 
      Alert.alert(error);
  });
      }
    }
      UploadImage= async (uri, imgName) => {
    const response = await fatch(uri);
    const blob = await response.blob();

    var ref = firbase.storage().re().child("images/"+ imgName);
    return ref.put(blob);
      }


  render() {
    const showNotification = this.state.formValid ? false : true;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header}>تسجيل مزود الخدمة</Text>
        </View>

        <View style={{ flex: 1 }}>
          <ProgressSteps
            activeStepIconBorderColor={colors.primaryBlue}
            activeLabelColor={colors.primaryBlue}
            completedProgressBarColor={colors.primaryBlue}
            completedStepIconColor={colors.primaryBlue}
          >
            <ProgressStep
              label="الحساب"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View>
                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫ </Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="*الاسم"
                    onChangeText={(userName) => this.setState({ userName })}
                    value={this.state.userName}
                    autoCapitalize="none"
                  /></View>
                  <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="*البريد الإلكتروني"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                    
                  /></View>
                  <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="رقم الجوال"
                    onChangeText={(phoneNum) => this.setState({phoneNum })}
                    value={this.state.phoneNum}
                    autoCapitalize="none"
                  />
                  </View>
                  <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="*كلمة المرور"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    autoCapitalize="none"
                    
                  />
                </View>
                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="*تأكيد كلمة المرور"
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    value={this.state.confirmPassword}
                    autoCapitalize="none"
                    
                  />
                </View>
              </View>
              
            </ProgressStep>
            <ProgressStep
              label="الوصف"
              previousBtnText="السابق"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={{ alignItems: "center" }}>
              <View style={styles.container}>
              <TouchableOpacity onPress={this.handleSignUp}>
                <RegButton text ={'choose photo'} onPress={this.onChooseImgePress}></RegButton>
                </TouchableOpacity>
              </View>
                
                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder=" وصف العلامة التجارية"
                    onChangeText={(Descripiton) => this.setState({Descripiton })}
                    value={this.state.Descripiton}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </ProgressStep>
            
            <ProgressStep
              label="الموقع"
              previousBtnText="السابق"
              nextBtnText ="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder=" وصف العلامة التجارية"
                    onChangeText={(Descripiton) => this.setState({Descripiton })}
                    value={this.state.Descripiton}
                    autoCapitalize="none"
                  />
                </View>
              <View style={{ alignItems: "center" }}>
              <Image 
        source = {require('../images/mapsmockup.png')} 
        style={{
            width: Dimensions.get('window').height *0.35,
           
        }}
        resizeMode = 'contain'
        />
              </View>
            </ProgressStep>
            <ProgressStep 
              label="العروض"
              previousBtnText="السابق"
              finishBtnText="تسجيل" 
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
              
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
               
                <TouchableOpacity onPress={this.handleSignUp}>
         <SignUpButton text={'إنشاء حساب'} onPress={this.handleSignUp}></SignUpButton>
         <RegNotification
            showNotification={showNotification}
            handleCloseNotification={this.handleCloseNotification}
            title="Error"
            message={this.state.errorMessage}
          />
         </TouchableOpacity>
              </View>
            </ProgressStep>
          
          </ProgressSteps>
          
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "white",
//   },

//   header: {
//     fontFamily: "Bradley Hand",
//     fontWeight: "bold",
//     fontSize: 35,
//     alignSelf: "center",
//     color: colors.primaryBlue,
//     marginTop: 15,
//     marginBottom: 15,
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "stretch",
//     justifyContent: "center",
//     borderRadius: 22.5,
//     borderWidth: 1,
//     borderColor: "rgba(247, 247, 247, 255)",
//     backgroundColor: "rgba(1, 132, 189, 255)",
//   },
//   nextButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "stretch",
//     justifyContent: "center",
//     color: colors.primaryGrey,
//     borderRadius: 22.5,
//     borderWidth: 0.1,
//     borderColor: colors.primaryGrey,
//     backgroundColor: colors.primaryBlue,
//   },
//   buttonText: {
//     textAlign: "center",
//   },
// });
