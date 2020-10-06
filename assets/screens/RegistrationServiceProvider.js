import React, { Component, useState } from "react";
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
  LogBox,
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
//import {Dropdown }from 'react-native-material-dropdown';
export default class RegistrationServiceProvider extends Component {
  constructor(props) {
    super(props);

    this.onNextFirstStep = this.onNextFirstStep.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  state = {
    image: "https://imgplaceholder.com/72x80",
    userName: "",
    phoneNum: "",
    email: "na@adadma.com",
    password: "123456789",
    confirmPassword: "",
    nameBrand: "",
    Descripiton: "",
    category: "",
    errorMessage: null,
    isValid: false,
    errors: false,
    base64: "",
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
      this.setState({
        errors: true,
        errorMessage: "يرجى كتابة بريد الكتروني صحيح",
      });
    }

    if (this.state.userName === "" && this.state.password === "") {
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
    const {
      cancelled,
      uri,
      base64,
    } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });
    if (!cancelled) this.setState({ image: uri, base64 });
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

    const uploadedImage = this.UploadImage(this.state.base64, userid);
    console.log("UploadImage uploadedImage", uploadedImage);

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
        //image: this.state.uri,
      })
      .then(this.props.navigation.navigate("SPhomescreen"))
      .catch((error) => console.log(error));
  };

  UploadImage = async (base64, imgName) => {
    console.log("UploadImage imgName", imgName);
    var ref = storage.ref().child("images/" + imgName);
    console.log("UploadImage ref", ref);

    return ref.putString(base64).then(function (snapshot) {
      console.log("Uploaded a data_url string!", snapshot);
    });
  };

  render() {
    const showNotification = this.state.formValid ? false : true;
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
              nextBtnTextStyle={{ color: "#000000", fontSize: 20 }}
              nextBtnStyle={{ color: "#ddd" }}
              //onNext={this.onNextFirstStep}
              onPrevious={() => this.setState({ errors: false })}
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
              nextBtnTextStyle={{ color: "#000000", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
              onPrevious={() => this.setState({ errors: false })}
            >
              <View style={{ alignItems: "center" }}>
                <View style={styles.container}>
                  <Image
                    style={styles.image}
                    source={{ uri: this.state.image }}
                  />
                  <TouchableOpacity onPress={this.openImagePickerAsync}>
                    <RegButton text={"choose photo"}></RegButton>
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
              finishBtnText="إنشاء حساب"
              isComplete={true}
              onPrevious={() => this.setState({ errors: false })}
              onSubmit={this.handleSignUp}
              nextBtnTextStyle={{ color: "#000000", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={styles.fields}>
                <FontAwesome name="tags" color={colors.primaryBlue} size={30} />
                <Text style={styles.fieldLabels}> الفئة</Text>
              </View>

              <View>
                <Image
                  source={require("../images/mapsmockup.png")}
                  style={{
                    width: Dimensions.get("window").height * 0.35,
                  }}
                  resizeMode="contain"
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
