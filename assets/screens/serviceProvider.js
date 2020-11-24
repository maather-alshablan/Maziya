
import React, { Component, useState } from "react";
import {
    StyleSheet, Text, View, Linking, TextInput,
    Button, Card, FlatList, TouchableOpacity, Dimensions, Clipboard, LogBox, StatusBar, Image, SafeAreaView, ScrollView, TabBarIOS, Alert
} from 'react-native';
import { TouchThroughView, TouchThroughWrapper } from 'react-native-touch-through-view';
import Modal from 'react-native-modal';
import { database, auth, storage } from "../config/firebase";
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons, Feather } from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
import { QRCode } from 'react-native-custom-qr-codes';
import { Colors } from "react-native/Libraries/NewAppScreen";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
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
            coordinate: null,
            region: {
                latitude: 24.7136,
                longitude: 46.6753,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            //image:'',
            offers: [],
            copied: false,
            offerDetails: props?.route?.params?.offer,
            favoriteId: '',
            used: false,
            keyRoom: null
        }
    }

    componentDidMount() {

        const readData = (favId, used = false) => {
            if (used) {
                this.setState({
                    used: true,
                })

            } else {
                //console.warn(favId, "favId")
                this.setState({
                    favoriteId: favId,
                    favorite: true,

                })
            }
        }

        const setUsed = () => {

            this.setState({
                used: true,
            })
        }


        var self = this;
        database.ref('users/' + auth.currentUser.uid).once('value').then(function (snapshot) {

            const user = snapshot.val().accountType
            console.log("this")


            if (user == 'serviceProvider')
                var sp = auth.currentUser.uid

            else if (self.state.offerDetails != null) {
                var sp = self.state.offerDetails.serviceProvider
                const chatRooms = snapshot.val().ChatRooms

                if (chatRooms) {
                    Object.keys(chatRooms).map(key => {
                        console.log('reading room key > ')
                        console.log(key)


                        if (chatRooms[key].serviceProvider == sp)
                            self.setState({ keyRoom: key })
                    })
                }

            }
            console.log(sp)


            fetchData(sp);


        })


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
                            fetchData(self.state.offerDetails.serviceProvider)
                        }
                    })
            })

        database.ref('usedOffers/' + auth.currentUser.uid)
            .once('value')
            .then(function (snapshot) {
                const usedOffers = snapshot.val();
                // console.warn(usedOffers)
                var usedDetails = {}
                if (usedOffers != null)
                    Object.keys(usedOffers).map(key => {
                        // console.warn(usedOffers, self.state.offerDetails)
                        if (usedOffers[key].key == self.state.offerDetails?.key) {
                            //console.warn('added')
                            setUsed();

                        }
                    })
            })

        const fetchChatRoom = async (chatRooms,sp)=>{
            if (chatRooms)
            { console.log('fetching room')
                Object.keys(chatRooms).map(key => {
                    console.log('reading room key > ')
                    console.log(key)
                    
                   
                    if (chatRooms[key].serviceProvider == sp)
                     self.setState({keyRoom: key})
                     console.log('key room is ', this.state.keyRoom)
            })
        }
  
        }

        const fetchData = (sp) => {

            database.ref().child('serviceProvider/' + sp).once("value").then(function (snapshot) {
                var name = ((snapshot.val() && snapshot.val().nameBrand))
                var description = ((snapshot.val() && snapshot.val().description))
                var email = ((snapshot.val() && snapshot.val().email))
                var phone = ((snapshot.val() && snapshot.val().phone))
                var website = ((snapshot.val() && snapshot.val().website))
                var twitter = ((snapshot.val() && snapshot.val().twitter))
                var instagram = ((snapshot.val() && snapshot.val().instagram))
                var coordinate = ((snapshot.val() && snapshot.val().coordinate))

                // var image=((snapshot.val() && snapshot.val().image))
                readData_(name, email, description, phone, website, twitter, instagram, coordinate);

            })


            const readData_ = (name, email, description, phone, website, twitter, instagram, coordinate) => {
                this.setState({
                    brand: name,
                    description: description,
                    phone: phone,
                    email: email,
                    website: website,
                    twitter: twitter,
                    instagram: instagram,
                    coordinate: coordinate
                    //image:image
                })
            }

        }
    }

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
        this.setState({ copied: true })
        this.setState({ used: true })
        database.ref().child('usedOffers').child(auth.currentUser.uid).child(this.state.offerDetails?.key)
            .set({ ...this.state.offerDetails, used: true });
        // Alert.alert('لقد تم استخدامك للعرض بنجاح')
        this.updateUsedCount();

    }

    toggleFavorite = () => {
        if (this.state.favorite) {
            this.setState({ favorite: false });
            database
                .ref()
                .child("favorites")
                .child(auth.currentUser.uid)
                .child(this.state.favoriteId)
                .remove().then(this.updateFavoriteCount('decrement'))

        } else {
            this.setState({ favorite: true });
            database
                .ref()
                .child("favorites")
                .child(auth.currentUser.uid)
                .push()
                .set({ ...this.state.offerDetails, uid: auth.currentUser.uid }).then(this.updateFavoriteCount('increment'))
        }
    }

    updateUsedCount = () => {

        database.ref('Offers/' + this.state.offerDetails?.key + '/usedCount').transaction(function (data) {

            return ++data;
        })
    }

    updateFavoriteCount = (type) => {

        database.ref('Offers/' + this.state.offerDetails?.key + '/favoriteCount').transaction(function (data) {
            if (type == 'increment')
                return ++data;
            if (type == 'decrement')
                return ++data;

        })
    }

       //Creating chat room is only member side
        createRoom =  async ()=>{
        console.log('creating new room.. ')

        var key = database.ref().child('Rooms').push().key

        await database.ref('users/'+auth.currentUser.uid).once('value', user => {
          var name = user.val().name

          this.setState({
            memberName: name,
            keyRoom: key
        })
       
    })

       
    var room ={
        member: auth.currentUser.uid,
        roomKey: key,
        memberName: this.state.memberName, 
        serviceProvider: this.state.offerDetails.serviceProvider,
        brandName: this.state.brand
 }
        var updates = {}
        updates['Rooms/'+key] = room
        updates['users/'+auth.currentUser.uid+'/ChatRooms/'+key] = room
        updates['serviceProvider/'+  this.state.offerDetails.serviceProvider+'/ChatRooms/'+key] = room
        database.ref().update(updates).then(() => console.log('new room created')).then(this.navigateToRoom()).catch(e => console.warn('room creation'))
        
          
        }

        navigateToRoom= async ()=>{

           
            if(this.state.keyRoom){
            this.props.navigation.navigate('chatRoom', { keyRoom: this.state.keyRoom,
                member: auth.currentUser.uid, 
                serviceProvider: this.state.offerDetails.serviceProvider, nameBrand:this.state.brand,
                isMember:true})}
                else this.createRoom();
        }

    render() {
        //  console.log('hi')


        //LogBox.ignoreAllLogs()
        return (

            <SafeAreaView style={styless.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        <View >
                            {this.state.offerDetails ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Entypo name='chevron-left' size={30} color={colors.primaryBlue} onPress={() => this.props.navigation.pop()} />

                                </View> : <View></View>}
                            <View style={{ flexDirection: 'row-reverse', alignSelf: 'center' }}>
                                <Text style={[styless.headers]}>{this.state.brand}</Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', alignSelf: 'center' }}>

                                <Image source={require('../images/logoDis.jpg')} style={{ width: 100, height: 60, alignSelf: "center" }} />
                            </View>
                            <TouchableOpacity
                                onPress={this.toggleFavorite}>
                                <MaterialCommunityIcons
                                    name={this.state.favorite ? "heart" : "heart-outline"}
                                    color={colors.primaryBlue}
                                    size={40}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>
                        </View>


                        <View style={styless.footer}>
                            <Text style={styless.text_footer}>عن  {this.state.brand}</Text>

                            <Text style={{ alignSelf: 'flex-end' }}>
                                {this.state.description}

                            </Text>

                            <View style={{ alignSelf: 'flex-end' }}>
                                <Text style={styless.text_footer}>للتواصل</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: 'center' }}>

                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        name="email"
                                        color={colors.primaryBlue}
                                        size={30}
                                        style={styles.fieldLabels}
                                        accessibilityValue={this.state.email}
                                        onPress={() => { Linking.openURL('mailto:' + this.state.email) }} />
                                </TouchableOpacity>
                                {this.state.offerDetails ?
                                    <View>
                                        <TouchableOpacity>
                                            <Entypo
                                                name="chat"
                                                color={colors.primaryBlue}
                                                size={30}
                                                style={styles.fieldLabels}
                                                onPress={() => this.props.navigation.navigate('chatRoom', {
                                                    keyRoom: this.state.keyRoom,
                                                    member: auth.currentUser.uid,
                                                    serviceProvider: this.state.offerDetails.serviceProvider, nameBrand: this.state.brand
                                                })} />
                                        </TouchableOpacity>
                                    </View> :
                                    <View></View>

                                }

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
                                </View> : <View></View>}

                            {this.state.used == true ?
                                <View>
                                    <View style={styles.UsedButtonContainer} >
                                        <Text style={styles.appButtonText} >استخدم العرض</Text>

                                    </View>
                                    <Text style={{ color: 'green', alignSelf: 'center' }}>لقد تم استخدامك للعرض بنجاح</Text></View> : <View></View>}

                            {this.state.used == false && this.state.offerDetails ?
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
                                                    style={{ alignSelf: "flex-start", justifyContent: 'center' }}
                                                    onPress={this.toggleModal} />
                                                <Text style={[styless.subtext_footer],
                                                    [{ alignSelf: 'flex-end', color: colors.primaryBlue, fontSize: 30, margin: 10, textDecorationLine: 'underline' }]}> الطريقة الأولى</Text>
                                                <View>
                                                    <TouchableOpacity
                                                    >
                                                        <Text style={
                                                            [{ alignSelf: 'flex-end', color: '#05375a', fontSize: 20, margin: 10 }]}>امسح العرض</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                < View>
                                                    <QRCode content={this.state.offerDetails.code}
                                                        logo={require('../images/logo.png')} />



                                                    <Text style={[styless.subtext_footer],
                                                        [{ alignSelf: 'flex-end', color: colors.primaryBlue, fontSize: 30, margin: 7, textDecorationLine: 'underline' }]}> الطريقة الثانية</Text>
                                                    <TouchableOpacity style={{ flexDirection: 'row-reverse', alignSelf: 'center' }} onPress={() => this.copyToClipboard()}>

                                                        <Text style={{ fontSize: 20, alignSelf: "center", margin: 20, color: '#05375a' }} > 1 - انسخ الكود </Text>
                                                        <Feather name={'copy'}
                                                            size={30}
                                                            color={this.state.copied ? colors.primaryBlue : colors.primaryGrey} />
                                                    </TouchableOpacity>

                                                </View>

                                                <TouchableOpacity style={{ flexDirection: 'row-reverse', alignSelf: 'center', margin: 10 }} onPress={() => {
                                                    Linking.openURL('https://' + this.state.website);
                                                }}>
                                                    <Text style={{ alignSelf: "center", margin: 10, color: '#05375a', fontSize: 20 }}> 2 - {this.state.brand}  انقلني لصفحة  </Text>

                                                    <Feather name={'external-link'}
                                                        size={30}
                                                        color={colors.primaryGrey} />
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>




                                    </TouchableOpacity>
                                </View> : <View></View>}
                        </View>
                        {this.state.coordinate ?
                            <View>
                                <View style={styless.footer}>

                                    <Text style={styless.text_footer}>الموقع</Text>
                                </View>

                                <View>

                                    <MapView
                                        provider={PROVIDER_GOOGLE}
                                        style={styless.map}
                                        region={this.state.region}
                                        showsUserLocation={true}

                                    >
                                        <Marker
                                            //key={1}
                                            coordinate={this.state.coordinate}
                                            title={this.state.brand}
                                            pinColor={colors.primaryBlue}
                                        >

                                        </Marker>
                                    </MapView>
                                </View>

                            </View> : <View></View>}

                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }

}

const { height } = Dimensions.get('screen');
const maxHeight = Dimensions.get('screen').height
const height_logo = height * 0.28;

const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //  maxHeight: maxHeight

    },
    header: {
        // flex: 1,
        paddingHorizontal: 20,
        //marginTop: 20,
        //alignSelf:'center',
        // justifyContent:'center'

    },
    footer: {
        //flex: 3,
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
        marginVertical:10,

        alignSelf: 'flex-end',
    }, subtext_footer: {
        color: 'black',
        fontSize: 15,
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
        alignSelf: "center",
        marginVertical: 115,
        marginHorizontal: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: colors.primaryGrey,
        borderWidth: 4,
        overflow: 'hidden',
    },
    map: {
        height: 200,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
    },
    headers: {
        fontFamily: "Arial",
        fontWeight: "normal",
        fontSize: 35,
        alignSelf: "center",
        color: colors.primaryBlue,
        //marginTop: 15,
        marginBottom: 15,
    }



});
