
import React, { Component , useState } from "react";
import { StyleSheet, Text, View, Linking, TextInput,Button,Card, FlatList, TouchableOpacity, Dimensions, Clipboard, Platform, StatusBar ,Image,ImageBackground , ScrollView} from 'react-native';
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
        userType:'',
        key:null,
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

        database.ref().child('users/'+auth.currentUser.uid).once("value").then(function(snapshot) {
             //     var type= snapshot.val().accountType;
            // if (type == 'serviceProvider'){
            const name= ((snapshot.val() && snapshot.val().serviceProvider))  //change name to key
           // const ref =  database.ref().child('serviceProvider/'+auth.current.uid)
     //     }              
            // else {
             //    const key = this.props.navigation.state.params.Key
             //const ref =  database.ref().child('serviceProvider/'+key)

             // var favorite = snapshot.val().favorites  < capture favorited or not 
             // 
            

           //  }
                database.ref().child('serviceProvider/'+name).once("value").then(function(snapshot) {
                    var description=((snapshot.val() && snapshot.val().description))
                    var email = ((snapshot.val() && snapshot.val().email))
                   var  phone=((snapshot.val() && snapshot.val().phone))
                   var website=((snapshot.val() && snapshot.val().website))
                   var twitter=((snapshot.val() && snapshot.val().twitter))
                  var  instagram=((snapshot.val() && snapshot.val().instagram))
                  // var image=((snapshot.val() && snapshot.val().image))
                  readData(name,email,description,phone,website,twitter,instagram);
            

                })
            }
             
            )


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

        this.fetchOffers();
          }


    fetchOffers=()=>{
       
        //if userType = 'serviceProvider'
        // ref = database.ref().child("serviceProvider/"+auth.currentUser.uid+'/offers')
        //else  ref = database.ref().child("serviceProvider/"+key+'/offers')
        database.ref().child("serviceProvider/"+auth.currentUser.uid+'/offers').on('child_added', data => {
        var list=[]
            list.push({
    
          title: data.val().title,
          description: data.val().description,
          code: data.val().code,
          expiration:data.val().expiration
        });
         this.setState({offers:list});
        });    

        database.ref().child("serviceProvider/"+auth.currentUser.uid+'/offers').on('child_added', data => {
            var list=[]
                list.push({
        
              title: data.val().title,
              description: data.val().description,
              code: data.val().code,
              expiration:data.val().expiration
            });
             this.setState({offers:list});
            });   

            database.ref().child("serviceProvider/"+auth.currentUser.uid+'/offers').on('child_removed', function(data){
                handleRemoveOffer(data.key)})
            
                const handleRemoveOffer = (key) => {
            
                  var offer = this.state.offers
                  
                  offer = offer.filter(offer=> offer.key !== key )
                  this.setState({offers:offer})
                }

    }


    listOffers= () => {

        // return (
        //     <View  style={{flex:1,alignSelf:'center', justifyContent:'center'}}>
        //     <FlatList
        //     style={{width:'100%'}}
        //     data= {this.state.offers}
        //     keyExtractor={(item)=>item.key}
        //     renderItem={({item})=>
             
        //     {
              
        //       return(
        //     <View style={{marginTop:15}}>
        //     <Card 
        //   title= {item.title}
        //   content={item.Descripiton}
        //   iconName="local-offer"
        //   iconType="MaterialIcons"
        //   iconBackgroundColor= {colors.primaryBlue}
        //   //bottomRightText="30"
        //   onPress= {() => this.props.navigation.navigate('editOffer')}/>
      
        //   </View>
        //       )
        //     }} />
        //      </View>
            
       
        // )
      }

UNSAFE_componentWillMount(){
 
    this.fetchData();    

    }

   //implementing favorite/ unfavorite a SP logic 
        toggleModal = () => {
        this.setState({modal: !this.state.modal});
        if (this.state.modal){

            database.ref().child('users').child(auth.currentUser.uid).child('favorites').push(
                {
                    SPId: this.state.key
                }
            )
        
        }
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
                   {/* if user is KSU member then show favorite functionality else dont show  */}
                    {  this.state.key == null ? <View></View> :<TouchableOpacity style={{alignSelf:'flex-end' ,marginTop:10}}
                    onPress={this.toggleFavorite}>
                    <MaterialCommunityIcons 
                    name={ this.state.favorite? "heart" : "heart-outline"}  
                     color={colors.primaryBlue} 
                     size={30} 
                     />
                    </TouchableOpacity> }



                    <Text style={[styles.header]}>{this.state.brand}</Text>
                        <View >
                        <Image source={require('../images/logoDis.jpg')} style={{width:100,height:100,marginLeft:120}}/>
                        </View> 
                    </View>
                    
                    <View style={styless.footer}>
                        <Text style={styless.text_footer}>عن مزود خدمة </Text>

                        <Text style={{alignSelf:'flex-end'}}>
                            {this.state.description}
                            
                            </Text>

                        <View style={{alignSelf:'flex-end'}}>
                        <Text style={styless.text_footer}>للتواصل</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>

                         <TouchableOpacity>
                         <MaterialCommunityIcons
                        name="email"
                        color={colors.primaryBlue}
                        size={30}
                        style={styles.fieldLabels}
                        accessibilityValue={this.state.email}
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
                

                        <Text style={styless.text_footer}>الفروع</Text>
                        <View style={styless.action}>
                        </View>

                

                        <Text style={styless.text_footer}>العروض</Text>
                        <View style={styless.action}>
                        {this.listOffers()}

                        </View>
                        </View>
 



                    <TouchableOpacity style={styles.ButtonContainer} onPress={this.toggleModal}  >
                        <Text style={styles.appButtonText} >استخدم العرض</Text>
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
                                <Text style={styles.text_footer}>انسخ الكود</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity onPress={() => {
                       Linking.openURL('https://'+this.state.website);
                      }}>
                                <Text style={{color:colors.primaryBlue}}>  {this.state.brand}  انقلني لصفحة </Text>
                                </TouchableOpacity>

                                 <Button title="اغلاق" onPress={this.toggleModal} />
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
