import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,
  ScrollView, } from 'react-native'
import colors from '../constants/colors'
import {Entypo} from '../constants/icons'
import { Card } from "@paraboly/react-native-card";
import serviceProvider from './SPprofile'
import {firebase, auth } from '../config/firebase'

export default class Favorite extends Component{

  Cards=()=>{
    // const name='zara'
    
    // database.ref().child('serviceProviders/zara').once('value', function(data){
    //  setData(data.val().description)
      
    // })

    // const setData = (data)=>{
    // this.setState( {description: data })}
    return(
      
    <Card
    title={this.props.brand}
    content={'Service Provider description'}
    iconName="local-offer"
    iconType="MaterialIcons"
    iconBackgroundColor= {colors.primaryBlue}
    style={{marginTop:5}}
    //bottomRightText={offer.expiration}
    onPress={() => navigation.navigate(serviceProvider)}
    /> )
  }

render(){
    return(
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                    this.props.navigation.toggleDrawer();
                }}
                >
                <Entypo name="menu" size={30} style={{marginTop:30}} />
            </TouchableOpacity>
            <Text style={{ marginBottom:10 ,fontSize: 22, color: colors.primaryBlue, alignItems: "center", textAlign:"center" }}>
            العروض المفضلة
            </Text>

            <Card 
              
              title={'Zara'}
              //content={'offer.description'}
              iconName="local-offer"
              iconType="MaterialIcons"
              iconBackgroundColor= {colors.primaryBlue}
              //bottomRightText={'offer.expiration'}
              onPress={() => {this.props.navigation.navigate(serviceProvider)}}
            />

        </ScrollView>
      </View>

    );
}

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
