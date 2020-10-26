
import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Linking, TextInput, 
    Button, Card, FlatList, TouchableOpacity, Dimensions, Clipboard, LogBox, StatusBar, Image, ImageBackground, ScrollView, TabBarIOS } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { database, auth, storage } from "../config/firebase";
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons, Feather } from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
import { QRCode } from 'react-native-custom-qr-codes';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Map from '../screens/map'
import SignInButton from "../components/SignInButton";
//import listOfferSP from '../components/ListOfferSP';


export default class serviceProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            key: null,
            modal: false,
            favorite: false,
            brand: '',
            description: '',
            email: '',
            phone: '',
            website: '',
            code: '',
            twitter: '',
            instagram: '',
            //image:'',
            offers: [],
            copied:false,
            offerDetails: props?.route?.params?.offer,
            favoriteId: '',
            used: false,
        }
    }

    componentDidMount() {
     
        const readData = (favId, used = false) => {
            if (used) {
                this.setState({
                    used: true,
                })

            } else {
                console.warn(favId, "favId")
                this.setState({
                    favoriteId: favId,
                    favorite: true,

                })
            } }

            
            var self = this;
        database.ref('users/'+auth.currentUser.uid).once('value').then(function(snapshot){
       
            const user = snapshot.val().accountType
            console.log("this")
            

        if (user == 'serviceProvider') 
        var sp =     auth.currentUser.uid
    
        else if (self.state.offerDetails != null ){
        var sp = self.state.offerDetails.serviceProvider}
        
        console.log(sp)
        fetchData(sp);
        
        } )

 

        console.log('hi1')

        database.ref('favorites/' + auth.currentUser.uid)
            .once('value')
            .then(function (snapshot) {
                const favorites = snapshot.val();
                //console.log(favorites)
                var favoriteDetails = {}
                if (favorites != null)
                Object.keys(favorites).map(key => {
                    //console.log(favorites, self.state.offerDetails)
                    if (favorites[key].key == self.state.offerDetails?.key) {
                        console.log('added');
                        console.log('hi');
                        readData(key);
                        fetchData(self.state.offerDetails.serviceProvider);
                    }
                })
            })

        // database.ref('usedOffers/' + auth.currentUser.uid)
        //     .once('value')
        //     .then(function (snapshot) {
        //         const usedOffers = snapshot.val();
        //         console.warn(usedOffers)
        //         var usedDetails = {}
        //         Object.keys(usedOffers).map(key => {
        //             console.warn(usedOffers, self.state.offerDetails)
        //             if (usedOffers[key].key == self.state.offerDetails?.key) {
        //                 console.warn('added')
        //                 readData(key, true);

        //             }
        //         })
        //     })
     const fetchData = (sp) => {
      
        console.log('hi')

            database.ref().child('serviceProvider/' + sp).once("value").then(function (snapshot) {
                var name = ((snapshot.val() && snapshot.val().nameBrand)) 
                var description = ((snapshot.val() && snapshot.val().description))
                var email = ((snapshot.val() && snapshot.val().email))
                var phone = ((snapshot.val() && snapshot.val().phone))
                var website = ((snapshot.val() && snapshot.val().website))
                var twitter = ((snapshot.val() && snapshot.val().twitter))
                var instagram = ((snapshot.val() && snapshot.val().instagram))
                // var image=((snapshot.val() && snapshot.val().image))
                readData_(name, email, description, phone, website, twitter, instagram);
            
            })


        const readData_ = (name, email, description, phone, website, twitter, instagram) => {
            this.setState({
                brand: name,
                description: description,
                phone: phone,
                email: email,
                website: website,
                twitter: twitter,
                instagram: instagram,
                //image:image
            })
        }

    }}

    fetchOffers = () => {

        //if userType = 'serviceProvider'
        // ref = database.ref().child("serviceProvider/"+auth.currentUser.uid+'/offers')
        //else  ref = database.ref().child("serviceProvider/"+key+'/offers')
        database.ref().child('serviceProvider/' + auth.currentUser.uid + "/offers" + this.state.code).on('child_added', data => {
            var list = []
            list.push({

                title: data.val().title,
                description: data.val().description,
                code: data.val().code,
                expiration: data.val().expiration
            });
            this.setState({ offers: list });
        });


        database.ref().child("serviceProvider/" + auth.currentUser.uid + '/offers').on('child_removed', function (data) {
            handleRemoveOffer(data.key)
        })

        const handleRemoveOffer = (key) => {

            var offer = this.state.offers

            offer = offer.filter(offer => offer.key !== key)
            this.setState({ offers: offer })
        }

    }


    listOffers = () => {
        return null;

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



    //implementing favorite/ unfavorite a SP logic 
    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
        if (this.state.modal) {

            database.ref().child('users').child(auth.currentUser.uid).child('favorites').push(
                {
                    SPId: this.state.key
                }
            )

        }
    };

    copyToClipboard = () => {
        Clipboard.setString(this.state.offerDetails.code)
        this.setState({copied:true})
        database.ref().child('usedOffers').child(auth.currentUser.uid).child(this.state.offerDetails?.key)
        .set({ ...this.state.offerDetails});
    }

    toggleFavorite = () => {
        if (this.state.favorite) {
            this.setState({ favorite: false });
            database
                .ref()
                .child("favorites")
                .child(auth.currentUser.uid)
                .child(this.state.favoriteId)
                .remove()

        } else {
            this.setState({ favorite: true });
            database
                .ref()
                .child("favorites")
                .child(auth.currentUser.uid)
                .push()
                .set({ ...this.state.offerDetails, uid: auth.currentUser.uid })
        }

    }
        

    render() {
      //  console.log('hi')
       

        //LogBox.ignoreAllLogs()
        return (

            <View style={styless.container}>
                <ScrollView style={styles.scrollView}>

                    <View style={styless.header}>
                        {/* if page is accessed through offer View then show heart and and back page else offer is accessed through service provider thus don't show  */}
                        {this.state.offerDetails ?  
                        <View>
                        <Entypo name='chevron-left' size={30} color={colors.primaryBlue}  style={{marginTop:40}} onPress={()=> this.props.navigation.pop()} />

                       
                        <TouchableOpacity 
                        onPress={this.toggleFavorite}>
                        <MaterialCommunityIcons
                            name={this.state.favorite ? "heart" : "heart-outline"}
                            color={colors.primaryBlue}
                            size={40}
                            style={{alignSelf:'flex-end'}}
                        />
                    </TouchableOpacity>
                    </View> : <View></View> }
                        <Text style={[styles.header]}>{this.state.brand}</Text>
                        <View >
                            <Image source={require('../images/logoDis.jpg')} style={{ width: 100, height: 100, marginLeft: 120 }} />
                        </View>
                    </View>

                    {/* {false ? <View></View> : <TouchableOpacity style={{
                        marginTop: 10
                    }}
                        onPress={this.toggleFavorite}>
                        <MaterialCommunityIcons
                            name={this.state.favorite ? "heart" : "heart-outline"}
                            color={colors.primaryBlue}
                            size={40}
                            style={{alignSelf:'flex-end'}}
                        />
                    </TouchableOpacity>} */}


                    <View style={styless.footer}>
                        <Text style={styless.text_footer}>عن  {this.state.brand}</Text>

                        <Text style={{ alignSelf: 'flex-end' }}>
                            {this.state.description}

                        </Text>

                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={styless.text_footer}>للتواصل</Text>
                        </View>
                        <View style={{ flexDirection: "row"  , alignItems:"center"}}>

                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    name="email"
                                    color={colors.primaryBlue}
                                    size={30}
                                    style={styles.fieldLabels}
                                    accessibilityValue={this.state.email}
                                    onPress={() => { Linking.openURL('mailto:' + this.state.email) }} />
                            </TouchableOpacity>

                            {this.state.phone == '' ? <View></View> :
                                <TouchableOpacity>
                                    <FontAwesome name="phone" color={colors.primaryBlue} size={30} style={styles.fieldLabels}
                                        accessibilityValue={this.state.phone} />
                                </TouchableOpacity>}

                            {this.state.website == '' ? <View></View> :
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="web" color={colors.primaryBlue} size={30} style={styles.fieldLabels}
                                        accessibilityValue={this.state.website} onPress={() => {
                                            Linking.openURL('https://' + this.state.website);
                                        }} />
                                </TouchableOpacity>}

                            {this.state.twitter == '' ? <View></View> :
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="twitter" color={colors.primaryBlue} size={30} style={styles.fieldLabels}
                                        accessibilityValue={this.state.twitter}
                                        onPress={() => {
                                            Linking.openURL('https://twitter.com/' + this.state.twitter);
                                        }}

                                    />
                                </TouchableOpacity>}

                            {this.state.instagram == '' ? <View></View> :
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="instagram" color={colors.primaryBlue} size={30} style={styles.fieldLabels}
                                        onPress={() => {
                                            Linking.openURL('https://instagram.com/' + this.state.instagram);
                                        }} />
                                </TouchableOpacity>}
                        </View>

                     
                        {this.state.offerDetails ? 
                      <View>
                        <Text style={styless.text_footer}>العنوان</Text>
                        <Text style={styless.subtext_footer}>{this.state.offerDetails.title}</Text>
                        <View style={styless.action}>
                        </View>

                        <Text style={styless.text_footer}>الوصف</Text>
                        <Text style={styless.subtext_footer}>{this.state.offerDetails.Descripiton}</Text>
                        <View style={styless.action}>

                        </View>

                        <Text style={styless.text_footer}>تاريخ إنتهاء العرض</Text>
                        <Text style={styless.subtext_footer}>{this.state.offerDetails.expdate}</Text>
                        <View style={styless.action}> 
                        </View>
                        </View> : <View></View> } 
                        {this.state.offerDetails ?
                        <View>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={this.toggleModal}  >
                        <Text style={styles.appButtonText} >استخدم العرض</Text>
                        <Modal
                            isVisible={this.state.modal}
                            onBackdropPress={() => this.setState({ modal: false })}>
                                
                            <View style={styless.modal}>
                                <FontAwesome 
                                name={'close'}
                                color={colors.primaryGrey}
                                size={30}
                                style={{alignSelf:"flex-start",justifyContent:'center'}}
                                onPress={this.toggleModal} />
                                {/* <Text style={{ fontFamily: "Arial",fontWeight: "Normal",fontSize: 35,alignSelf: "center",color: colors.primaryBlue}}>استخدم العرض</Text> */}
                                <Text style={[styless.subtext_footer],
                                    [{alignSelf:'flex-end',color:colors.primaryBlue, fontSize:30, margin:10,textDecorationLine:'underline'}]}> الطريقة الأولى</Text>
                             <View>
                               <TouchableOpacity 
                            //    onPress={this.props.navigation.navigate('ScanQR')} 
                               >
                                <Text style={
                                    [{alignSelf:'flex-end',color: '#05375a', fontSize:20, margin:10}]}>امسح العرض</Text>
                                 </TouchableOpacity>
                                 </View>
                                  < View>
                                  <QRCode content={this.state.offerDetails.code}
                                  logo={require('../images/logo.png')} />

                                    

                                   <Text style={[styless.subtext_footer],
                                    [{alignSelf:'flex-end',color:colors.primaryBlue, fontSize:30, margin:7,textDecorationLine:'underline'}]}> الطريقة الثانية</Text>
                                <TouchableOpacity style={{flexDirection:'row-reverse',alignSelf:'center'}} onPress={() => this.copyToClipboard()}>
                                
                                    <Text style={{fontSize: 20,alignSelf:"center", margin:20,color: '#05375a'}} > 1 - انسخ الكود </Text>
                                    <Feather name={'copy'} 
                                    size={30} 
                                    color= {this.state.copied ?  colors.primaryBlue : colors.primaryGrey} />
                                </TouchableOpacity>
                                </View> 

                                <TouchableOpacity style={{flexDirection:'row-reverse',alignSelf:'center',margin:10}}  onPress={() => {
                                    Linking.openURL('https://' + this.state.website);
                                }}>
                                    <Text style={{ alignSelf:"center", margin:10, color: '#05375a', fontSize:20}}> 2 - {this.state.brand}  انقلني لصفحة  </Text>
                                
                                <Feather name={'external-link'} 
                                    size={30} 
                                    color= {  colors.primaryGrey }/>
                              </TouchableOpacity>
                            </View>
                        </Modal>




                    </TouchableOpacity>
                    </View> : <View></View>}
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={styless.text_footer}>الفروع</Text>
                        </View>
                    
                    </View>
                    <View style={{height:50, width:50}}>
                       <Map/>
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
        backgroundColor: 'white'

    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,

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
        paddingTop: 100,
        color: '#0278ae',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 150
    },
    text_footer: {
        color: '#05375a',
        fontSize: 20,
        marginLeft: 200,
        marginTop: 10,
        alignSelf: 'flex-end',
    },subtext_footer: {
        color: 'black',
        fontSize: 15,
        marginLeft: 200,
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    buttom: {
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
        marginTop: -12,
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
    modal: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 330,
        alignSelf:"center",
        marginVertical: 115,
        marginHorizontal:50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor:colors.primaryGrey,
        borderWidth:4,
        overflow: 'hidden',



    }



});
