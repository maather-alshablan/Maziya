import React,{Component, useState, useEffect } from 'react'
import { Text, View, Button, Image, Dimensions ,StyleSheet,TouchableOpacity,Linking } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import styles from '../constants/styles'; 

// add bottom navigation 
// drawer navigation 

export default class scanQR extends Component {

   
      state = {
        hasCameraPermission: null,
        scanned: false,
        thedata:"null",
      };
    
      async componentDidMount() {
        this.getPermissionsAsync();
      }; 
    
      getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      };
    
     
   render() { 
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styless.container]}>
          <Text style={styless.description}>Scan your QR code</Text>
          <Image
            style={styless.qr}
            source={require('../images/qr.png')}
          />
          {/* <Text
            onPress={() => this.props.navigation.pop()}
            style={styles.cancel}>
            Cancel
          </Text> */}
        </BarCodeScanner>

        <Button title={'go to app reader '}
         onPress={() => Linking.openURL('https://apps.apple.com/sa/app/qr-code-pro/id1490112564')}
        />
        
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
       
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => { 
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  
  };

  onSuccess = data => {
    Linking.openURL({data}).catch(err =>
      console.error('An error occured', err)
    );
  }; 
 
}
const { width } = Dimensions.get('window')
const qrSize = width * 1
const styless = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
},
qr: {
  marginTop: '20%',
  marginBottom: '20%',
  width: qrSize,
  height: qrSize,
},
description: {
  fontSize: width * 0.09,
  marginTop: '10%',
  textAlign: 'center',
  width: '70%',
  color: 'white',
},
cancel: {
  fontSize: width * 0.05,
  textAlign: 'center',
  width: '70%',
  color: 'white',}
});