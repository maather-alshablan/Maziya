import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import BottomTabNavigator from "./BottomTabNavigator";
import Homescreen from "../screens/Homescreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerStyle={{ width: 220 }}
      initialRouteName="Homescreen"
      drawerContent={(prop) => <DrawerContent {...prop} {...props} />}
    >
      <Drawer.Screen name="Homescreen" component={Homescreen} />
    </Drawer.Navigator>
  );
};

function DrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "blue" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.navigate("profile")}
          style={[styles.button, { marginTop: 12 }]}
        >
          <Text style={styles.textButton}>حسابي</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={() => props.navigation.navigate("Login")}
          style={[styles.button, { marginTop: 12 }]}
        >
          <Text style={styles.textButton}>الدورات المسجلة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={() => props.navigation.navigate("Login")}
          style={[styles.button, { marginTop: 12 }]}
        >
          <Text style={styles.textButton}>العروض المستخدمة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={() => props.navigation.navigate("Login")}
          style={[styles.button, { marginTop: 12 }]}
        >
          <Text style={styles.textButton}> العروض المفضلة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={() => props.navigation.navigate("Login")}
          style={[styles.button, { marginTop: 12 }]}
        >
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textButton: {
    // fontFamily: "Poppins-SemiBold",
    color: "#fff",
    // marginLeft: 15,
  },
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    // paddingLeft: 30,
    backgroundColor: "#fff",
    borderBottomColor: "rgba(112, 112, 112, 0.3)",
    borderBottomWidth: 1,
    backgroundColor: "blue",
  },
  textEmail: {
    color: "#fff",
    opacity: 0.4,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  linear: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginTop: 15,
  },
});
