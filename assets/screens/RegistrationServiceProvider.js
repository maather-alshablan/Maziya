import React, { Component , useState} from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Label,
  StyleSheet,
  Dimensions,
  Button,
  ColorPropType,
  Alert,
  LogBox
} from "react-native";
import colors from "../constants/colors";
import styles from "../constants/styles";
import {Entypo, Ionicons,MaterialIcons,MaterialCommunityIcons, Fontisto, FontAwesome} from "../constants/icons";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import SignUpButton from "../components/SignUpButton";
import RegButton from "../components/RegButton";
import { database, auth,storage } from "../config/firebase";
import Notification from "../components/Notification";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//import {Dropdown }from 'react-native-material-dropdown';



export default class RegistrationServiceProvider extends Component {
  state = {
    image: 'https://imgplaceholder.com/72x80',
    userName: "",
    phoneNum: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameBrand: "",
    Descripiton: "",
    category:"",
    errorMessage: null,
    isValid: false,
    errors: false,
  };

  onNextFirstStep = () => {

      if (!this.state.isValid) {
        this.setState({ errors: true });
      } else {
        this.setState({ errors: false });
      }
  
    console.log("onNextFirstStep");
    //  step one
    if (this.state.email === "" && this.state.password === "") {
      isValid = false ;
    return;
    }}


    


 
  /*onNextStep = () => {
    console.log("onNextStep");
    //step two
    if (this.state.email === "" && this.state.password === "") {
      this.setState({ errors: true });
    }
  };*/

  async componentDidMount() { 
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        
      }
    } else {
    }
  }

 

  openImagePickerAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({ image: uri });
  };

  // handleCloseNotification = () => {
  //   this.setState({ formValid: true });

  //   if (!this.state.formValid) {
  //     this.setState({ error: true });
  //   } else {
  //     this.setState({ error: false });
  //     this.state.formValid = true;
  //   }
  // };

  handleSignUp = () => {
     if (this.state.phoneNum.length != 10 ) {
      this.state.formValid = false;
      alert ('Alert', ' يرجى التأكد من ادخال رقم التواصل يالصيغة  0XXXXXXXXX ')

      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.state.formValid = false;
      alert("يرجى التأكد من مطابقة كلمة المرور");
      return;
    }
    if (this.state.email === "" && this.state.password === "") {
      this.state.formValid = false;
      alert(" يرجى ادخال جميع البيانات");
      return;
    }
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.confirmPassword == ""
    ) {
      this.state.formValid = false;
      alert(" يرجى ادخال جميع البيانات");

      return;
    }

    

    if (this.state.password.length < 8) {
      this.state.errorMessage = "the password should be 8 charecters or more";

      alert("يرجى ادخال كلمة مرور مكونة من ٨ خانات او اكثر");
      return;
    }
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.writeUserData() )
      .catch(() =>
        this.setState({
          errorMessage:
            "يرجى التأكد من ادخال البريد الالكتروني و كلمة المرور الصحيح",
        })
      );

    this.state.errorMessage = "";
  };
 
  writeUserData = () => {

    userid = auth.currentUser.uid;
    
    database.ref().child('users').child(userid).set({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      accountType : 'serviceProvider', 
    }).then(this.writeServiceProvider() 
    ).catch(error => console.log(error)
    );
  }

  writeServiceProvider = () => {
    console.log("here in service provider");
    database
      .ref()
      .child("serviceProvider")
      .child(this.state.nameBrand)
      .set({
        Descripiton: this.state.Descripiton,
        category: this.state.category,
        phone: this.state.phoneNum,
        email: this.state.email,
        image: this.state.uri,
      })
      .then(this.props.navigation.navigate("SPhomescreen"))
      .catch((error) => console.log(error));
  };

  

  // not tested .
  // UploadImage = async (uri, imgName) => {
  //   const response = await fatch(uri);
  //   const blob = await response.blob();

  //   var ref =
  //     storage.
  //     ref()
  //     .child("images/" + imgName);
  //   // database
  //   // .ref()
  //   // .child("serviceProvider")
  //   // .child(this.state.nameBrand)
  //   // .set({imageref: ref.put(blob) }

  //   return ref.put(blob);
  // }

  render() {
    const showNotification = this.state.formValid ? false : true;
    console.disableYellowBox = true; 

    let categories = [{
      
      value: 'المطاعم',
    }, {
      value: 'المستلزمات',
    }, {
      value: 'الصحة',
    },{
      value: 'الدورات',
    }, {
      value: 'التسوق',
    }, {
      value: 'الخدمات',
    }
  ];

    return (
      <View style={styles.container}>
        <Entypo name='chevron-left' size={30} color= {colors.primaryBlue } style={{alignSelf:'flex-start'}} onPress={()=> this.props.navigation.navigate('Registration')} />

        <View style={styles.header}>
          <Text style={styles.header}>تسجيل مزود الخدمة</Text>
        </View>
        {this.state.errors && (
          <View style={styles.header}>
            <Text style={styles.errors}>
              لايمكن الانتقال الى الخطوة القادمة
            </Text>
          </View>
        )}

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
              nextBtnTextStyle={{ color: "#fff", fontSize: 20 }}
              nextBtnStyle={{color: "#ddd" }}
              onNext= {this.onNextStep}
              errors={this.state.errors}
             
              
            >
              <View>
                <View style={styles.fields}>
                  
                  <MaterialCommunityIcons name="account" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />
                
                  <TextInput
                    style={styles.TextInput}
                    placeholder="*الاسم"
                    onChangeText={(userName) => this.setState({ userName })}
                    value={this.state.userName}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                  
                  <MaterialCommunityIcons name="email" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />

                  <TextInput
                    style={styles.TextInput}
                    placeholder="*البريد الإلكتروني"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                <FontAwesome name="phone" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />

                  <TextInput
                    style={styles.TextInput}
                    placeholder="  (*** **** *05) رقم الجوال"
                    onChangeText={(phoneNum) => this.setState({ phoneNum })}
                    value={this.state.phoneNum}
                    autoCapitalize="none"
                  />
                 
                </View>
                <View style={styles.fields}>
                <FontAwesome name="lock" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />
                  <TextInput
                    style={styles.TextInput}
                    secureTextEntry
                    placeholder="*كلمة المرور"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                <FontAwesome name="lock" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />
                  <TextInput
                    style={styles.TextInput}
                    secureTextEntry
                    placeholder="*تأكيد كلمة المرور"
                    onChangeText={(confirmPassword) =>
                      this.setState({ confirmPassword })
                    }
                    value={this.state.confirmPassword}
                    autoCapitalize="none"
                  />
                </View>
                <View>
                  <TouchableOpacity>
                    <Text >Next</Text>
                     
                  </TouchableOpacity>
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
                <Image
            style={styles.image} source={{ uri: this.state.image }} />         
                  <TouchableOpacity 
                  onPress={this.openImagePickerAsync} >
                    <RegButton
                      text={"choose photo"}
  
                      
                    ></RegButton>
                  </TouchableOpacity>
                  
                </View>

                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder=" وصف العلامة التجارية"
                    onChangeText={(Descripiton) =>
                      this.setState({ Descripiton })
                    }
                    value={this.state.Descripiton}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                   {/* <Dropdown
                    label="الفئة"
                    data={categories}
                    onChangeText={(category) => this.setState({ category })}
                    value={this.state.category}
                    containerStyle={{ width: 100, marginLeft: 150 }}
                  />  */}
                   </View>
                <View style={styles.fields}>{/*<Upload/> */}</View>
              </View>
            </ProgressStep>

            <ProgressStep
              label="الموقع"
              previousBtnText="السابق"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={styles.fields}>
              <FontAwesome name="tags" color={colors.primaryBlue} size={30}/>
                    <Text style={styles.fieldLabels}> الفئة</Text>
                
              </View>
              
                <View >
                <Image
                  source={require("../images/mapsmockup.png")}
                  style={{
                    width: Dimensions.get("window").height * 0.35,
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity onPress={this.handleSignUp}>
                  <SignUpButton
                    text={"إنشاء حساب"}
                    onPress={this.handleSignUp}
                  ></SignUpButton>
              

                </TouchableOpacity>
              </View>
            </ProgressStep>
          
          </ProgressSteps>
        </View>
      </View>
    );
  }
}

