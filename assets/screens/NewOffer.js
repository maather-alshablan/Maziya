import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, StatusBar ,Image,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 
 
 
export default class NewOffer extends Component  {
 
    state = {
        userName: "",
        Descripiton: "",
        cpo:"",
        errorMessage: null,
        errors: false,
      };
 
      handleNameChange = (userName) => {
        // parent class change handler is always called with field name and value
        this.setState({ userName: userName });
      };
      handleDescripitonChange = (Descripiton) => {
        // parent class change handler is always called with field name and value
        this.setState({ Descripiton: Descripiton });
      };
    
      handlecpoChange = (cpo) => {
        // parent class change handler is always called with field name and value
        this.setState({ cpo: cpo });
      };
 
render(){
    return (
        <View style={styles.container}>
          <StatusBar backgroundColor='#0278ae' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>اضافة عرض جديد</Text>
                <Image source={require('../images/logoDis.jpg')} style={{width:100,height:100,marginLeft:120}}/>
            </View>
 
                <View style={styles.footer}>
                <Text style={styles.text_footer}>الاسم</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} autoCapitalize="none" onChangeText={(userName)=> this.handleNameChange(userName)}/>
                </View>
 
 
               <Text style={styles.text_footer}>الوصف</Text>
                <View style={styles.action}>
                  <TextInput style={styles.textInput} autoCapitalize="none" onChangeText={(Descripiton) => this.handleDescripitonChange(Descripiton)}/>
                </View>
 
                <View>
                <ImageBackground source={require('../images/image.png')} style={{width:200,height:200,marginLeft:50}}>
                  <View style={styles.action}>
                    <TextInput placeholder='ادخل الرمز' style={styles.textInput,{paddingTop:100,marginLeft:100}} autoCapitalize="none" onChangeText={(cpo)=>this.handlecpoChange(cpo)}/>
                   </View>
 
                </ImageBackground>
                </View>
 
 
                
                <View style={styles.buttom}>
                    <TouchableOpacity style={styles.signIn} onPress={()=>{}}>
                    <LinearGradient
                        colors={['#0278ae', '#0278ae']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, { color: '#fff' }]}> إضافة عرض </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                   
                </View>
            </View>
                
        </View>
 
    )
}
 
}
 
 
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;
 
const styles = StyleSheet.create({
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
        marginLeft:260
        
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