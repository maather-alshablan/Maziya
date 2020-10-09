
import React, { Component , useState } from "react";
import { StyleSheet, Text, View, TextInput,Button, TouchableOpacity, Dimensions, Platform, StatusBar ,Image,ImageBackground , ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { database, auth,storage } from "../config/firebase";
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
//import { QRCode } from 'react-native-custom-qr-codes';





    


export default class serviceProvider extends Component{
     redeemOffer = () => {

    }
    
    state= {
        modal:false,
        brand:'',
        description:'',
        phone:'',
        website:'',
        twitter:'',
        instagram:'',
        //image:'',
        offers:[]
    }

  
componentDidMount(){
    const readData= (name,description,phone,website,twitter,instagram)=>{
        this.setState({
            brand:name,
            description:description,
            phone:phone,
            email:email,
            website:website,
            twitter:twitter,
            instagram:instagram,
            //image:image
                })
    }

        database.ref().child('users/'+auth.currentUser.uid).on("value").then(function(snapshot) {
          const name= ((snapshot.val() && snapshot.val().serviceProvider))
           
        database.ref().child('serviceProvider/'+name).on("value").then(function(snapshot) {
            var description=((snapshot.val() && snapshot.val().description))
            var email = ((snapshot.val() && snapshot.val().email))
           var  phone=((snapshot.val() && snapshot.val().phone))
           var website=((snapshot.val() && snapshot.val().website))
           var twitter=((snapshot.val() && snapshot.val().twitter))
          var  instagram=((snapshot.val() && snapshot.val().instagram))
          // var image=((snapshot.val() && snapshot.val().image))
        
        readData(name,email,description,phone,website,twitter,instagram);
    })
    })         
    }
componentDidUpdate(){
    this.componentDidMount()
    
}
   

   
        toggleModal = () => {
        this.setState({modal: !this.state.modal});
      };

      
    
     render(){

    return(
   
            <View style={styless.container}>
                 <ScrollView style={styles.scrollView}>

                    <View style={styless.header}>
                    <Text style={[styles.header]}>{this.state.brand}</Text>
                        <View >
                        <Image source={require('../images/logoDis.jpg')} style={{width:100,height:100,marginLeft:120}}/>
                        </View> 
                    </View>
    
                    <View style={styless.footer}>
                        <Text style={styless.text_footer}>عن مزود خدمة </Text>
                        <Text style={{alignSelf:'flex-end'}}>{this.state.description}</Text>

                        <View style={{alignSelf:'flex-end'}}>
                        <Text style={styless.text_footer}>تواصل</Text>
                        </View>
                        <View style={{flexDirection:"column"}}>

                         <TouchableOpacity>
                         <MaterialCommunityIcons
                        name="email"
                        color={colors.primaryBlue}
                        size={30}
                        style={styles.fieldLabels}
                        accessibilityValue={this.state.email}
                             /></TouchableOpacity>

                    {this.state.phone == '' ? <View></View>:
                    <TouchableOpacity>
                    <FontAwesome name="phone" color={colors.primaryBlue}size={30}style={styles.fieldLabels}
                    accessibilityValue={this.state.phone}/>
                    </TouchableOpacity> }
                    
                    {this.state.website == '' ? <View></View>:
                    <TouchableOpacity>
                    <MaterialCommunityIcons name="web" color={colors.primaryBlue} size={30} style={styles.fieldLabels} 
                    accessibilityValue={this.state.website} />
                    </TouchableOpacity>}

                    {this.state.twitter == '' ? <View></View>:
                    <TouchableOpacity>
                    <MaterialCommunityIcons name="twitter" color={colors.primaryBlue} size={30} style={styles.fieldLabels}
                    accessibilityValue={this.state.twitter} />
                    </TouchableOpacity> }

                    {this.state.instagram == '' ? <View></View>:
                    <TouchableOpacity>
                    <MaterialCommunityIcons name="instagram" color={colors.primaryBlue} size={30} style={styles.fieldLabels} 
                    accessibilityValue={this.state.instagram}/>
                    </TouchableOpacity>}
                    </View>

                        <View style={styless.action}>
                        <Text>

                        </Text>
                        </View>
                

                        <Text style={styless.text_footer}>الفروع</Text>
                        <View style={styless.action}>
                        <TextInput style={styless.textInput} 
                        autoCapitalize="none" 
                        textAlign='right'/>
                        </View>

                

                        <Text style={styless.text_footer}>العروض</Text>
                        <View style={styless.action}>
                        <TextInput style={styless.textInput} 
                        autoCapitalize="none"
                        textAlign='right'/>
                        </View>
                        </View>
 



                    <TouchableOpacity style={styles.ButtonContainer} onPress={this.toggleModal}  >
                        <Text style={styles.appButtonText} >استخدم العرض</Text>
                        <Modal 
                        isVisible={this.state.modal}
                        onBackdropPress={() => this.setState({modal: false})}>
                           <View style={styless.modal}>
                          < View>
                        <ImageBackground source={require('../images/image.png')} style={{width:200,height:200}}>    
                    </ImageBackground>
                    </View>
                               <Text>Hello!</Text>
                                 <Button title="Hide modal" onPress={this.toggleModal} />
                                    </View>
                               </Modal>
                    </TouchableOpacity>
                 </ScrollView>

                
            </View>
        )
}}

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
    footersub: {
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
        marginLeft:200,
        marginTop:10,
        alignSelf:'flex-end'
        
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
    },
    modal:{
        flex:1,
        backgroundColor:'white',
        flexDirection: 'column',
        justifyContent: 'center',
         alignItems: 'center',
        width: 330,
        //height: 100,
         marginVertical:100


    }
    
 
 
});
