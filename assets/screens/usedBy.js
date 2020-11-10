import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView,
} from 'react-native'
import {BarChart} from "react-native-chart-kit";
import colors from '../constants/colors'
import { database, auth } from '../config/firebase';

export default class chart extends Component {
state = {
  offers:[],
  labels:[],
  data:[],
  dataFav: []

}


  componentDidMount(){
    console.log('hi');

    var self = this;
    database.ref().child('Offers').on('value',function(snapshot){
      const offers= snapshot.val()
      const list =[]
      const labels=[]
      const data = []
      const dataFav =[]

      if (offers != null){
       Object.keys(offers).map(key => {
        
        if(offers[key].serviceProvider == auth.currentUser.uid){
          console.log(offers[key].code)
         list.push(offers[key])
         labels.push(offers[key].title)
         data.push(offers[key].usedCount)
         dataFav.push(offers[key].favoriteCount)

        }
       })
      self.setState(
        {offers: list,
        labels:labels,
        data:data,
        dataFav:dataFav}) }
    })
  }


  render() {

    const chartConfig = {
      backgroundGradientFrom: 'white',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: 'white',
      backgroundGradientToOpacity: 0.5,
      //rgba(1, 132, 189, 255)
      color: (opacity = 1) => `rgba(1, 132, 189, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };



   const screenWidth  = Dimensions.get("window").width;
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.data
        }
      ]
    };
   
    const dataFavorite = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.dataFav
        }
      ]
    };

    
    




    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
         
         
          <Text style={{ marginTop:60, fontSize: 35, color: colors.primaryBlue,  textAlign: "center" }}>
            الإحصائيات          
 </Text>


{ this.state.data ?  
 <View>
 <Text style={{ alignSelf:'center' ,fontSize: 22, color: colors.primaryGrey, marginBottom:20 ,marginTop:20}}>أكثر العروض استخداماً</Text>

 <BarChart

 data={data}
 width={screenWidth}
 height={400}
 chartConfig={chartConfig}
 verticalLabelRotation={30}
 backgroundColor="transparent"
 showValuesOnTopOfBars
 
/> 
 </View> 
:<View><Text style={{ alignSelf:'center' ,fontSize: 22, color: colors.primaryGrey, marginBottom:20,marginVertical:150 }}>لا توجد لديك عروض</Text></View>} 





 <View style={{alignSelf:'center',justifyContent:'center',marginTop:50}}> 
{ this.state.dataFav ?  
 <View><Text style={{ alignSelf:'center' ,fontSize: 22, color: colors.primaryGrey, marginBottom:20 }}>أكثر العروض المفضلة</Text>

 <BarChart

 data={dataFavorite}
 width={screenWidth}
 height={400}
 chartConfig={chartConfig}
 verticalLabelRotation={30}
 backgroundColor="transparent"
/> 
 </View> 
: <View></View>} 
</View>

           
        </ScrollView>
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: 'white',
  },

});
