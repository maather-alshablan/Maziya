
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View , SafeAreaView, StyleSheet} from 'react-native'
import colors from '../constants/colors'

export default function LoginScreen({navigation}) {
 /*   const [email, setEmail] = useState('')
const [password, setPassword] = useState('') */

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }


    return (
       <View style={styles.container}>
        <Image 
        source = {require('../images/logo.png')} 
        />
         <TextInput
                    
                    placeholder=''
                    placeholderTextColor="#aaaaaa"
                    backgroundColor='grey'
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
        </View>
          /* <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../images/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {LoginCheck} }>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
          </KeyboardAwareScrollView>*/
       
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
      color: '#101010',
      fontSize: 24,
      fontWeight: 'bold'
    }
  })
  