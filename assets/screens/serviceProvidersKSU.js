
import React, { Component , useState } from "react";
import { StyleSheet, Text, View, Linking, TextInput,Button, TouchableOpacity, Dimensions, Clipboard, Platform, StatusBar ,Image,ImageBackground , ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { database, auth,storage } from "../config/firebase";
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
import { QRCode } from 'react-native-custom-qr-codes';
//import listOfferSP from '../components/ListOfferSP';




    


export default class serviceProvider extends Component{
     redeemOffer = () => {
    
    }
    
    state= {
        modal:false,
        favorite:false,
        brand:'',
        description:'',
        email:'',
        phone:'',
        website:'',
        code:'code123',
        twitter:'',
        instagram:'',
        userType:'',
        //image:'',
        offers:[]
    }

     fetchData= () =>{
        
                this.setState({brand:'zara'})
        
                database.ref().child('serviceProvider/zara').once("value").then(function(snapshot) {
                    
                    var description=((snapshot.val() && snapshot.val().description))
                    var email = ((snapshot.val() && snapshot.val().email))
                   var  phone=((snapshot.val() && snapshot.val().phone))
                   var website=((snapshot.val() && snapshot.val().website))
                   var twitter=((snapshot.val() && snapshot.val().twitter))
                  var  instagram=((snapshot.val() && snapshot.val().instagram))
                  // var image=((snapshot.val() && snapshot.val().image))
                  readData(name,email,description,phone,website,twitter,instagram);
                
                })
        

            const readData= (name,email,description,phone,website,twitter,instagram) => {
           this.setState({
                    brand:name,
                    description:description,
                    phone:phone,
                    email: email,
                    website:website,
                    twitter:twitter,
                    instagram:instagram,
                    //image:image
           })
        } 

      //  this.fetchOffers;
          }


    fetchOffers=()=>{
       
        
        database.ref().child("serviceProvider/"+this.state.brand+'/Offers').on('child_added', data => {
            var list = []
        list.push({
          title: data.val().title,
          description: data.val().description,
          code: data.val().code,
          expiration:data.val().expiration
        });
        this.setState({offers:list});
        });    
    }


    listOffers= () => {

        if( this.state.offers.length)
        return (
        this.state.offers.map( offer => 
          <Card 
        title={offer.title}
        content={offer.description}
        iconName="local-offer"
        iconType="MaterialIcons"
        iconBackgroundColor= {colors.primaryBlue}
        //bottomRightText={offer.expiration}
        //onPress={() => {}}
        />
        ))
      }

UNSAFE_componentWillMount(){
 
  //  this.fetchData();    

    }

   
        toggleModal = () => {
        this.setState({modal: !this.state.modal});
      };

       copyToClipboard = () => {
        Clipboard.setString(this.state.code)
      }
      
      toggleFavorite= () => {
        this.setState({favorite: !this.state.favorite});
      };

    
     render(){
    return(
   
            <View style={styless.container}>
                 <ScrollView style={styles.scrollView}>

                    <View style={styless.header}>
                    <Entypo name='chevron-left' size={30} color={colors.primaryBlue}  style={{marginTop:40}} onPress={()=> this.props.navigation.pop()} />

                    <TouchableOpacity style={{alignSelf:'flex-end' ,marginTop:10}}
                    onPress={this.toggleFavorite}>
                    <MaterialCommunityIcons 
                    name={ this.state.favorite? "heart" : "heart-outline"}  
                     color={colors.primaryBlue} 
                     size={30} 
                     />
                    </TouchableOpacity>
                    <Text style={[styles.header]}>{this.state.brand}</Text>
                        <View >
                        <Image source={require('../images/logoDis.jpg')} style={{width:100,height:100,marginLeft:120}}/>
                        </View> 
                    </View>
                    
                    <View style={styless.footer}>
                        <Text style={styless.text_footer}>???? ???????? ???????? </Text>

                        <Text style={{alignSelf:'flex-end'}}>
                            {this.state.description}
                            
                            </Text>

                        <View style={{alignSelf:'flex-end'}}>
                        <Text style={styless.text_footer}>??????????????</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>

                         <TouchableOpacity>
                         <MaterialCommunityIcons
                        name="email"
                        color={colors.primaryBlue}
                        size={30}
                        style={styles.fieldLabels}
                        onPress={() => {Linking.openURL('mailto:'+this.state.email)}} />
                             </TouchableOpacity>

                    {this.state.phone == '' ? <View></View>:
                    <TouchableOpacity>
                    <FontAwesome name="phone" color={colors.primaryBlue}size={30}style={styles.fieldLabels}
                    accessibilityValue={this.state.phone}/>
                    </TouchableOpacity> }
                    
                    {this.state.website == '' ? <View></View>:
                    <TouchableOpacity>
                    <MaterialCommunityIcons name="web" color={colors.primaryBlue} size={30} style={styles.fieldLabels} 
                    accessibilityValue={this.state.website} onPress={() => {
                        Linking.openURL('https://'+this.state.website);
                      }}/>
                    </TouchableOpacity>}

                    {this.state.twitter == '' ? <View></View>:
                    <TouchableOpacity>
                    <MaterialCommunityIcons name="twitter" color={colors.primaryBlue} size={30} style={styles.fieldLabels}
                    accessibilityValue={this.state.twitter} 
                    onPress={() => {
                        Linking.openURL('https://twitter.com/'+this.state.twitter);
                      }}
                    
                    />
                    </TouchableOpacity> }

                    {this.state.instagram == '' ? <View></View>:
                    <TouchableOpacity>
                    <MaterialCommunityIcons name="instagram" color={colors.primaryBlue} size={30} style={styles.fieldLabels} 
                    onPress={() => {
                        Linking.openURL('https://instagram.com/'+this.state.instagram);
                      }}/>
                    </TouchableOpacity>}
                    </View>

                        <View style={styless.action}>
                        <Text>

                        </Text>
                        </View>
                

                        <Text style={styless.text_footer}>????????????</Text>
                        <View style={styless.action}>
                        </View>

                

                        <Text style={styless.text_footer}>????????????</Text>
                        <View style={styless.action}>
                        {/* {listOfferSP(this.state.brand)} */}
                        </View>
                        </View>
 



                    <TouchableOpacity style={styles.ButtonContainer} onPress={this.toggleModal()}  >
                        <Text style={styles.appButtonText} >???????????? ??????????</Text>
                        <Modal 
                        isVisible={this.state.modal}
                        onBackdropPress={() => this.setState({modal: false})}>
                           <View style={styless.modal}>
                          < View>
                          <QRCode
          value={this.state.code}
          size={200}
          bgColor='black'
          fgColor='white'/>
                    </View>
                                <TouchableOpacity onPress ={()=> this.copyToClipboard()}>
                                <Text style={styles.text_footer}>???????? ??????????</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity onPress={() => {
                       Linking.openURL('https://'+this.state.website);
                      }}>
                                <Text style={{color:colors.primaryBlue}}>  {this.state.brand}  ???????????? ?????????? </Text>
                                </TouchableOpacity>

                                 <Button title="??????????" onPress={this.toggleModal} />
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
         marginVertical:100, 
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomEndRadius:10,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            overflow: 'hidden',
        


    }
    
 
 
});
