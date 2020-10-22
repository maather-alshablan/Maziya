import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native'
import { firebase, auth, database } from '../config/firebase'
import { Entypo } from '../constants/icons'
import colors from '../constants/colors'
import { FontAwesome } from
  "@expo/vector-icons";
import { Card } from "@paraboly/react-native-card";
import serviceProvider from './SPprofile'


// add bottom navigation 
// drawer navigation 
export default class Homescreen extends React.Component {
  state = {
    brand: '',
    description: '',
    offers: []
  }

  componentDidMount() {

    const subscribe = database.ref('Offers')
    subscribe.on('value', snapshot => {
      const offers = snapshot.val();
      const offersArray = [];
      Object.keys(offers).map(key => {
        // console.warn(offers[key]);
        offersArray.push({
          key: key,
          ...offers[key]
        });

      });
      this.setState({
        offers: offersArray


      })
    })


  }


  Cards = () => {
    // const name='zara'

    // database.ref().child('serviceProviders/zara').once('value', function(data){
    //  setData(data.val().description)

    // })

    // const setData = (data)=>{
    // this.setState( {description: data })}
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


    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              this.props.navigation.toggleDrawer();
            }}
          >
            <Entypo name="menu" size={30} style={{ marginTop: 15 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, color: colors.primaryBlue, alignSelf: "flex-end" }}>
            اكتشف مميزاتك..
            </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 8
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
          {/* {this.Cards()} */}
          {
            this.state.offers.map(offer => {

              return (
                <View style={{ marginTop: 15 }}>
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
            })
          }
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



