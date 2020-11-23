import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, StatusBar, Image, ImageBackground, ScrollView,SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { database, auth, storage } from "../config/firebase";
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons,Feather } from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
import { QRCode } from 'react-native-custom-qr-codes';
import SignInButton from "../components/SignInButton";
import { DatePicker } from 'native-base'



export default class editOffer extends React.Component  {  
    constructor(props){
        super(props);
        console.log(props);
        const offerKey = props?.route?.params?.offerKey;
        this.state={
          OfferId : offerKey , 
          
        }
      }
      

    state = {
        title: "",
        Descripiton: "",
        OfferId:'',
        expdate:"",
        code:"",
        
        
    
      };
    
    
componentDidMount(){
   
  const readData =  (Descripiton,expdate,title,code) => {
   this.setState({
     Descripiton: Descripiton,
     expdate: expdate,
     title: title,
    code : code
   });
 };

// console.log(this.props.navigation.getParam())

  var self = this;
  database.ref('serviceProvider/'+ auth.currentUser.uid+ "/offers")
  .once('value')
  .then(function(snapshot){
    const offers = snapshot.val();
    const offersDetails = offers[self.state.OfferId];
    console.log('snapshot', snapshot.val());
    var Descripiton=  (offersDetails.Descripiton)
    var expdate =  (offersDetails.expdate)
    var title= (offersDetails.title)
    var code = offersDetails.code
   readData(Descripiton,expdate,title,code);
    });
    
    }
  


 
removeOffer=() => {
  console.log(this.state.OfferId);
 var spRef= database
      .ref()
      .child("serviceProvider")
      .child(auth.currentUser.uid)
      .child("offers").child(this.state.OfferId).remove()

  database.ref().child('Offers').child(this.state.OfferId).remove()

    //also removed from used and favorited offers 

.catch(error => alert(error)).then(Alert.alert('تم حذف العرض بنجاح'))
.then(this.props.navigation.pop())


//deleting used offers and favorite offers as well 
var usedofferRef = database.ref().child('usedOffers').child(this.state.OfferId)
var favoriteofferRef = database.ref().child('favorites').child(this.state.OfferId)

if (usedofferRef){
  usedofferRef.once('value', snapshot =>{
    var data = snapshot.val()
    if (data){
      
    }
  })
}
}

  handleUpdate = () => {
    //   var userId = auth.currentUser.uid;

  database.ref('serviceProvider/'+ auth.currentUser.uid + "/offers").child(this.state.OfferId).
  update({ 
  'Descripiton': this.state.Descripiton, 
  'expdate': this.state.expdate,
  'title': this.state.title,
  'code': this.state.code,

      }).catch(Alert.alert('error occured')).then(Alert.alert('successful update'))

  }

 

 handleDateChange = expdate => {
     this.setState({ expdate: expdate  });
  };


 confirmDelete =() =>{
Alert.alert(
    'حذف ',
    'هل انت متأكد من حذف العرض؟',
    [
      {
        text: 'نعم',
        onPress: () => {this.removeOffer()},
        style: 'default'
      },
      {
        text: 'لا',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
    ],
    { cancelable: false }
  )};
 

  
render(){
 
    return (

      <View style={styless.container}>
         <ScrollView style={styles.scrollView}>
          <StatusBar backgroundColor='#0278ae' barStyle='light-content' />
        

          <SafeAreaView > 
                    <View style={styless.headerContainer}>
                    <TouchableOpacity>
                     <Entypo name='chevron-left' size={30} color={colors.primaryBlue} style={{ alignSelf: 'flex-start' }} onPress={() => this.props.navigation.goBack()} />
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row-reverse',alignSelf:'flex-end' }}>
                    <Text style={styless.headerText} >
                    تفاصيل العرض
                    </Text>
                    <Image source={require('../images/logoDis.jpg')} style={{ width: 100, height: 60, alignSelf: "center" }} />
                    </View>
                    </View>
              </SafeAreaView> 


            {/* error message appear here */}
            {!!this.state.errors && (
              <View style={styles.header}>
                <Text style={styles.errors}>{this.state.errorMessage}</Text>
              </View>
            )}
         

          <View style={styless.footer}>
            <Text style={styless.text_footer}>العنوان</Text>
            <View style={styless.action}>
              <TextInput style={styless.textInput}
                autoCapitalize="none"
                textAlign='right'
                onChangeText={title => this.setState({ title: title })}
                value={this.state.title} />
            </View>



            <Text style={styless.text_footer}>الوصف</Text>
            <View style={styless.action}>
              <TextInput style={styless.textInput}
                autoCapitalize="none"
                onChangeText={Descripiton => this.setState({ Descripiton: Descripiton })}
                textAlign='right'
                value={this.state.Descripiton} 
                />
            </View>
 
            
          
                {/* <Text style={styless.text_footer}>التاريخ</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={expdate =>this.setState( { expdate: expdate} ) }
                  value={this.state.expdate}
                  textAlign='right'/>
                  
                </View> */}
                 <Text style={styless.text_footer}>تاريخ إنتهاء العرض</Text>
                 <TouchableOpacity style={styles.forgotPasswordView}>
                    <Text style={styles.forgotPassword}>
                        {this.state.expdate}
          </Text>
                </TouchableOpacity>
                
            <View style={styless.action}>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                value={this.state.expdate}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                mode={'date'}
                placeHolderText={this.state.expdate}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                textAlign={'right'}
                onDateChange={expdate => this.handleDateChange(expdate)}
                disabled={false}
              />
            </View>

                
 
                <View>
                <Text style={styless.text_footer}>الرمز الترويجي</Text>

                  <View style={styless.action0}>

                    <TextInput 
                   placeholder='ادخل الرمز' 
                   style={styless.textInput}
                   autoCapitalize="none" 
                   textAlign='right'
                   onChangeText={code =>this.setState( { code: code} ) }
                   value={this.state.code}/>
                   
                    </View>

                    {this.state.code == '' ? <View></View> :
                <View style={styles.container}>
                  <QRCode content={this.state.code}
                    logo={require('../images/logo.png')} />
                </View>}

            

              {/* </ImageBackground> */}
            </View>
                
 
 
                <View style={{ flexDirection: 'row-reverse',alignItems:'center',justifyContent:'space-evenly'}}>
                {/* <View style={styless.buttom}> */}
                    <TouchableOpacity style={[styless.signIn,{backgroundColor:colors.primaryBlue,alignSelf:'center'}]} onPress={this.handleUpdate} >
                    <View
                        style={styless.signIn}
                    >   
                      <View style={{flexDirection:'row-reverse',justifyContent:'center'}}>
                    <MaterialCommunityIcons
                    name={'check'}
                    size={25}
                    color={'white'}
                    style={{marginHorizontal:5}}
                    /> 
                    <Text style={[styless.textSign, { color: '#fff' }]}>حفظ</Text>
                       </View> 
                    </View>  
                    </TouchableOpacity> 
                    {/* <View style={styles.container} > */}
                        <TouchableOpacity style={[styless.signIn ,{backgroundColor:colors.primaryGrey,alignSelf:'flex-end'}]}   onPress={this.confirmDelete}>
                      <View style={{flexDirection:'row-reverse',justifyContent:'center'}}>
                      <MaterialCommunityIcons
                      name={'trash-can-outline'}
                      size={25}
                      color={'white'}
                      style={{marginHorizontal:5}}
                      />
                        <Text style={[styless.textSign, { color: '#fff' }]}>حذف</Text>

                        </View>
                  </TouchableOpacity>
                   {/* </View> */}
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


const screenWidth  = Dimensions.get("window").width;
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
    header1:{
      color:'#0278ae',
      fontWeight:'bold',
      fontSize:25,
      marginLeft:150,
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
    header1:{
      color: '#0278ae',
      fontWeight: 'bold',
      fontSize: 25,
      alignSelf:'center'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        //marginLeft:200,
        alignSelf:'flex-end',
        marginTop:15

        
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
        paddingBottom: 5
 
    },
    action0: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5

  },
    textInput: {
        flex: 1,
        marginTop:  12,
        paddingLeft: 10,
        color: 'grey'
    },
    
    signIn: {
        width:screenWidth*0.3,
        height: 50,
        alignSelf:'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
 
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center'
    },  
    headerContainer:{
      width: screenWidth,
      height:80,
      alignItems: "center",
      textAlign: "center" ,
      flexDirection:'row',
},
  headerText:{
      color:colors.primaryBlue,
      fontSize:30,
     // alignSelf: "center",
     // textAlign:'center',
      
    
  },
    
 
 
});