import React, { Component , useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, StatusBar ,Image,ImageBackground , ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { database, auth,storage } from "../config/firebase";
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
import { QRCode } from 'react-native-custom-qr-codes';


 

    
  

 
export default class editOffer extends Component  {  

    state = {
        title: "",
        Descripiton: "",
        OfferId:"",
        date:"",
        // splId:"",
        
      };
      
      
componentDidMount(){
   
  const readData =  (Descripiton,date,title) => {
   this.setState({
     Descripiton: Descripiton,
     date: date,
     title: title
   });
 };
 
  database.ref('users/'+ auth.currentUser.uid).once('value').
  then(function(snapshot){
    
    var username=  (snapshot.val() && snapshot.val().name)
    var email =  (snapshot.val() && snapshot.val().email)
   var title= (snapshot.val() && snapshot.val().title)
   readData(Descripiton,date,title);
    });
    

}


handleUpdate= ()=>{
    

database.ref('Offers/'+this.state.OfferId).update({
  'Description': this.state.Description,
  'date': this.state.date,
  'tilte': this.state.tilte,
  

}).catch(error => console.log(error)).then(console.log('successful update'))

}

handletitleChange = title => {
  this.setState({ title: title  });
};

handleDescripitonChange = Descripiton => {
  this.setState({ Descripiton: Descripiton  });
}

handleDateChange = date => {
    this.setState({ date: date  });
  };


      

    

     
 
render(){
    return (
        
        <View style={styless.container}>
            <ScrollView style={styles.scrollView}>
          <StatusBar backgroundColor='#0278ae' barStyle='light-content' />
          <TouchableOpacity>
         <Entypo name='chevron-left' size={30} color= {colors.primaryBlue }  onPress={()=> this.props.navigation.pop()} />
         </TouchableOpacity>
            <View style={styless.header}>
                <Text style={styless.text_header}> تعديل العرض </Text>
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
                    onChangeText={title => this.handletitleChange({title})}/>
                </View>
                
             

                <Text style={styless.text_footer}>الوصف</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={Description => this.handleDescriptionChange({Description})}
                  textAlign='right'/>
                </View>

                

                <Text style={styless.text_footer}>التاريخ</Text>
                <View style={styless.action}>
                  <TextInput style={styless.textInput} 
                  autoCapitalize="none" 
                  onChangeText={date => this.handledateChange({date})}
                  textAlign='right'/>
                </View>
                
 
                <View>
                {/* <ImageBackground source={require('../images/image.png')} style={{width:200,height:200,marginLeft:50}}> */}
                  <View style={styless.action}>
                    <TextInput placeholder='ادخل الرمز' style={styles.textInput,{paddingTop:50,marginLeft:120}} autoCapitalize="none" onChangeText={(OfferId) => this.setState({ OfferId })}/>
                    </View>
                    <View style={styles.container} >
                     <QRCode content='https://reactnative.com' />  
                   </View>
 
                {/* </ImageBackground> */}
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