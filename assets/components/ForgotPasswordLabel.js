import React from 'react';
import {
  View,
  Text
} from 'react-native';

export default () => {
  return (
    <View style = {
      {
        marginTop: 10,
        "alignItems": "flex-start"
      }
    } >
    <Text style = {
      {
        "fontFamily": "Bodoni 72 Smallcaps",
        "fontSize": 15,
        "color": "rgba(121, 121, 121, 255)"
      }
    } > نسيت كلمة المرور؟ </Text>
    </View>

  );
};