import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button, ColorPropType} from 'react-native'
import colors from "../constants/colors";
import styles from '../constants/styles'
import {Entypo} from '../constants/icons'
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import SignUpButton from '../components/SignUpButton'
import {firebase, auth, database ,storage}  from '../config/firebase';
import RegNotification from '../components/RegNotification';
import { Dropdown } from 'react-native-material-dropdown';
import upload from '../components/UploadImage'
export default class RegistrationServiceProvider extends Component {
  state = {userName:"",phoneNum:"", email: "", password: "", confirmPassword: "", nameBrand:"", Descripiton:"",category:"", errorMessage: null, formValid:false,error:false };


onNextStep = () => {

        
  if (this.state.password !== this.state.confirmPassword) {
    this.state.formValid= false;
      this.state.errorMessage= 'يرجى التأكد من مطابقة كلمة المرور'
      return;
      
  }
  
  if (this.state.phoneNum < 10 ) {
    this.state.formValid= false;
      this.state.errorMessage= 'يرجى التأكد من ادخال رقم التواصل يالصيغة  0XXXXXXXXX '
      return;
      
  }
    if(this.state.userName == ''|| this.state.email == '' || this.state.password == '' || this.state.confirmPassword == '') {
      this.state.formValid= false;
      this.state.errorMessage='يرجى ادخال جميع البيانات'
      return;
      
    }

    if ( this.state.password.length < 8 ) { 
      alert("the password should be 8 charecters or more") 
      this.state.formValid=false
      return 
  }

  if (!this.state.formValid) {
    this.setState({ error: true });
  } else {
    this.setState({ error: false });
  }
};


  
  handleSignUp = () => {

    auth.
     createUserWithEmailAndPassword(this.state.email, this.state.password)
     .then(() => 
     this.writeUserData()
     ).catch(error => this.setState({ errorMessage: 'يرجى التأكد من ادخال البريد الالكتروني و كلمة المرور الصحيح' }))

     this.state.errorMessage="";
}

writeUserData = () => {

  userid = auth.currentUser.uid;
  
  database.ref().child('users').child(userid).set({
    name: this.state.userName,
    email: this.state.email,
    password: this.state.password,
    trademark: this.state.nameBrand,
    accountType : 'service provider', 
  }).then(
    this.writeServiceProvider()
    ).catch(error => console.log(error)
  );
}

writeServiceProvider = () => {
  database.ref().child('serviceProvider').child(this.state.nameBrand).set({
    Descripiton: this.state.Descripiton,
    category: this.state.category,
    phone: this.state.phoneNum,
    email: this.state.email,
    imageref:''
  }).then(this.props.navigation.navigate('Homescreen')).catch(error => console.log(error)
  );
}





  render() {

    let categories = [{
      label: 'مطاعم',
      value: 'مطاعم',
    }, {
      label: 'قهوة',
      value: 'قهوة',
    }, {
      label: 'صحة',
      value: 'صحة',
    }, {
      label: 'مستلزمات',
      value: 'مستلزمات',
    }, {
      label: 'تسوق',
      value: 'تسوق',
    }, {
      label: 'دورات ',
      value: 'دورات',
    }, {
      label: 'ورش عمل',
      value: 'دورات',
    }, {
      label: 'عناية',
      value: 'عناية',
    }];
    const showNotification = this.state.formValid ? false : true;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header}>تسجيل مزود الخدمة</Text>
          <Entypo name='chevron-left' size={30} color={colors.primaryBlue} style={{ marginTop:0, marginRight:340 }} onPress={()=> this.props.navigation.navigate('Registration')} />
        </View>
       

       
        <View style={{ flex: 1 }} >
          <ProgressSteps
            activeStepIconBorderColor={colors.primaryBlue}
            activeLabelColor={colors.primaryBlue}
            completedProgressBarColor={colors.primaryBlue}
            completedStepIconColor={colors.primaryBlue}
          >
            <ProgressStep onNext={this.onNextStep} errors={this.state.error}
              label="الحساب"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View>
                <View style={styles.fields}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="الاسم"
                    onChangeText={(userName) => this.setState({ userName })}
                    value={this.state.userName}
                    autoCapitalize="none"
                  /></View>
                  <View style={styles.fields}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="البريد الإلكتروني"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                    
                  /></View>
                  <View style={styles.fields}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="رقم الجوال"
                    onChangeText={(phoneNum) => this.setState({phoneNum })}
                    value={this.state.phoneNum}
                    autoCapitalize="none"
                  />
                  </View>
                  <View style={styles.fields}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="كلمة المرور"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    autoCapitalize="none"
                    
                  />
                </View>
                <View style={styles.fields}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="تأكيد كلمة المرور"
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    value={this.state.confirmPassword}
                    autoCapitalize="none"
                    
                  />
                </View>
              </View>
              
            </ProgressStep>
            <ProgressStep onNext={this.onNextStep} errors={this.state.error}
              label="الوصف"
              previousBtnText="السابق"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={{ alignItems: "center" }}>
              <View style={styles.fields}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="اسم العلامة التجارية "
                    onChangeText={(nameBrand) => this.setState({nameBrand })}
                    value={this.state.nameBrand}
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styles.fields}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder=" وصف العلامة التجارية"
                    onChangeText={(Descripiton) => this.setState({Descripiton })}
                    value={this.state.Descripiton}
                    autoCapitalize="none"
                  />
                  </View>
                  <View style={styles.fields} >
                  <Dropdown 
                  label='الفئة'
                  data={categories}
                  onChangeText={(category) => this.setState({category})} 
                  containerStyle={{ width:100,  marginLeft:150,textAlign:'right'
                }}/>
                </View>
                <View style={styles.fields}>
                <upload/> 
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
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
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