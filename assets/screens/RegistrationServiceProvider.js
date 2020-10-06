import React, { Component, useState } from "react";
import {
  ImageEditor,
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
  LogBox,
  KeyboardAvoidingView ,

} from "react-native";
import colors from "../constants/colors";
import styles from "../constants/styles";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome,
} from "../constants/icons";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import SignUpButton from "../components/SignUpButton";
import RegButton from "../components/RegButton";
import { database, auth, storage } from "../config/firebase";
import Notification from "../components/Notification";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// import ModalDropdown from 'react-native-modal-dropdown';

// import DropDownPicker from 'react-native-dropdown-picker';


export default class RegistrationServiceProvider extends Component {
  constructor(props) {
    super(props);

    this.onNextFirstStep = this.onNextFirstStep.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  state = {
    image: "https://imgplaceholder.com/72x80",
    userName: "reem",
    phoneNum: "0553524206",
    email: "reo@gmail.com",
    password: "rEEm1997",
    confirmPassword: "rEEm1997",
    nameBrand: "",
    Descripiton: "",
<<<<<<< HEAD
    category:"",
    website:"",
    twitter:"",
    instagram:"",
=======
    category: "",
>>>>>>> a8fc9e84af62bcf661f06f700e0196935e40e5c8
    errorMessage: null,
    isValid: false,
    errors: false,
    category: "المطاعم"
  };
  validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };
  onNextFirstStep = () => {
    let valid = true;
    if (this.state.phoneNum.length != 10) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: " يرجى التأكد من ادخال رقم التواصل يالصيغة  0XXXXXXXXX ",
      });
    }

    if (this.state.password !== this.state.confirmPassword) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى التأكد من مطابقة كلمة المرور",
      });
    }

    if (this.state.email === "" && !this.validateEmail(this.state.email)) {
      valid = false; // reem
      this.setState({
        errors: true,
        errorMessage: "يرجى كتابة بريد الكتروني صحيح",
      });
    }

    if (this.state.userName === ""){ 
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى ادخال جميع البيانات",
      });
    }
    if (this.state.password === "" ) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى ادخال جميع البيانات",
      });
    }
    if (this.state.password.length < 8) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى ادخال كلمة مرور مكونة من ٨ خانات او اكثر",
      });
    }
    if (valid) {
      this.setState({
        errors: false,
      });
    }
  };

  onNextsecondtStep = () => {
    let valid = true; 
    if (this.state.nameBrand === "" ) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى ادخال جميع البيانات",
      });
    }
    if (this.state.Descripiton === "" ) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى ادخال جميع البيانات",
      });
    }
    if (this.state.uri === "" && this.state.uri === "https://imgplaceholder.com/72x80" ) {
      valid = false;
      this.setState({
        errors: true,
        errorMessage: "يرجى إختيار صورة"
      });
    }
    if (valid) {
      this.setState({
        errors: false,
      });
    }
  
  }


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
    console.log("handleSignUp", this.state);
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((resp) => this.writeUserData(resp))
      .catch((e) => {
        console.log("error", e);
        this.setState({
          errorMessage: e.message,
          errors: true,
        });
      });
  };

  writeUserData = (resp) => {
    console.log("writeUserData", resp);

    const userid = resp.user.uid;
    // first let us upload the image on storage, no need to insert it into database
    // we will use the UID as image name for exmaple,
    // let say uid is 1dsdsmn it will be 1dsdsmn.jpg on storage

    this.UploadImage(this.state.image, userid);

    database
      .ref()
      .child("users")
      .child(userid)
      .set({
        name: this.state.userName,
        email: this.state.email,
        userid: userid,

        accountType: "serviceProvider",
      })
      .then(this.writeServiceProvider())
      .catch((error) => console.log(error));
  };

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
<<<<<<< HEAD
        imageref: "",
        website:"",
        twitter:"",
        instagram:"",
=======
        //image: this.state.uri,
>>>>>>> a8fc9e84af62bcf661f06f700e0196935e40e5c8
      })
      .then(this.props.navigation.navigate("SPhomescreen"))
      .catch((error) => console.log(error));
  };

  UploadImage = async (uri, imgName) => {
    console.log("UploadImage uri", uri);
    console.log("UploadImage imgName", imgName);
    const response = await fatch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("images/" + imgName);
    // database
    // .ref()
    // .child("serviceProvider")
    // .child(this.state.nameBrand)
    // .set({imageref: ref.put(blob) }

    return ref.put(blob);
  };

  render() {
    const showNotification = this.state.Valid ? false : true;
    console.disableYellowBox = true;

    let categories = [
      {
        value: "المطاعم",
      },
      {
        value: "المستلزمات",
      },
      {
        value: "الصحة",
      },
      {
        value: "الدورات",
      },
      {
        value: "التسوق",
      },
      {
        value: "الخدمات",
      },
    ];
    console.log(this.validateEmail(this.state.email));
    console.log("state", this.state);
    return (
      <View style={styles.container}>
        <Entypo
          name="chevron-left"
          size={30}
          color={colors.primaryBlue}
          style={{ alignSelf: "flex-start" }}
          onPress={() => this.props.navigation.navigate("Registration")}
        />

        <View style={styles.header}>
          <Text style={styles.header}>تسجيل مزود الخدمة</Text>
        </View>

        {this.state.errors && (
          <View style={styles.header}>
            <Text style={styles.errors}>{this.state.errorMessage}</Text>
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
              nextBtnTextStyle={{ color: "white", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
              onNext={this.onNextFirstStep}
              errors={this.state.errors}
            >
              <View>
                <View style={styles.fields}>
                  <MaterialCommunityIcons
                    name="account"
                    color={colors.primaryBlue}
                    size={30}
                    style={styles.fieldLabels}
                  />

                  <TextInput
                    style={styles.TextInput}
                    placeholder="*الاسم"
                    onChangeText={(userName) => this.setState({ userName })}
                    value={this.state.userName}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                  <MaterialCommunityIcons
                    name="email"
                    color={colors.primaryBlue}
                    size={30}
                    style={styles.fieldLabels}
                  />

                  <TextInput
                    style={styles.TextInput}
                    keyboardType="email-address"
                    placeholder="*البريد الإلكتروني"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                  <FontAwesome
                    name="phone"
                    color={colors.primaryBlue}
                    size={30}
                    style={styles.fieldLabels}
                  />

                  <TextInput
                    style={styles.TextInput}
                    placeholder="  (*** **** *05) رقم الجوال"
                    onChangeText={(phoneNum) => this.setState({ phoneNum })}
                    value={this.state.phoneNum}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                  <FontAwesome
                    name="lock"
                    color={colors.primaryBlue}
                    size={30}
                    style={styles.fieldLabels}
                  />
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
                  <FontAwesome
                    name="lock"
                    color={colors.primaryBlue}
                    size={30}
                    style={styles.fieldLabels}
                  />
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
              </View>
            </ProgressStep>
            <ProgressStep
              label="الوصف"
              previousBtnText="السابق"
              nextBtnText="التالي"
              onNext={this.onNextsecondtStep} 
              errors={this.state.errors} 
              nextBtnTextStyle={{ color: "white", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={{ alignItems: "center" }}>
                <View style={style.container}
                 >
                  <Image
                    style={styles.image}
                    source={{ uri: this.state.image }}
                  />
                  <TouchableOpacity onPress={this.openImagePickerAsync}>
                    <RegButton text={"choose photo"} ></RegButton>
                  </TouchableOpacity>
                </View>
                
                  
    
                <View style={styles.fields}>
                <FontAwesome name="tags" color={colors.primaryBlue} size={30} />
                  <TextInput
                    style={styles.TextInput}
                    placeholder=" اسم العلامة التجارية"
                    onChangeText={(nameBrand) =>
                      this.setState({ nameBrand })
                    }
                    value={this.state.nameBrand}
                    autoCapitalize="none"
                  />
                </View>
                

                <View style={styles.action}>
                    <TextInput style={{ height: 100 ,width : 200, borderColor: 'gray', borderWidth: 1 }} 
                    autoCapitalize="none" 
                    textAlign='right'
                    placeholder=" وصف العلامة التجارية"
                    value={this.state.Descripiton}
                    onChangeText={(Descripiton) =>
                      this.setState({ Descripiton })}/>
                </View>
                
                
                <View style={styles.fields}>
                  
                </View>
                <View style={styles.fields}>{/*<Upload/> */}</View>
                <View style={styless.fields}>
                <MaterialCommunityIcons name="web" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    name="websites"
                    placeholder=" الموقع الإلكتروني"
                    onChangeText= {(websites) => this.setState({websites})}
                    value={website}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styless.fields}>
                <MaterialCommunityIcons name="twitter" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder=" تويتر"
                    onChangeText={(twitter) => this.setState({ twitter })}
                    value={ twitter}
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styless.fields}>
                <MaterialCommunityIcons name="instagram" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder=" انستغرام"
                    onChangeText={(instagram) => this.setState( {instagram} )}
                    value={(instagram)}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </ProgressStep>

            <ProgressStep
              label="الموقع"
              previousBtnText="السابق"
              finishBtnText="إنشاء حساب"
              isComplete={true}
              onSubmit={this.handleSignUp}
              nextBtnTextStyle={{ color: "white", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >

              <View>
                <Image
                  source={require("../images/mapsmockup.png")}
    
                    style={{
                      height: 400,
                      width: 300

                    }}
                />
                {/* <TouchableOpacity onPress={this.handleSignUp}>
                  <SignUpButton
                    text={"إنشاء حساب"}
                    onPress={this.handleSignUp}
                  ></SignUpButton>
                </TouchableOpacity> */}
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
    padding: 20,
    margin: 10,}
  }) 
