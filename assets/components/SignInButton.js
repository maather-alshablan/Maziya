import React from 'react';
import {
  View,
  Text
} from 'react-native';

export default ({text}) => {
  return (
    <View style = {
      {
        "alignItems": "center"
      }
    } >
    <View style = {
      {
        "flexDirection": "row",
        "alignItems": "center",
        "paddingStart": 50,
        "paddingTop": 0,
        "width": 203,
        "height": 45,
        "borderRadius": 22.5,
        "borderWidth": 1,
        "borderColor": "rgba(247, 247, 247, 255)",
        "backgroundColor": "rgba(1, 132, 189, 255)"
      }
    } >
    <Text style = {
      {
        "fontFamily": "Bodoni 72 Smallcaps",
        "fontSize": 20,
        "color": "rgba(247, 247, 247, 255)",
        alignSelf:'center'
      
      }
    } > {text}</Text>
 
  
    
    </View>
    </View>

  );
};