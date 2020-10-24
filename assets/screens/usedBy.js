import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, StyleSheet,
  ScrollView,
} from 'react-native'
import colors from '../constants/colors'

export default class Favorite extends Component {

  constructor() {
    super()
    this.state = {
      existOffers:null,
      offers: []
    }
  }
  


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
  

//   Cards = () => {

//     return (

//       <Card
//         title={this.props.brand}
//         content={'Service Provider description'}
//         iconName="local-offer"
//         iconType="MaterialIcons"
//         iconBackgroundColor={colors.primaryBlue}
//         style={{ marginTop: 5 }}
//         //bottomRightText={offer.expiration}
//         onPress={() => navigation.navigate(serviceProvider)}
//       />)
//   }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
         
         
          <Text style={{ marginBottom: 10, fontSize: 22, color: colors.primaryBlue, alignItems: "center", textAlign: "center" }}>
            مستخدمي العروض           
 </Text>
         
              
           
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
