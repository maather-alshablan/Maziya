import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , SafeAreaView  , ScrollView , Linking, Alert} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {HomeScreen } from './assets/components/HomeScreen';
import {Login } from './assets/screens/Login';

export default () => {
  return (
    <View>
    <StatusBar/>
    <Login></Login>
  
    </View>
  );
};