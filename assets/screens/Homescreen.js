import React from 'react'
import { Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput } from 'react-native'
import {firebase, auth } from '../config/firebase'
import {Entypo} from '../constants/icons'
import colors from '../constants/colors'
import {FontAwesome} from 
"@expo/vector-icons";

// add bottom navigation 
// drawer navigation 
const Homescreen =({ navigation}) => {
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                    navigation.toggleDrawer();
                }}
                >
                <Entypo name="menu" size={30} />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, color: "blue", alignSelf: "flex-end" }}>
          اكتشف مميزاتك..
            </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity>
            <Text>الكل</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text> المطاعم</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>الصحة</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>الهدايا</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.viewSearch}>
          <TextInput style={styles.inputSearch} />
          <TouchableOpacity>
            <FontAwesome name="search" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewBox}></View>
        <View style={styles.viewBox}></View>
      </ScrollView>
    </View>
  );
}
          
            

  /*          
            <Button  type="outline" title="Log out"  color="black" border="solid" border-color="black" onPress={() => auth
            .signOut()
            .then(() => navigation.navigate('Login'))}
            
            />
        </View>


    
    );

    
};*/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor:'white'
    },
    viewBox: {
      width: "80%",
      height: 230,
      borderWidth: 2,
      borderColor: "#bbb",
      borderRadius: 20,
      alignSelf: "center",
      marginTop: 20,
    },
    inputSearch: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 0,
      color: 'black',
    },
    viewSearch: {
      backgroundColor: colors.primaryGrey,
      width: 200,
      borderRadius: 30,
      height: 50,
      marginTop: 20,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 15,
    },
  });



export default Homescreen;