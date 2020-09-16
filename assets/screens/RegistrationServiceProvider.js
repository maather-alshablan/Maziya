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
    return (
    <View style={styles.container}>
        <Text style={styles.header}>تسجيل مزود الخدمة</Text>
        <Form type={fields} 
        style={formStyles}
        options={options}/>

        

<RegButton text={'تسجيل'}></RegButton>
        
    </View>
    );
    }
}


const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
           
    },
    
  

    header:{
        
        "fontFamily": "Bradley Hand",
        "fontWeight": "bold",
        "fontSize": 35,
        alignSelf:'center',
        "color": colors.primaryBlue,
        marginTop: -40,
        marginBottom:50
        
    },
    button: {
        "flexDirection": "row",
        "alignItems": "center",
        alignSelf: "stretch",
        justifyContent: "center",
        "borderRadius": 22.5,
        "borderWidth": 1,
        "borderColor": "rgba(247, 247, 247, 255)",
        "backgroundColor": "rgba(1, 132, 189, 255)",
        
      },

})

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        
        marginBottom: 10,
        marginLeft: 50,
        marginRight:50
        
      },
    },
    controlLabel: {
      normal: {
        flexDirection:'row-reverse',
        color: colors.primaryGrey,
        fontSize: 15,
        marginBottom: 7,
        paddingLeft:170 , 
        //marginLeft: 50,
        fontWeight: '600'
      },
      // the style applied when a validation error occours
      error: {
        color: 'red',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600'
      }
    }
  }
  
  const options = {
    fields: {
      'البريد الإلكتروني': {
        error: 'invalid input'
      },
      'كلمة المرور' : {
        error: 'wrong password'
      },
      'رقم الهاتف' : {
        error: 'wrong password'
      }
    },
    stylesheet: formStyles,
  };



 