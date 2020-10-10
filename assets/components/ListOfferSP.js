import React, { Component , useState, useEffect } from 'react'
import {firebase, auth, database } from '../config/firebase'
import { Text, View, Button, Image, Dimensions ,StyleSheet} from 'react-native'
import colors from '../constants/colors';
import {Entypo,MaterialIcons} from '../constants/icons'
import { Card } from "@paraboly/react-native-card";


      const listOffer = (serviceProvider ) => {

        const [list,SetList]= useState([])
       
        const fetchList = async() =>{
            database.ref().child("serviceProvider/"+serviceProvider+'/Offers').on('child_added', data => {
                list.push({
                  title: data.val().title,
                  description: data.val().description,
                  code: data.val().code,
                  expiration:data.val().expiration
                });
              
        })
    };

    


        if ( list.length)
        return (
        list.map( offer => 
          <Card 
        title={offer.title}
        content={offer.description}
        iconName="local-offer"
        iconType="MaterialIcons"
        iconBackgroundColor= {colors.primaryBlue}
        bottomRightText={offer.expiration}
        //onPress={() => {}}
        />
        ))
      }

      export default listOffer;