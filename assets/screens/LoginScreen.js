
import React, { useState, Component } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Label, StyleSheet, Dimensions, Button, ColorPropType } from 'react-native'
import colors from '../constants/colors'
import styles from '../constants/styles'
import SignInButton from '../components/SignInButton'

import { firebase, auth } from '../config/firebase'
import { Entypo } from '../constants/icons'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default class LoginScreen extends Component {
    state = { email: '438200192@student.ksu.edu.sa', password: 'nouf1212', errorMessage: null }

    componentDidMount() {

        this.generateToken();
        this.setFutureNontifications();
        this.getAllScheduledNotificationsAsync();
    }
    generateToken = async () => {
        const token = await this.registerForPushNotificationsAsync();

    }

    registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    scheduleNotification = (seconds) => {

        Notifications.scheduleNotificationAsync({
            content: {
                sound: 'default',
                title: "مزية",
                body: "افتقدناك ، شيك على اخر عروضنا"
            },
            trigger: {
                seconds: seconds,
                repeats: false
            },
        });
    }

    setFutureNontifications = async () => {
        this.cancelAllScheduledNotificationsAsync();//if we want to applay check we have remove it 
        const check = await this.getData();
        // if (!check) { "store the notification at the first time of openning the app"
        if (true) {
            const nowDate = new Date();

            for (let i = 2; i <= 30; i += 2) {
                const newTime = (nowDate / 1000) + (24 * 60 * 60 * i)
                this.scheduleNotification(5 * i);//5*i for start after 10 sec , replace it with newTime

            }
            // this.storeData('yes') apllay it with check 
        }
        else {
            alert("Done");
            this.cancelAllScheduledNotificationsAsync();

            for (let j = 2; j <= 30; j += 2) {
                this.scheduleNotification(5 * j);//5*i for start after 10 sec , replace it with newTime

            }
        }
    }

    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('setNotifications', value)
        } catch (e) {
            alert(e);
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('setNotifications')
            if (value !== null) {
                return true;
            }
            return false;
        } catch (e) {
            alert(e);
        }
    }

    getAllScheduledNotificationsAsync = async () => {
        console.log('ffff')
        console.warn(await Notifications.getAllScheduledNotificationsAsync())
    }

    handleLogin = () => {

        // validate email with domain @**ksu.edu.sa ** using regular expressions

        const { email, password } = this.state

        auth.
            signInWithEmailAndPassword(email, password)
            .then((response) => {
                //if (response?.user?.emailVerified) {

                    this.routeUser()
                // } else {
                //     alert('الرجاء من تفعيل الايميل للتتمكن من تسجيل الدخول')
                // }
            }
            ).catch(error => this.setState({ errorMessage: 'يرجى التأكد من ادخال البريد الالكتروني و كلمة المرور الصحيح' }))

        this.state.errorMessage = "";



    }

    cancelAllScheduledNotificationsAsync = async () => {
        return await Notifications.cancelAllScheduledNotificationsAsync()
    }

    routeUser = () => {
        if (this.state.email.endsWith('ksu.edu.sa')) {
            console.log('Directed to member homescreen')
            this.props.navigation.navigate('Homescreen')
        }
        else {
            console.log('Directed to service provider homescreen')
            this.props.navigation.navigate('SPhomescreen')

        }

    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    source={require('../images/logo.png')}
                    style={{
                        width: Dimensions.get('window').height * 0.35,

                    }}
                    resizeMode='contain'
                />


                <View style={styles.Header}>

                    <Text style={styles.HeaderText}>
                        تسجيل الدخول
            </Text>



                </View>



                <View style={styles.fields}>

                    <Text style={styles.fieldLabels} >البريد الإلكتروني </Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='البريد الإلكتروني'
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        autoCapitalize="none"
                    />
                </View>


                <View style={styles.fields}>
                    <Text style={styles.fieldLabels} >كلمة المرور </Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='كلمة المرور'
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        autoCapitalize="none"
                    /></View>{this.state.errorMessage && <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}</Text>}
                <TouchableOpacity onPress={this.handleLogin}>
                    <SignInButton text={'تسجيل الدخول'} onPress={this.handleLogin}></SignInButton>
                </TouchableOpacity>


                <TouchableOpacity style={styles.forgotPasswordView}>
                    <Text style={styles.forgotPassword}
                        onPress={() => this.props.navigation.navigate('Forgot')}>
                        نسيت كلمة المرور؟
         </Text>
                </TouchableOpacity>


                <TouchableOpacity >
                    <Text
                        onPress={() => this.props.navigation.navigate('Registration')}
                        style={styles.SignUpText}>
                        سجل كمستخدم جديد
            </Text>
                </TouchableOpacity>

            </View>




        )
    }
}


