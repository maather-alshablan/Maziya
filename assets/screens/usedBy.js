import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, StyleSheet, Dimensions,
  ScrollView,
} from 'react-native'
import {BarChart} from "react-native-chart-kit";
import colors from '../constants/colors'

export default class chart extends Component {


  usedChart = () => { 

    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };



   const screenWidth  = Dimensions.get("window").width;
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    };

    return(
<BarChart
 
  data={data}
  width={screenWidth}
  height={220}
  yAxisLabel="$"
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/> ) 

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
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    };

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
         
         
          <Text style={{ marginTop:60, fontSize: 35, color: colors.primaryBlue,  textAlign: "center" }}>
            الإحصائيات          
 </Text>
 <View style={{alignSelf:'center',justifyContent:'center',marginTop:150}}> 
 <Text style={{ alignSelf:'flex-end' ,fontSize: 22, color: colors.primaryGrey, marginBottom:20 }}>أكثر العروض استخداماً</Text>

 <BarChart

 data={data}
 width={screenWidth}
 height={220}
 yAxisLabel="$"
 chartConfig={chartConfig}
 verticalLabelRotation={30}
 backgroundColor="transparent"
/>
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
