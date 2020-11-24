import React, { Component, useState } from "react";
import Map from '../screens/map'
import {
  ImageEditor,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
 

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
import { database, auth, storage } from "../config/firebase";
import * as ImagePicker from "expo-image-picker";
import MapView, { PROVIDER_GOOGLE , Marker, Callout } from 'react-native-maps';
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
    image: '',
    userName: "",
    phoneNum: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameBrand: "",
    Description: "",
    category:"",
    imageref:'',
    website:"",
    twitter:"",
    instagram:"",
    errorMessage: null,
    isValid: false,
    errors: false, 
    isName:false,isEmail:false,isPass:false,isConfPass:false,isPhone:false,isBrand:false, isDes:false,
    errorMessageName:null,errorMessageEmail:null,errorMessagePass:null,errorMessageConfPass:null,errorMessagePhone:null,errorMessageBrand:null,errorMessageDis:null,
    region: {
      latitude: 24.7136,
      longitude: 46.6753,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    coordinate:null,
    showMap:false

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
        isPhone:true , 
        errors: true,
        errorMessagePhone: " *يرجى التأكد من ادخال رقم التواصل يالصيغة  0XXXXXXXXX ",
      });
    }
    else {
      this.setState({ 
        isPhone:false , 
        
      });
    }

    if (this.state.password !== this.state.confirmPassword ) {
      valid = false;
      this.setState({
        isConfPass:true,
        errors: true,
        errorMessageConfPass: "*يرجى التأكد من مطابقة كلمة المرور",
      });
    }
    else {
      this.setState({
        isConfPass:false,
      });
    }
    if (this.state.email === "" && !this.validateEmail(this.state.email)) {
      valid = false; // reem
      this.setState({
        isEmail:true,
        errors: true,
        errorMessageEmail: "*يرجى كتابة بريد الكتروني صحيح",
      });
    }
    else {
      this.setState({
        // errors: false,
        isEmail:false
      });
    }

    if (this.state.userName === ""){ 
      valid = false;
      this.setState({
        errors: true,
        errorMessageName: "*يرجى ادخال إسم",
        isName:true
      });
    }
    else {
      this.setState({
        // errors: false,
        isName:false
      });
    }
    if (this.state.password === "" ) {
      valid = false;
      this.setState({
        isPass:true,
        errors: true,
        errorMessagePass: "*يرجى ادخال كلمة المرور",
      });
    }
    else {
      this.setState({
        isPass:false , 
        // errors: false,
      });
    }
    if (this.state.password.length < 8) {
      valid = false;
      this.setState({
        isPass:true,
        errors: true,
        errorMessagePass: "*يرجى ادخال كلمة مرور مكونة من ٨ خانات او اكثر",
      });
    }
    else {
      this.setState({
        isPass:false , 
        // errors: false,
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
        isBrand:true , 
        errors: true,
        errorMessageBrand: "*يرجى ادخال اسم العلامة التجارية",
      });
    }
    else{
      this.setState({
        isBrand:false , 
      });
    }
    if (this.state.Description === "" ) {
      valid = false;
      this.setState({
        isDes:true , 
        errors: true,
        errorMessageDis: "يرجى ادخال الوصف ",
      });
    }
    else{
      this.setState({
        isDes:false , 
      });
    }
 
    
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
     
  //   if (!pattern.test(this.state.website)){
  //     setValid(false);
  //     setErrorMessage("يرجى ادخال الموقع الإلكتروني بالشكل الصحيح")
  //     return; 
  //   }
    
  
   
  //   if (!this.state.twitter.startsWith('@')){
  //     setValid(false);
  //     setErrorMessage("يرجى ادخال حساب تويتر بالصيغة @example")
  //     return; 
  //   }
  
  
  //   const twitterExp =  /^(?:@)([A-Za-z0-9_]){1,15}$/
  //   if (!twitterExp.test(this.state.twitter) ){
  //     setValid(false);
  //     setErrorMessage("يرجى ادخال حساب تويتر بالشكل الصحيح")
  //     return;
  //   }
  //   if (valid) {
  //     this.setState({
  //       errors: false,
  //     });
  //   }
  
  // }

  }
  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
      }
    } 
  }

  openImagePickerAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!result.cancelled) this.setState({ image: result.uri});
  };



  handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((resp) => this.writeUserData())
      .catch((e) => {
        console.log("error", e);
        this.setState({
          errorMessage: e.message,
          errors: true,
        });
      });
  };

  writeUserData = () => {
  //  console.log("writeUserData");

    
    // first let us upload the image on storage, no need to insert it into database
    // we will use the UID as image name for exmaple,
    // let say uid is 1dsdsmn it will be 1dsdsmn.jpg on storage

    this.UploadImage(this.state.image, this.state.nameBrand);

    database
      .ref()
      .child("users")
      .child(auth.currentUser.uid)
      .set({
        name: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        serviceProvider: this.state.nameBrand,
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
      .child(auth.currentUser.uid)
      .set({
        description: this.state.Description,
        nameBrand:this.state.nameBrand , 
        category: this.state.category,
        email:auth.currentUser.email,
        phone: this.state.phoneNum,
        website:this.state.website,
        twitter:this.state.twitter,
        instagram:this.state.instagram,
        coordinate: this.state.coordinate
      }).then(this.props.navigation.navigate("SPhomescreen"))
      .catch((error) => console.log(error));
  };

  UploadImage = async (uri, imgName) => {

    const metadata = {
      contentType: 'image/jpeg',
    };
    const imageRef = "images/"+imgName+'.png';
    const StorageRef = storage.ref().child(imageRef)
    const task = StorageRef.put(this.state.image,metadata)
    .then(console.log('successfully uploaded to firebase' ))
    .catch(console.log('failure image upload'))
    .then( this.setState({image: imageRef}))

   
    //incase of memory leak error
    // return() =>{
    //   StorageRef();
    //   task()
    //   subscrition()
    }
  
    locationHandler = event =>{

      const coord = event.nativeEvent.coordinate;
      this.setState({coordinate:{
        latitude: coord.latitude,
        longitude: coord.longitude
      }})
    }


    showMap = () =>{
      this.setState({showMap:true})
    }
  render() {
    //const showNotification = this.state.Valid ? false : true;
    console.disableYellowBox = true;
    console.log(this.state.coordinate)

   // console.log(this.validateEmail(this.state.email));
  //  console.log("state", this.state);
    return (
      <View style={styles.container}>
        <Entypo
          name="chevron-left"
          size={30}
          color={colors.primaryBlue}
          style={{ alignSelf: "flex-start" }}
          onPress={() => this.props.navigation.pop()}
        />

        <View style={styles.header}>
          <Text style={styles.header}>تسجيل مزود الخدمة</Text>
        </View>

        {/* {this.state.errors && (
          <View style={styles.header}>
            <Text style={styles.errors}>{this.state.errorMessage}</Text>
          </View>
        )} */}
        
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
              nextBtnTextStyle={{ color: colors.primaryBlue, fontSize: 18  }}
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
                <View style={styles.ErrorView} >
                { this.state.isName ?
<               Text style={styles.ErrorView}>{this.state.errorMessageName}</Text> : <Text></Text>}
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
                <View style={styles.ErrorView} >
                { this.state.isEmail ?
<               Text style={styles.ErrorView}>{this.state.errorMessageEmail}</Text> : <Text></Text>}
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
                <View style={styles.ErrorView} >
                { this.state.isPhone ?
<               Text style={styles.ErrorView}>{this.state.errorMessagePhone}</Text> : <Text></Text>}
                </View>
                <View style={styles.fields}>
                  <FontAwesome
                    name="lock"
                    color={colors.primaryBlue}
                    size={30}
                    style={styles.fieldLabels}
                  />
                  <TextInput
                    style={styles.TextInputPass}
                    secureTextEntry = {true}
                    placeholder="*كلمة المرور"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    autoCapitalize="none"
                  />
                  
                </View>
                <View style={styles.ErrorView} >
                { this.state.isPass ?
<               Text style={styles.ErrorView}>{this.state.errorMessagePass}</Text> : <Text></Text>}
                </View>
                <View style={styles.fields}>
                  <FontAwesome
                    name="lock"
                    color={colors.primaryBlue}
                    size={30}
                    style={styles.fieldLabels}
                  />
                  <TextInput
                    style={styles.TextInputPass}
                    secureTextEntry = {true}
                    placeholder="*تأكيد كلمة المرور"
                    onChangeText={(confirmPassword) =>
                      this.setState({ confirmPassword })
                    }
                    value={this.state.confirmPassword}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.ErrorView} >
                { this.state.isConfPass ?
<               Text style={styles.ErrorView}>{this.state.errorMessageConfPass}</Text> : <Text></Text>}
                </View>
              </View>
            </ProgressStep>
            <ProgressStep
              label="الوصف"
              previousBtnText="السابق"
              nextBtnText="التالي"
              onNext={this.onNextsecondtStep} 
              errors={this.state.errors} 
              nextBtnTextStyle={{ color: colors.primaryBlue, fontSize: 18  }}
              previousBtnTextStyle={{ color: colors.primaryBlue, fontSize: 18  }}
            >
              <View style={{ alignItems: "center" }}>
                <View style={styles.container}
                 >
                   <TouchableOpacity onPress={this.openImagePickerAsync}>
                   <Image style={styles.newImage} source={{ uri: this.state.image }} />
                  {/* <Image
                    style={styles.image}
                    source={{ uri: this.state.image }}
                  /> */}
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
                <View style={styles.ErrorView} >
                { this.state.isBrand ?
<               Text style={styles.ErrorView}>{this.state.errorMessageBrand}</Text> : <Text></Text>}
                </View>
<View></View>
<View></View>
<View></View>
                <View style={styles.action}>
                    <TextInput style={{ height: 100 ,width : 300, borderColor: 'gray', borderWidth: 1 }} 
                    multiline={true}
                    numberOfLines={4}
                    autoCapitalize="none" 
                    textAlign='right'
                    placeholder=" وصف العلامة التجارية"
                    onChangeText={ Description =>this.setState({ Description })}
                    value= {this.state.Description}/>

                </View>
                <View style={styles.ErrorView} >
                { this.state.isDes ?
<               Text style={styles.ErrorView}>{this.state.errorMessageDis}</Text> : <Text></Text>}
                </View>
                
                <View style={styles.fields}>
                <FontAwesome name="link" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />
                  <TextInput
                  secureTextEntry = {false}
                    style={styles.TextInput}
                    placeholder=" الموقع الإلكتروني"
                    onChangeText={website => this.setState({ website })}
                    value={this.state.website}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.fields}>
                <MaterialCommunityIcons name="twitter" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />
                  <TextInput
                  secureTextEntry = {false}
                    style={styles.TextInput}
                    placeholder=" تويتر"
                    onChangeText={twitter => this.setState({ twitter })}
                    value={this.state.twitter}
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styles.fields}>
                <MaterialCommunityIcons name="instagram" color={colors.primaryBlue} size={30} style={styles.fieldLabels} />
                  <TextInput
                  secureTextEntry = {false}
                    style={styles.TextInput}
                    placeholder=" انستغرام"
                    onChangeText={instagram => this.setState({ instagram })}
                    value={this.state.instagram}
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
              nextBtnTextStyle={{ color: colors.primaryBlue, fontSize: 18  }}
              previousBtnTextStyle={{ color: colors.primaryBlue, fontSize: 18  }}
            >
              <View>
              <Text style={{color:colors.primaryBlue, alignSelf:'flex-end', fontSize:25}}>
                   الفرع
              </Text>
      
              </View>
            
              <TouchableOpacity onPress={ this.showMap}>
              {this.state.showMap ==false ?
              <View style={{flexDirection:'row-reverse',margin:15}}>
             
              <MaterialCommunityIcons name="plus" color={colors.primaryBlue} size={30} />
             <Text style={{fontSize:20}}>
                إضافة فرع 
              </Text>
              </View> :<View></View>}
                  </TouchableOpacity> 
              

             { this.state.showMap ? <View>
              <MapView
        provider={PROVIDER_GOOGLE} 
        style={style.map}
        region={this.state.region }
        showsUserLocation={true}
        zoom={10}
      >
        {/* {this.mapMarkers()} */}
        <Marker 
        draggable
        //key={1}
        coordinate={this.state.region}
        title={'موقعي '}
        pinColor={colors.primaryBlue} 
        onDragEnd = { e => this.locationHandler(e)}
        >
          
        </Marker>
      </MapView>
      { this.state.coordinate?
      <View>
        <Text style={{color:'green',alignSelf:'center'}}> تم حفظ الموقع بنجاح</Text>
        </View> : <View></View>}
      </View> : <View></View>} 
  
        { this.state.coordinate==null && this.state.showMap ?
      <View>
        <Text style={{color:colors.primaryGrey,alignSelf:'center'}}> يرجى تحديد الموقع على الخارطة </Text>
        </View> : <View></View>}



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
    margin: 10,},
    map: {
      height: 500,
    width: 420,
    marginTop:40,
    justifyContent: 'flex-end',
    alignItems: 'center',
      ...StyleSheet.absoluteFillObject,
    }
  }) 
