import React, { Component } from 'react'
import { Text, View, Button, Image, Dimensions ,StyleSheet, FlatList} from 'react-native'
import {firebase, auth, database } from '../config/firebase'
import colors from '../constants/colors';
import {Entypo,MaterialIcons} from '../constants/icons'
import NewOffer from './NewOffer'
import editOffer from '../screens/editOffer'
import { TouchableOpacity } from 'react-native-gesture-handler';
// ref: https://github.com/Paraboly/react-native-card
import { Card } from "@paraboly/react-native-card";


const OfferContext = React.createContext();
export default class serviceProviderHomescreen extends React.Component{
    
state = {
  name:'',
  offers:[],
}

componentDidMount(){
    var userId = auth.currentUser.uid
  
    const subscribe = database.ref('serviceProvider/'+ auth.currentUser.uid).child('offers')
    subscribe.on('child_added', child => {
      var offer = []
//data.forEach((child) => {
      offer.push({
      key: child.key,
      title: child.val().title,
      description: child.val().Descripiton,
      //code: data.val().code,
      expiration:child.val().expdate
    })
  
  
    this.setState({offers: offer})
})   

  subscribe.on('child_removed', function(data){
    handleRemoveOffer(data.key)})

    const handleRemoveOffer = (key) => {

      var offer = this.state.offers
      
      offer = offer.filter(offer=> offer.key !== key )
      this.setState({offers:offer})
    }
  }
        
      // listOffer = () => {

      //   if( this.state.offers.length-1)
      //   return (
        
      //   this.state.offers.map( offer => 
      //     <Card 
      //   title={offer.title}
      //   content={offer.Descripiton}
      //   iconName="local-offer"
      //   iconType="MaterialIcons"
      //   iconBackgroundColor= {colors.primaryBlue}
      //   //bottomRightText="30"
      //   onPress= {() => this.props.navigation.navigate('editOffer')}/>
      //   )
      //   )
      // }
      listOffer = (title, description) => {

        return (
        <TouchableOpacity>
          
          <Card 
        title={title}
        content={description}
        iconName="local-offer"
        iconType="MaterialIcons"
        iconBackgroundColor= {colors.primaryBlue}
        //bottomRightText="30"
        onPress= {() => this.props.navigation.navigate('editOffer')}/>
        </TouchableOpacity>
        )
        
      }

    render(){
      
      const userId = auth.currentUser.uid;
      
     //this.state.name = this.userName()


    return(
        <View style={ { flex:1, alignItems: 'center', justifyContent:"flex-start" , backgroundColor:'white'}}>
       <Text style={styles.header}> </Text>

          <View style={{flexDirection: "row", justifyContent:'space-between', marginTop:15}}>
          <TouchableOpacity style ={styles.appButtonContainer} 
          onPress= {() => this.props.navigation.navigate('addOffer')} >
          <Entypo name ="plus" size={40} color='white'/>

            <Text style= {styles.appButtonText} > إضافة عرض </Text>
            </TouchableOpacity>
            <TouchableOpacity style ={[styles.appButtonContainer]} >
          <Entypo name ="chat" size={40} color='white'/>

            <Text style= {styles.appButtonText} >       الرسائل    </Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.header}>عروضي </Text>
            <View  style={{flex:1,alignSelf:'center', justifyContent:'center'}}>
            <FlatList
            style={{width:'100%'}}
            data= {this.state.offers}
            keyExtractor={(item)=>item.key}
            renderItem={({item})=>
            
            {
              
              return(
            <View style={{marginTop:15}}>
              {/* <OfferContext.Provider value={item.key}> */}
            <Card 
          title= {item.title}
          content={item.Descripiton}
          iconName="local-offer"
          iconType="MaterialIcons"
          iconBackgroundColor= {colors.primaryBlue}
          //bottomRightText="30"
          onPress= {() => this.props.navigation.navigate('editOffer', {offerKey: 'hi'})}/>
          {/* , {offerKey: item.key} */}
           {/* </OfferContext.Provider> */}
          </View>
       
              )
            }} />
             </View>
            
          
            
            <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonView} onPress={() => auth
            .signOut()
            .then(() => this.props.navigation.popToTop())}>
            <Entypo name="log-out" size={25} color={colors.primaryBlue}/>
            <Button  type="outline" title="تسجيل الخروج"  color={colors.primaryBlue} border="solid" border-color="black" />
            </TouchableOpacity>
            </View>

        </View>
    
    );
}
}




const styles = StyleSheet.create({
    header:{
        color: colors.primaryBlue,
        fontSize:25,
        alignItems:'flex-start',
        textAlign:'right',
       margin:20
    }, 
    appButtonContainer: {
        elevation: 8,
        backgroundColor: colors.primaryBlue,
        borderRadius: 25,
        paddingVertical: 25,
        paddingHorizontal: 25,
        alignItems:'center',
        margin:20
      },
      appButtonText: {
        fontSize: 15,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
      },
        OfferCard: {
        elevation: 8,
        backgroundColor: colors.primaryBlue,
        borderRadius: 25,
        paddingVertical: 30,
        paddingHorizontal: 150,
        alignItems:'center',
      },
      buttonView:{
        marginRight:200,
        marginTop:25,
       flexDirection:'row-reverse',
        alignSelf:'flex-end'
      },
      offerContainer:{
          marginTop:50
      },
      footer:{
     
      }
})