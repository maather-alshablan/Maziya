import React , {Component} from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import colors from '../constants/colors'
import t from 'tcomb-form-native';
import SignInButton from '../components/SignInButton'

 const Form = t.form.Form;
 const fields = t.struct({
    'البريد الإلكتروني': t.String,
    'كلمة المرور': t.String,
  });


export default class ForgotPasswordScreen extends Component  {

   
    render(){
    return (
    <View style={styles.container}>
        <Text style={styles.header}> إستعادة كلمة المرور</Text>
        
        <Form type={fields} 
        style={formStyles}
        options={options}/>

        <Button title={'استرجاع'}
        style={styles.button} ></Button>
        
    </View>
    );
    }
}


const styles = StyleSheet.create({
    
    container: {
            flex: 1,
            backgroundColor: 'white',
           
    },
    header:{
        
        "fontFamily": "Bradley Hand",
        "fontWeight": "bold",
        "fontSize": 35,
        alignSelf:'center',
        "color": colors.primaryBlue,
        //textDecorationStyle: 'underline',
        marginTop: 50,
        marginBottom:100
        
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
        textAlign: 'center'
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
        error: 'Without an email address how are you going to reset your password when you forget it?'
      },
      'كلمة المرور' : {
        error: 'Choose something you use on a dozen other sites or something you won\'t remember'
      }
    },
    stylesheet: formStyles,
  };