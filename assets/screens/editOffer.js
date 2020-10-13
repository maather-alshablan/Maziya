import React, { Component , useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, StatusBar ,Image,ImageBackground , ScrollView,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { database, auth,storage } from "../config/firebase";
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
import { QRCode } from 'react-native-custom-qr-codes';
import SignInButton from "../components/SignInButton";


 

    
  

 
export default class editOffer extends Component  {  
    constructor(){
        super();
        this.state={
            OfferId : this.state.OfferId2 , 
        }
      }

    state = {
        title: "",
        Descripiton: "",
        OfferId:"",
        expdate:"",
        OfferId2:"",
        
        
    
      };
    
      handleOfferIdChange = () => {
        this.setState({ OfferId2: this.state.OfferId  });}
    
componentDidMount(){
   
  const readData =  (Descripiton,expdate,title,OfferId) => {
   this.setState({
     Descripiton: Descripiton,
     expdate: expdate,
     title: title,
     OfferId:OfferId,
   });
 };
 
  database.ref('serviceProvider/'+ auth.currentUser.uid+ "/offers")
  .once('value')
  .then(function(snapshot){
    
    console.log('snapshot', snapshot.val());
    var Descripiton=  (snapshot.val() && snapshot.val().Descripiton)
    var expdate =  (snapshot.val() && snapshot.val().expdate)
    var title= (snapshot.val() && snapshot.val().title)
    var OfferId= (snapshot.val() && snapshot.val().OfferId)
   readData(Descripiton,expdate,title,OfferId);
    });
    

}

removeOffer=() => {
database.ref('serviceProvider/'+ auth.currentUser.uid + "/offers").remove()
.catch(error => alert(error)).then(Alert.alert('successful delete'))
.then(this.props.navigation.navigate("SPhomescreen"))}

handleUpdate= ()=>{
//   var userId = auth.currentUser.uid;

  database.ref('serviceProvider/'+ auth.currentUser.uid + "/offers").update({ 
  'Descripiton': this.state.Descripiton, 
  'expdate': this.state.expdate,
  'title': this.state.title,
  'OfferId': this.state.OfferId,

}).catch(error => alert(error)).then(Alert.alert('successful update'))

}

// handletitleChange = title => {
//   this.setState({ title: title  });
// };



// handleDateChange = expdate => {
//     this.setState({ expdate: expdate  });
//   };


 

    

     
 
render(){
    return (
        
        <View style={styless.container}>
            <ScrollView style={styles.scrollView}>
          <StatusBar backgroundColor='#0278ae' barStyle='light-content' />
          <TouchableOpacity>
         <Entypo name='chevron-left' size={30} color= {colors.primaryBlue }  onPress={()=> this.props.navigation.pop()} />
         </TouchableOpacity>
            <View style={styless.header}>
                <Text style={styless.header1}> تعديل العرض </Text>
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
                    onChangeText={title =>this.setState( { title: title} ) }
                    value={this.state.title}/>
                </View>
                
             

                <Text style={styless.text_footer}>الوصف</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={Descripiton =>this.setState( { Descripiton: Descripiton} ) }
                  textAlign='right'
                  value={this.state.Descripiton}/>
                </View>

                

                <Text style={styless.text_footer}>التاريخ</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={expdate =>this.setState( { expdate: expdate} ) }
                  value={this.state.expdate}
                  textAlign='right'/>
                </View>
                
 
                <View>
                {/* <ImageBackground source={require('../images/image.png')} style={{width:200,height:200,marginLeft:50}}> */}
                  <View style={styless.action}>
                    <TextInput 
                   placeholder='ادخل الرمز' 
                  
                   style={styless.TextInput,{paddingTop:50,marginLeft:120}}
                   autoCapitalize="none" 
                   onChangeText={OfferId =>this.setState( { OfferId: OfferId} ) }
                   value={this.state.OfferId}/>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.handleOfferIdChange}>
                        <SignInButton text={'QR تحديث'} onPress={this.handleOfferIdChange}></SignInButton>
                        </TouchableOpacity>
                      </View>
                    <View style={styles.container} >
                   
                     <QRCode content={this.state.OfferId2} 
                     logo={require('../images/logo.png')} /> 
                   </View>
                </View>
 
 
                
                <View style={styless.buttom}>
                    <TouchableOpacity style={styless.signIn} onPress={this.handleUpdate} >
                    <LinearGradient
                        colors={['#0278ae', '#0278ae']}
                        style={styless.signIn}
                    > 
                        <Text style={[styless.textSign, { color: '#fff' }]}> تعديل عرض </Text>

                    </LinearGradient>  
                    </TouchableOpacity> 
                    <View style={styles.container} >
                        <TouchableOpacity onPress={this.removeOffer} >
                   <MaterialCommunityIcons
                    name="delete"
                    color={"red"}
                    size={30}
                    style={styles.fieldLabels}
                  />
                  </TouchableOpacity>
                   </View>
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
        paddingBottom: 5
 
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