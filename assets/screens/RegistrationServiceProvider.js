import React, { Component } from "react";
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
} from "react-native";
import colors from "../constants/colors";
import styles from "../constants/styles";
import icons from "../constants/icons";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import SignUpButton from "../components/SignUpButton";
import RegButton from "../components/RegButton";
import { firebase, auth } from "../config/firebase";
import Notification from "../components/Notification";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class RegistrationServiceProvider extends Component {
  state = {
    userName: "",
    phoneNum: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameBrand: "",
    Descripiton: "",
    errorMessage: null,
    errors: false,
  };

  onNextFirstStep = () => {
    console.log("onNextFirstStep");
    //  step one
    if (this.state.email === "" && this.state.password === "") {
      this.setState({ errors: true });
    }
    
  };

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
    console.log("openImagePickerAsync");
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log("status", status);

    if (status === "granted") {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
    }
  };

  handleCloseNotification = () => {
    this.setState({ formValid: true });

    if (!this.state.formValid) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      this.state.formValid = true;
    }
  };

  handleSignUp = () => {
    if (this.state.phoneNum != 10) {
      this.state.formValid = false;
      this.state.errorMessage =
        "يرجى التأكد من ادخال رقم التواصل يالصيغة  0XXXXXXXXX ";
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
      this.state.formValid = false;

      alert("يرجى ادخال كلمة مرور مكونة من ٨ خانات او اكثر");
      return;
    }
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Homescreen"))
      .catch((error) =>
        this.setState({
          errorMessage:
            "يرجى التأكد من ادخال البريد الالكتروني و كلمة المرور الصحيح",
        })
      );

    this.state.errorMessage = "";
  };
  // firebase not sure !
/*
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
        imageref: "",
      })
      .then(this.props.navigation.navigate("SPhomescreen"))
      .catch((error) => console.log(error));
  };*/

  handleEmailChange = (email) => {
    // parent class change handler is always called with field name and value
    this.setState({ email: email });
  };
  handlePasswordChange = (password) => {
    // parent class change handler is always called with field name and value
    this.setState({ password: password });
  };

  handleconfirmPasswordChange = (password) => {
    // parent class change handler is always called with field name and value
    this.setState({ confirmPassword: password });
  };

  // openImagePickerAsync = async () => {
  //   console.log("openImagePickerAsync");
  //   let result = await ImagePicker.launchCameraAsync();
  //   //let result = await ImagePicker.launchImageLibraryAsync();
  //   if (!result.cancelled) {
  //     this.UploadImage(result.uri, "test-image ")
  //       .then(() => {
  //         Alert.alert("sucess ");
  //       })
  //       .catch((error) => {
  //         Alert.alert(error);
  //       });
  //   }
  // };

  // not tested .
  UploadImage = async (uri, imgName) => {
    const response = await fatch(uri);
    const blob = await response.blob();

    var ref = firbase
      .storage()
      .re()
      .child("images/" + imgName);
    return ref.put(blob);
  };

  render() {
    const showNotification = this.state.formValid ? false : true;
    return (
      <View style={styles.container}>
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
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
              onNext={this.onNextFirstStep}
              errors={this.state.errors}
              
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
                  />
                </View>
                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="*البريد الإلكتروني"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="  (*** **** *05) رقم الجوال"
                    onChangeText={(phoneNum) => this.setState({ phoneNum })}
                    value={this.state.phoneNum}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
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
                  <Text style={styles.fieldLabels}>⚫</Text>
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
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={{ alignItems: "center" }}>
                <View style={styles.container}>
                  <TouchableOpacity onPress={this.handleSignUp}>
                    <RegButton
                      text={"choose photo"}
                      onPress={this.openImagePickerAsync}
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
                    containerStyle={{ width: 100, marginLeft: 150 }}
                  /> */}
                </View>
                <View style={styles.fields}>{/*<Upload/> */}</View>
              </View>
            </ProgressStep>

            <ProgressStep
              label="الموقع"
              previousBtnText="السابق"
              finishBtnText="تسجيل"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={styles.fields}>
                <Text style={styles.fieldLabels}>⚫</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder=" وصف العلامة التجارية"
                  onChangeText={(Descripiton) => this.setState({ Descripiton })}
                  value={this.state.Descripiton}
                  autoCapitalize="none"
                />
                
              </View>
              <View style={{ alignItems: "center" }}>
              <Image source={require("../images/mapsmockup.png")} alt="Girl in a jacket" width="500" height="600"/>
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
            {/*remove step*/}
          
          </ProgressSteps>
        </View>
      </View>
    );
  }
}
