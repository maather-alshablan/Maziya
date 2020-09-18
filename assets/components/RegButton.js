import React from 'react';
import {
  View,
  Text
} from 'react-native';

export default ({text}) => {
  return (
    <View style = {
      {
        "alignItems": "right"
      }
    } >
    <View style = {
      {
        "flexDirection": "row",
        "alignItems": "center",
        "paddingStart": 65,
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
        "fontSize": 30,
        "color": "rgba(247, 247, 247, 255)",
        alignSelf:'center'
      
      }
    } > {text}</Text>
 
  
    
    </View>
    </View>

  );
};