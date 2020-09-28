import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight, StyleSheet, View } from "react-native";
import colors from '../constants/colors'


export default class NextArrowButton extends Component {
    render() {
      const { disabled, handelPress } = this.props;
      // console.log()
      return (
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            onPress={handelPress}
            style={[{ opacity: 0.8 }, styles.button]}
            disabled={disabled}
          >
            <Icon
              name="angle-right"
              color={colors.primaryBlue}
              size={32}
              style={styles.icon}
            
            
            />

          </TouchableHighlight>
        </View>
      );
    }
  }
  
  NextArrowButton.propTypes = {
    disabled: PropTypes.bool,
    handleNextButton: PropTypes.func
  };
  
  const styles = StyleSheet.create({
    buttonWrapper: {
      alignItems: "flex-end",
      right: 20,
      bottom: 20,
      right: 20
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      width: 60,
      height: 60,
      backgroundColor: 'white'
    },
    icon: {
      marginRight: -2,
      marginTop: -2
    }
  });