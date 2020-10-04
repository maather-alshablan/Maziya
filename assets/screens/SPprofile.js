import React , {Component , useEffect , useState} from 'react'
import { Text, View,  TextInput, Dimensions , StyleSheet,ScrollView, TouchableOpacity} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
import {Dropdown }from 'react-native-material-dropdown';


import {auth, database } from '../config/firebase'
import colors from '../constants/colors';
import styless from "../constants/styles";
import { render } from 'react-dom';




const serviceProvider =({ navigation}) => {

    
    console.disableYellowBox = true;
    


  const [userName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNum, setphoneNum] = useState('')
  const [password, setPassword] = useState('')
  const [nameBrand, setnameBrand] = useState('')
  const [category, setCategory] = useState('')
  const [Descripiton, setDescripiton] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')

const userId = auth.currentUser.uid;
 let userRef = database.ref('users/'+ userId);
 


 useEffect(() => {
        userRef.once('value').then(function(snapshot) {
        setName((snapshot.val() && snapshot.val().name) )
        setPassword((snapshot.val() && snapshot.val().password))
        setEmail((snapshot.val() && snapshot.val().email))
        setnameBrand((snapshot.val() && snapshot.val().trademark))
  
        

        database.ref('serviceProvider/'+nameBrand).once('value').then(function(snapshotinner) {
            setDescripiton((snapshotinner.val() && snapshotinner.val().Descripiton))
            setphoneNum((snapshotinner.val() && snapshotinner.val().phone))
            setCategory((snapshotinner.val() && snapshotinner.val().category))

        });

 } )})

const handleUpdate  = ()=>{

userRef.update(
    {
    'name': userName,
    'email': email, 
}
).catch(error => alert(error));

database.ref('serviceProvider/'+nameBrand).update({
    'Descripiton': Descripiton,
    'category': category,
    'phone': phoneNum,
    'webiste': website,
    'twitter': twitter,
    'instagram': instagram

}).catch(error => alert(error));

}


const validateForm = () =>{



    handleUpdate();
}
    //Trademark 
    const FirstRoute = () => (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >

            <View style={{alignSelf:'flex-end',flexDirection:'row-reverse',marginTop:10,marginLeft:10}}>
            <MaterialCommunityIcons name="tooltip-text-outline" color={colors.primaryBlue} size={30} />
                  <Text style={[styless.fieldLabels],[{fontSize:17}]}> الوصف</Text>
                  </View>
              <View style={styless.fields}>

                  <TextInput
                    style={[styless.TextInput],[styles.textArea]}
                    placeholder=" وصف العلامة التجارية"
                    onChangeText={(Descripiton) =>setDescripiton({ Descripiton }) }
                    value={Descripiton}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical
                    textAlign='right'
                    autoCapitalize="none"
                  />
                </View>
                <View style={[styless.fields]}>
          
                <FontAwesome name="tags" color={colors.primaryBlue} size={25}/>
                    <Text style={[styless.fieldLabels],[{fontSize:17,marginRight:10}]}> الفئة</Text>
                   <Dropdown
                    label="الفئة"
                    data={categories}
                   onChangeText={(category) => setCategory({ category })}
                    containerStyle={{ width: 100, marginLeft: 155}}
                   value={category}
                  /> 
                   </View>
                   <View style={styless.fields}>
                <MaterialCommunityIcons name="web" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder=" الموقع الإلكتروني"
                    onChangeText={(website) => setWebsite({ website })}
                    value={website}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styless.fields}>
                <MaterialCommunityIcons name="twitter" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder=" تويتر"
                    onChangeText={(twitter) => setTwitter({ twitter })}
                    value={twitter}
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styless.fields}>
                <MaterialCommunityIcons name="instagram" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder=" انستغرام"
                    onChangeText={(instagram) => setInstagram({ instagram })}
                    value={instagram}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.fields}>{/*<Upload/> */}</View>
            </View>
      );
      
      const SecondRoute = () => (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >
             
                <View style={styless.fields}>
                  
                  <MaterialCommunityIcons name="account" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder="*الاسم"
                    //onChangeText={(userName) => this.setState({ userName })}
                    value={userName}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styless.fields}>
                  
                  <MaterialCommunityIcons name="email" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />

                  <TextInput
                    style={styless.TextInput}
                    placeholder="*البريد الإلكتروني"
                   onChangeText={(email) => setEmail({ email })}
                   value={email}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styless.fields}>
                <FontAwesome name="phone" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />

                  <TextInput
                    style={styless.TextInput}
                    placeholder="  (*** **** *05) رقم الجوال"
                    onChangeText={(phoneNum) => setphoneNum({ phoneNum })}
                    value={phoneNum}
                    autoCapitalize="none"
                  />
                </View>
                <View style={[styless.fields]}>
                <FontAwesome name="lock" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    secureTextEntry
                    placeholder="*كلمة المرور"
                    value={password}
                    autoCapitalize="none"
                    editable={false}
                  /></View>
                  <View style={[styless.fields]}>
                <TouchableOpacity>
                    <Text style={styles.changePassword}>
                        هل ترغب بتغيير كلمة المرور؟
                    </Text>
                </TouchableOpacity>
                </View>
                
                
                    

            </View>
      );
      
      const ThirdRoute = () =>{
        return (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >
            <Text>Locations</Text>
        </View>
        );

      }
      const initialLayout = { width: Dimensions.get('window').width };
      
        const [index, setIndex] = React.useState(2);
        const [routes] = React.useState([
          { key: 'third', title: 'المواقع' },
          { key: 'first', title: 'التفاصيل' },
          { key: 'second', title: 'حسابي' },
        ])
      
        const renderScene = SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
          });
        
          let categories = [{
      
            value: 'المطاعم',
          }, {
            value: 'المستلزمات',
          }, {
            value: 'الصحة',
          },{
            value: 'الدورات',
          }, {
            value: 'التسوق',
          }, {
            value: 'الخدمات',
          }
        ];

        const renderTabBar = props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.primaryBlue }}
              style={{ backgroundColor: 'white' }}
              labelStyle={{color:'black'}}
            />
          );
    return(
       
         <View style={{flex:1,backgroundColor:'white' }} > 
       

         <View style={{flexDirection:'row' ,marginTop:20, alignItems:'flex-start'}}>
             <TouchableOpacity>
       {/*  <Entypo name='chevron-left' size={30} color= {colors.primaryBlue }  onPress={()=> navigation.pop()} /> */}
         </TouchableOpacity>
         <Text style={styles.header}>الحساب</Text>
         </View>
         <ScrollView showsVerticalScrollIndicator={false}>
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tab}
        renderTabBar={renderTabBar}
        

      >
          
      </TabView>
      </ScrollView>
      <TouchableOpacity style={styles.ButtonContainer}>
                        <Text style={styles.appButtonText} >حفظ</Text>
                    </TouchableOpacity>
                    
      </View>
  
    );

    
};
const styles = StyleSheet.create({
    container: {
      marginTop: 70,
   
    },
    scene: {
      flex: 1,
      backgroundColor:'red'
    },
    tab:{
        backgroundColor:'white',
        color:colors.primaryBlue,
        marginTop: 30,
    },
    ButtonContainer: {
        elevation: 8,
        backgroundColor: colors.primaryBlue,
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 50,
        alignItems:'center',
        margin:20,
        marginHorizontal:40,
        marginTop:20
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      textArea:{
        width:250,
        paddingTop: 30,
        borderColor:'black',
        borderBottomWidth:1,
        textAlign: 'center',
        height: 50,
        borderWidth: 2,
        borderColor: '#9E9E9E',
        borderRadius: 20 ,
        backgroundColor : "#FFFFFF",
        height: 150,
    marginRight:20,
      },
      changePassword:{
        fontSize:12,
        color:colors.primaryGrey, 
        marginRight:27

      },
      header:{
        marginHorizontal:140,
        marginTop:10, 
        color: colors.primaryBlue,
        fontSize: 25
      }
  });
  


export default serviceProvider;



 
