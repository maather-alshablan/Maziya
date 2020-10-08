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

