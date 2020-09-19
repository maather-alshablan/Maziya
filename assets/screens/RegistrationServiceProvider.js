import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View , Label, StyleSheet, Dimensions , Button, ColorPropType} from 'react-native'
import colors from "../constants/colors";
import styles from '../constants/styles'
import icons from '../constants/icons'
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default class RegistrationServiceProvider extends Component {
  state = { email: "", password: "", confirmPassword: "", errorMessage: null };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header}>تسجيل مزود الخدمة</Text>
        </View>

        <View style={{ flex: 1 }}>
          <ProgressSteps
            activeStepIconBorderColor={colors.primaryBlue}
            activeLabelColor={colors.primaryBlue}
            completedProgressBarColor={colors.primaryBlue}
            completedStepIconColor={colors.primaryBlue}
          >
            <ProgressStep
              label="الحساب"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View>
                <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫ </Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="الاسم"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                  /></View>
                  <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="البريد الإلكتروني"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                  /></View>
                  <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="رقم الجوال"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                  />
                  </View>
                  <View style={styles.fields}>
                  <Text style={styles.fieldLabels}>⚫</Text>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="كلمة المرور"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </ProgressStep>
            <ProgressStep
              label="الوصف"
              previousBtnText="السابق"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 2!</Text>
              </View>
            </ProgressStep>
            <ProgressStep
              label="الموقع"
              previousBtnText="السابق"
              nextBtnText="التالي"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
            <ProgressStep
              label="العروض"
              previousBtnText="السابق"
              finishBtnText="تسجيل"
              nextBtnTextStyle={{ color: "#ffff", fontSize: 20 }}
              nextBtnStyle={styles.nextButton}
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "white",
//   },

//   header: {
//     fontFamily: "Bradley Hand",
//     fontWeight: "bold",
//     fontSize: 35,
//     alignSelf: "center",
//     color: colors.primaryBlue,
//     marginTop: 15,
//     marginBottom: 15,
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "stretch",
//     justifyContent: "center",
//     borderRadius: 22.5,
//     borderWidth: 1,
//     borderColor: "rgba(247, 247, 247, 255)",
//     backgroundColor: "rgba(1, 132, 189, 255)",
//   },
//   nextButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "stretch",
//     justifyContent: "center",
//     color: colors.primaryGrey,
//     borderRadius: 22.5,
//     borderWidth: 0.1,
//     borderColor: colors.primaryGrey,
//     backgroundColor: colors.primaryBlue,
//   },
//   buttonText: {
//     textAlign: "center",
//   },
// });
