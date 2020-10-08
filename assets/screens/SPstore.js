import React, { Component , useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, StatusBar ,Image,ImageBackground , ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { database, auth,storage } from "../config/firebase";
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
import colors from '../constants/colors'
import styles from "../constants/styles";
//import { QRCode } from 'react-native-custom-qr-codes';

const Homescreen =({ navigation}) => {
   
        return (

            <View style={styless.container}>
                 <ScrollView style={styles.scrollView}>

                    <View style={styless.header}>
                        <Text style={styless.text_header}>مزود خدمة</Text>
                        <View >
                        <Image source={require('../images/logoDis.jpg')} style={{width:100,height:100,marginLeft:120}}/>
                        </View> 
                    </View>
    
                    <View style={styless.footer}>
                        <Text style={styless.text_footer}>الاسم</Text>
                        <View style={styless.action}>
                            <TextInput style={styless.textInput} 
                            autoCapitalize="none" 
                            textAlign='right'
                        />
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
 
                    <View>
                        <ImageBackground source={require('../images/image.png')} style={{width:200,height:200,marginLeft:50}}>    
                    </ImageBackground>
                    </View>


                 </ScrollView>
            </View>
        )
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
