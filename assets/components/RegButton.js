import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {Feather } from '../constants/icons'

export default ({ text, onPress }) => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingStart: 65,
          paddingTop: 0,
          width: 203,
          height: 45,
          borderRadius: 22.5,
          borderWidth: 1,
          borderColor: "rgba(247, 247, 247, 255)",
          backgroundColor: "rgba(1, 132, 189, 255)",
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <Feather name ="upload" size={30} color='white'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};
