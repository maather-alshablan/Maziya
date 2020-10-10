import React from 'react'
import { Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput } from 'react-native'
import {firebase, auth, database } from '../config/firebase'
import {Entypo} from '../constants/icons'
import colors from '../constants/colors'
import {FontAwesome} from 
"@expo/vector-icons";
import { Card } from "@paraboly/react-native-card";
import serviceProvider from './SPprofile'


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
                <Entypo name="menu" size={30} style={{marginTop:15}} />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, color: colors.primaryBlue, alignSelf: "flex-end" }}>
          اكتشف مميزاتك..
            </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop:8
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
       <Card 
        title={'title'}
        content={'offer.description'}
        iconName="local-offer"
        iconType="MaterialIcons"
        iconBackgroundColor= {colors.primaryBlue}
        bottomRightText={'offer.expiration'}
        onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
}


const serviceProviders=()=>{
  const name=''
  const description=''
  database.ref().child('serviceProvider/zara').once('value', function(data){
    name=  'zara'// data.val().s
     description = data.val().description
    
  })
  return(
  <Card
  title={name}
  content={description}
  iconName="local-offer"
  iconType="MaterialIcons"
  iconBackgroundColor= {colors.primaryBlue}
  //bottomRightText={offer.expiration}
  //onPress={() => {}}
  /> )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor:'white',
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
      textAlign:"right"
    },
  });



export default Homescreen;