import React , {Component} from 'react'
 import {Text, View, StyleSheet, Button} from 'react-native'
 import colors from '../constants/colors'
 import t from 'tcomb-form-native';
 import  RegButton from '../components/RegButton'

const Form = t.form.Form;
 const fields = t.struct({
  'الأسم': t.String,
  'البريد الإلكتروني': t.String,
  'كلمة المرور': t.String,
  'رقم الهاتف' : t.String,

  });

export default class RegistrationServiceProvider extends Component {
render(){
return(
    <View>
    <Text>Hi</Text>
    </View>
    );
}};
