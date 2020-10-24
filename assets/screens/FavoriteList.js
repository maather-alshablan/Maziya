import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, StyleSheet,
  ScrollView,
} from 'react-native'
import colors from '../constants/colors'
import { Entypo } from '../constants/icons'
import { Card } from "@paraboly/react-native-card";
import serviceProvider from './SPprofile'
import { firebase, auth, database } from '../config/firebase'

export default class Favorite extends Component {

  constructor() {
    super()
    this.state = {
      existOffers:null,
      offers: []
    }
  }
  componentDidMount() {

    var self = this;
    const subscribe = database.ref('favorites/' + auth.currentUser.uid)
      .on('value', function (snapshot) {
        const favorites = snapshot.val();
       console.log(favorites)
        const favoritesArray = []
      
        if (favorites != null){
        Object.keys(favorites).map(key => {
         console.log(favorites, self.state.offerDetails)
          favoritesArray.push(favorites[key])
        })
        self.setState({
          offers: favoritesArray,
          existOffers: true

        })
      }
      else{
        self.setState({
          existOffers: false
        })
        
      }} 
      )


    // subscribe.on('child_removed', function (data) {
    //   handleRemoveOffer(data.key)
    // })

    // const handleRemoveOffer = (key) => {

    //   var offer = this.state.offers

    //   offer = offer.filter(offer => offer.key !== key)
    //   this.setState({ offers: offer })
    // }

    // subscribe.on('child_added', function (data) {
    //   handleAddOffer(data)
    // })

    // const handleAddOffer = (data) => {

    //   var offer = this.state.offers

    //   this.setState({ offers: [...offer, data] })
    // }
  }

  Cards = () => {

    return (

      <Card
        title={this.props.brand}
        content={'Service Provider description'}
        iconName="local-offer"
        iconType="MaterialIcons"
        iconBackgroundColor={colors.primaryBlue}
        style={{ marginTop: 5 }}
        //bottomRightText={offer.expiration}
        onPress={() => navigation.navigate(serviceProvider)}
      />)
  }

  render() {
    console.log(this.state.offers)
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              this.props.navigation.toggleDrawer();
            }}
          >
            <Entypo name="menu" size={30} style={{ marginTop: 30 }} />
          </TouchableOpacity>
          <Text style={{ marginBottom: 10, fontSize: 22, color: colors.primaryBlue, alignItems: "center", textAlign: "center" }}>
            العروض المفضلة
            </Text>
          {this.state.existOffers ? 
          this.state.offers.map(offer => {
            return (
              <View style={{ margin: 15 }}>
                <Card
                  title={offer.title}
                  //content={'offer.description'}
                  iconName="local-offer"
                  iconType="MaterialIcons"
                  iconBackgroundColor={colors.primaryBlue}
                  //bottomRightText={'offer.expiration'}
                  //onPress= {() => this.props.navigation.navigate('editOffer', {offerKey: item.key })}/>

                  onPress={() => { this.props.navigation.navigate('serviceProvider', { offer: offer }) }}
                />
              </View>
            )
          } 
          ): <Text style={{alignSelf:'center', fontSize:20,color:colors.primaryGrey, marginTop:250}}> لا يوجد عروض في المفضلة</Text>}


        </ScrollView>
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
    textAlign: "right"
  },
});
