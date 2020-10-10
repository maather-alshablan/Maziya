import React, { Component , useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, StatusBar ,Image,ImageBackground , ScrollView, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { database, auth,storage } from "../config/firebase";
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
<<<<<<< HEAD
import { QRCode } from 'react-native-custom-qr-codes';



  
=======
import serviceProvider from "./SPprofile";
//import { QRCode } from 'react-native-custom-qr-codes';


>>>>>>> 17601f07c1fc87e9ecff51da1f991f98450527c8

 
export default class NewOffer extends Component  {

    state = {
        title: "",
        Descripiton: "",
        OfferId:"",
        expiration:"",
        code:"",
        serviceProvider:'',
        errorMessage: null,
        errors: false,
      };
      
      componentDidMount(){ 
 

        database.ref('users/'+ auth.currentUser.uid).once('value').then(function(snapshot){
    
         var brand = ((snapshot.val() && snapshot.val().trademark))
          readData(brand)
          
        });
        
        const readData =  (brand) => {
        this.setState({
          nameBrand: brand,
          
        });
      };
    }

      handleChange = event => {
        this.setState({ OfferId: event.target.value });
      };

      checkvalid = () => {
        let valid = true;
        if (this.state.title === "" ) {
            valid = false;
            this.setState({
              errors: true,
              errorMessage: "يرجى ادخال العنوان",
            });
            return;
          }
    
          if (this.state.Descripiton === "" ) {
            valid = false;
            this.setState({
              errors: true,
              errorMessage: "يرجى ادخال الوصف",
            });
            return;
          }



          // if (this.state.expiration === "" ) {
          //   valid = false;
          //   this.setState({
          //     errors: true,
          //     errorMessage: "يرجى ادخال جميع البيانات",
          //   });
          //   return; }
          //   if (this.state.code === "" ) {
          //     valid = false;
          //     this.setState({
          //       errors: true,
          //       errorMessage: "يرجى ادخال جميع البيانات",
          //     });
          //     return;
        //  }

        if (valid) {
          this.setState({
            errors: false,
          });
        
        
        const serviceProvider=''
            var currentUser = auth.currentUser.uid
            var ref = database.ref().child("users/"+currentUser).once('value').then(function(snapshot) {
              serviceProvider= (snapshot.val() && snapshot.val().serviceProvider) })
           
              this.setState({serviceProvider: serviceProvider})
            
            var OfferId =  database.ref().child("Offers").push().key

            var newOffer = {
              serviceProvider:this.state.serviceProvider,
              descripiton: this.state.Descripiton,
              expiration: this.state.expDate ,
              title: this.state.title,
              code:this.state.code
            }
            var updates = {};
            updates['/Offers/' + OfferId] = newOffer;
            updates['/serviceProvider/' + this.state.serviceProvider + '/Offers/' + OfferId] = newOffer;
          
             database.ref().update(updates).then(Alert.alert('successful upload')).then(this.props.navigation.pop());
          
        
      }
<<<<<<< HEAD
 
    
      writeOfferSP = () => {
       console.log("serviceProvider");
      database
     .ref()
     .child("serviceProvider")
      .child(this.brand)
      .child("offers")
      .child(this.state.OfferId)
      .set({
       Descripiton: this.state.Descripiton,
     expDate: this.state.expDate ,
    splId: this.state.splId,
    title: this.state.title,
     })
     .then(this.props.navigation.navigate("SPhomescreen"))
     .catch((error) => console.log(error));
     };
=======
      //  checkTextInput = () => {
      // //   //Check  TextInput
      //   if (!handleNameChange.trim()) {
      //     alert('Please Enter Name');
      //     return;
      //    }
      // //   //Check for TextInput
      //    if (!handleDescripitonChange.trim()) {
      //      alert('Please Enter Email');
      //      return;
      //    }
      //    if (!handleOfferIdChange.trim()) {
      //      alert('Please Enter Email');
      //   return;
      //   }
      // //   //Checked Successfully
      // //   //Do whatever you want
      //  writeOfferSP();
      //  };

      //firebase 
    
        const writeOfferSP = () => {
  
            const serviceProvider=''
            var currentUser = auth.currentUser.uid
            var ref = database.ref().child("users/"+currentUser).once('value').then(function(snapshot) {
              serviceProvider= (snapshot.val() && snapshot.val().serviceProvider) })
           
              this.setState({serviceProvider: serviceProvider})
            
            var OfferId =  database.ref().child("Offers").push().key

            var newOffer = {
              serviceProvider:this.state.serviceProvider,
              descripiton: this.state.Descripiton,
              expiration: this.state.expDate ,
              title: this.state.title,
              code:this.state.code
            }
            var updates = {};
            updates['/Offers/' + OfferId] = newOffer;
            updates['/serviceProvider/' + this.state.serviceProvider + '/Offers/' + OfferId] = newOffer;
          
             database.ref().update(updates).then(Alert.alert('successful upload')).then(this.props.navigation.pop());
          };
        }

        //   .ref()
        //   .child("Offers")
        // database
        //   .ref()
        //   .child("Offers")
        //   .child(OfferId)
        //   .set({
        //     Descripiton: this.state.Descripiton,
        //     expiration: this.state.expDate ,
        //     title: this.state.title,
        //     code:this.state.code
        //   })
        //   .then(this.props.navigation.navigate("SPhomescreen"))
        //   .catch((error) => console.log(error));
      
>>>>>>> 17601f07c1fc87e9ecff51da1f991f98450527c8
      
 
render(){
    return (
        
        <View style={styless.container}>
            <ScrollView style={styles.scrollView}>
          <StatusBar backgroundColor='#0278ae' barStyle='light-content' />
          <TouchableOpacity>
         <Entypo name='chevron-left' size={30} color= {colors.primaryBlue }  onPress={()=> this.props.navigation.pop()} marginTop={50} />
         </TouchableOpacity>
            <View style={styless.header}>
                <Text style={styless.text_header}>اضافة عرض جديد</Text>
                   {/* error message appear here */}
                {this.state.errors && (
          <View style={styles.header}>
            <Text style={styles.errors}>{this.state.errorMessage}</Text>
          </View>
        )}
                <View >
                <Image source={require('../images/logoDis.jpg')} style={{width:100,height:100,marginLeft:120}}/>
                </View> 
            </View>
 
            
                <View style={styless.footer}>
                <Text style={styless.text_footer}>العنوان</Text>
                <View style={styless.action}>
                    <TextInput style={styless.textInput} 
                    autoCapitalize="none" 
                    textAlign='right'
                    placeholder='مثال: خصم ١٥٪ بالمئة '
                    onChangeText={(title) => this.setState({ title })}/>
                </View>
                
             

                <Text style={styless.text_footer}>الوصف</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={(Descripiton) => this.setState({ Descripiton })}
                  textAlign='right'/>
                </View>

                

                <Text style={styless.text_footer}>التاريخ</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={(date) => this.setState({ date })}
                  textAlign='right'/>
                </View>
                
 
                <View>
                {/* <ImageBackground source={require('../images/image.png')} style={{width:200,height:200,marginLeft:50}}> */}
                  <View style={styless.action}>
                    <TextInput placeholder='ادخل الرمز' style={styles.textInput,{paddingTop:50,marginLeft:120}} autoCapitalize="none" onChange={this.handleChange} value={this.state.OfferId}/>
                    </View>
                    <View>
                    
                    </View>
                    <View style={styles.container} >
                   
                     <QRCode content={this.OfferId}/> 
                   </View>

 
                {/* </ImageBackground> */}
                </View>
 
 
                
                <View style={styless.buttom}>
                    <TouchableOpacity style={styless.signIn} onPress={this.checkvalid} >
                    <LinearGradient
                        colors={['#0278ae', '#0278ae']}
                        style={styless.signIn}
                    > 
                        <Text style={[styless.textSign, { color: '#fff' }]}> إضافة عرض </Text>

                    </LinearGradient>
                    </TouchableOpacity>
                   
                </View>

                {
                    /* https://www.npmjs.com/package/react-native-qrcode-generator */
                }
            </View>
                
        
        </ScrollView>
    </View>
    )
}
 
}
 
 
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;
 
const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'white'
        
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop:20
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    text_header: {
      paddingTop:100,
        color: '#0278ae',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft:150
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginLeft:260,
        marginTop:10
        
    },
    buttom:{
       alignItems: 'flex-end',
        marginTop: 30
    },
   
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        padding: 10
 
    },
    textInput: {
        flex: 1,
        marginTop:  -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
 
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
    
 
 
});