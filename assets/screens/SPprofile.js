import React , {Component , useEffect , useState, useMemo   } from 'react'
import { Text, View,  TextInput, Dimensions  , StyleSheet,Image, ScrollView,Button, TouchableOpacity, Alert, AsyncStorage} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {Entypo, MaterialCommunityIcons,MaterialIcons, FontAwesome, Ionicons} from '../constants/icons'
//import {Dropdown }from 'react-native-material-dropdown';
import {auth, database } from '../config/firebase'
//import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../constants/colors';
import styless from "../constants/styles";
import { render } from 'react-dom';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import RegButton from "../components/RegButton";




const serviceProvider =({ navigation}) => {

    
   // console.disableYellowBox = true;
    


  const [userName, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const [phoneNum, setphoneNum] = useState('')
  const [password, setPassword] = useState('')
  const [nameBrand, setnameBrand] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('https://imgplaceholder.com/72x80')
  const [Descripiton, setDescripiton] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [branch,setBranch]=useState('')

  const [valid, setValid]= useState(true)
  const [errorMessage,setErrorMessage]=useState(null)
  // const [ fetchingUser, setFetchingUser ] = useState(true);
  // const [textInput,setTextInput]=useState([])
  // const [inputData,setInputData]=useState([])

const userId = auth.currentUser.uid;
 let userRef = database.ref('users/'+ userId);

   const checkPer = async()=> {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
    const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (newPermission.status === "granted") {
    }
    }  
    } 
  
  const fetchData=  () =>{
    setEmail(auth.currentUser.email)
          
        const subscribe1 = userRef.once('value').then(function(snapshot) {
        setnameBrand((snapshot.val() && snapshot.val().serviceProvider))
        setName((snapshot.val() && snapshot.val().name) )
        setPassword((snapshot.val() && snapshot.val().password))
         
        database.ref('serviceProvider/'+auth.currentUser.uid).once('value').then(function(snapshotinner) {
            setDescripiton((snapshotinner.val() && snapshotinner.val().description))
            setphoneNum((snapshotinner.val() && snapshotinner.val().phone))
            setCategory((snapshotinner.val() && snapshotinner.val().category))
            setWebsite((snapshotinner.val() && snapshotinner.val().website))
            setTwitter((snapshotinner.val() && snapshotinner.val().twitter))
            setInstagram((snapshotinner.val() && snapshotinner.val().instagram))
       })})
       
      }
    
  
  


 useEffect(() => {
  checkPer()
     
  fetchData();          
   
       
        },[])


 const openImagePickerAsync = async () => {
  await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
    aspect: 1,
    allowsEditing: true,
  });
  if (!cancelled) setImage(uri);
};




const handleUpdate  = ()=>{

userRef.update(
    {
    'name': userName,
    'email': email, 
}
).catch(error => alert(error));

database.ref('serviceProvider/'+nameBrand).update({
    'description': Descripiton,
    'category': category,
    'phone': phoneNum,
    'website': website,
    'twitter': twitter,
    'instagram': instagram

}).catch(setWrongEmailFormat).then(alert('تم حفظ التغييرات بنجاح')).then(auth.currentUser.updateEmail(email)).catch(setWrongEmailFormat)


}

const setWrongEmailFormat=()=>{
  setValid(false);
  setErrorMessage("يرجى كتابة بريد الكتروني صحيح")
}
const validateForm = () =>{
  setValid(true)

  if (phoneNum.length != 10) {
   setValid(false);
    setErrorMessage(" يرجى التأكد من ادخال رقم التواصل يالصيغة  0XXXXXXXXX ")
    return;
}

const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === "" || !regexp.test(email)) {
 
    setValid(false);
    setErrorMessage("يرجى كتابة بريد الكتروني صحيح")
    return;

   
  }

  if ( userName === ""){ 
    setValid(false);
    setErrorMessage("يرجى ادخال الاسم")
    return;
  }

  if (Descripiton === "" ) { // provide better description
    setValid(false);
    setErrorMessage("يرجى ادخال الوصف")
    return;
  }

  if (image === ""  ) {
    setValid(false);
    setErrorMessage("يرجى إختيار صورة")
    return;
  }

  if (website ===""){
    setValid(false);
    setErrorMessage("يرجى ادخال الموقع الإلكتروني بالشكل الصحيح")
    return;
  }

  if(!website.endsWith('.com')){
    setValid(false);
    setErrorMessage("يرجى ادخال الموقع الإلكتروني بالشكل الصحيح")
    return;
  }

  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
   
  if (!pattern.test(website)){
    setValid(false);
    setErrorMessage("يرجى ادخال الموقع الإلكتروني بالشكل الصحيح")
    return; 
  }
  

 
  if (!twitter.startsWith('@')){
    setValid(false);
    setErrorMessage("يرجى ادخال حساب تويتر بالصيغة @example")
    return; 
  }


  const twitterExp =  /^(?:@)([A-Za-z0-9_]){1,15}$/
  if (!twitterExp.test(twitter) ){
    setValid(false);
    setErrorMessage("يرجى ادخال حساب تويتر بالشكل الصحيح")
    return;
  }

  const instagramExp = new RegExp('^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$')
  if (instagram != '' && !instagramExp.test(instagram) ){
    setValid(false);
    setErrorMessage("يرجى ادخال حساب الإنستغرام بالشكل الصحيح")
    return;

  }

  if (valid) {
    setErrorMessage('')
    handleUpdate();
    }
};


    //Trademark 
    
    const FirstRoute = () => (
      
      <View style={[styles.scene, { backgroundColor: 'white' }]} >
             <View style={{alignSelf:'flex-end',flexDirection:'row-reverse',marginTop:10,marginLeft:10}}>
            <MaterialCommunityIcons name="image-search-outline" color={colors.primaryBlue} size={30} />
                  <Text style={[styless.fieldLabels],[{fontSize:17}]}>  صورة العلامة التجارية</Text>
                  </View>
              <View style={{ alignItems: "center" }}>
                <View style={styles.image}
                 >
                  <Image
                    style={styless.image}
                    source={{ uri: image  }}
                  />
                  <TouchableOpacity onPress={openImagePickerAsync}>
                    <RegButton text={"choose photo"} ></RegButton>
                  </TouchableOpacity>
                </View>
                </View>
            <View style={{alignSelf:'flex-end',flexDirection:'row-reverse',marginTop:10,marginLeft:10}}>
            <MaterialCommunityIcons name="tooltip-text-outline" color={colors.primaryBlue} size={30} />
                  <Text style={[styless.fieldLabels],[{fontSize:17}]}> الوصف</Text>
                  </View>
              <View style={styless.fields}>

                  <TextInput
                    style={[styless.TextInput],[styles.textArea]}
                    placeholder=" وصف العلامة التجارية"
                    onChangeText={Descripiton => setDescripiton( Descripiton ) }
                    value={Descripiton}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical
                    textAlign='right'
                    autoCapitalize="none"
                  />
                </View>
                <View style={[styless.fields]}>
          
                {/* <FontAwesome name="tags" color={colors.primaryBlue} size={25}/>
                    <Text style={[styless.fieldLabels],[{fontSize:17,marginRight:10}]}> الفئة</Text>
                    <TextInput
                    style={styless.TextInput}
                    placeholder=" الفئة"
                    onChangeText={(category) => setCategory(category )}
                    value={category}
                    autoCapitalize="none"
                  /> */}
                </View>
                  {/* <Dropdown
                    label="الفئة"
                    data={categories}
                   onChangeText={(category) => setCategory(category )}
                    containerStyle={{ width: 100, marginLeft: 155}}
                   value={category}
                  /> 
                  */}
                  
                  {/* <DropDownPicker
          items={[
        {label: 'المطاعم', value: 'المطاعم'},
        {label: 'المستلزمات', value: 'المستلزمات'},
        {label: 'الصحة', value: 'الصحة'},
        {label: 'الدورات', value: 'الدورات'},
        {label: 'التسوق', value: 'التسوق'},
        {label: 'الخدمات', value: 'الخدمات'},
          ]}
          multiple={false}
          defaultValue={''}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => setCategory(item)}
/> */}
                 
                   <View style={styless.fields}>
                <MaterialCommunityIcons name="web" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    
                    placeholder=" الموقع الإلكتروني"
                    onChangeText={ website => setWebsite(website )}
                    value={website}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styless.fields}>
                <MaterialCommunityIcons name="twitter" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder=" تويتر"
                    onChangeText={twitter => setTwitter(twitter )}
                    value={twitter}
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styless.fields}>
                <MaterialCommunityIcons name="instagram" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder=" انستغرام"
                    onChangeText={instagram => setInstagram(instagram)}
                    value={instagram}
                    autoCapitalize="none"
                  />
                </View>

              
            </View>
      );
      
      const SecondRoute = () => (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >
             
                <View style={styless.fields}>
                  
                  <MaterialCommunityIcons name="account" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />
                  <TextInput
                    style={styless.TextInput}
                    placeholder="*الاسم"
                    onChangeText={userName => setName(userName )}
                    value={userName}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styless.fields}>
                  
                  <MaterialCommunityIcons name="email" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />

                  <TextInput
                    style={styless.TextInput}
                    placeholder="*البريد الإلكتروني"
                   onChangeText={email => setEmail(email )}
                   value={email}
                    
                  />
                </View>
                <View style={styless.fields}>
                <FontAwesome name="phone" color={colors.primaryBlue} size={30} style={styless.fieldLabels} />

                  <TextInput
                    style={styless.TextInput}
                    placeholder="  (*** **** *05) رقم الجوال"
                    onChangeText={phoneNum => setphoneNum( phoneNum )}
                    defaultValue={phoneNum}
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
                <TouchableOpacity onPress= {() => navigation.navigate('resetPassword')}>
                    <Text style={styles.changePassword}>
                        هل ترغب بتغيير كلمة المرور؟
                    </Text>
                </TouchableOpacity>
                </View>
                
                
                    

            </View>
      );

//         //function to add TextInput dynamically
//   const addTextInput = (index) => {
//     let input = textInput
//     input.push(
//     <TextInput style={styless.TextInput}
//       onChangeText={(text) => this.addValues(text, index)} 
//       />);
//     setTextInput(input );
//   }

//   //function to remove TextInput dynamically
//   const removeTextInput = () => {
//     let input = textInput;
//     let inputdata = inputData;
//     input.pop();
//     inputdata.pop();
//     setTextInput(input)
//     setInputData(inputdata)
//   }

//   //function to add text from TextInputs into single array
//   const addValues = (text, index) => {
//     let dataArray = inputData;
//     let checkBool = false;
//     if (dataArray.length !== 0){
//       dataArray.forEach(element => {
//         if (element.index === index ){
//           element.text = text;
//           checkBool = true;
//         }
//       });
//     }
//     if (checkBool){
//     setInputData(dataArray)
//   }
//   else {
//     dataArray.push({'text':text,'index':index});
//     setInputData(dataArray)

//   }
//   }

//   //function to console the output
//  const getValues = () => {
//     console.log('Data',inputData);
//   }
      
const handleBranches = (location)=>{
  // let loc = branch;
  // loc.push(location);
  setBranch(location);

}
      const ThirdRoute = () =>{
        return (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >
            <View>
         
           

                    <Entypo name="location" color={colors.primaryBlue} size={40} style={styless.fieldLabels} style={{alignSelf:'center',marginTop:20}}/> 
                    
                    <View style={{alignSelf:'center',margin:10 , alignItems:'flex-end',flexDirection:'row-reverse' , padding:10}}>
                    {/* <Entypo name="plus" size={20} color={'black'}  /> */}
                    <Text  style={{fontSize:20}} > فرع </Text>
                    </View>
                    {/* </TouchableOpacity>
                    <View style={styless.fields}>  

                   
                      <TextInput
                        style={styless.TextInput}
                        placeholder=" مثال: فرع التحلية"
                        onChangeText={location => handleBranches(location) }
                        value={branch}
                        autoCapitalize="none"
                      />  */}
                      </View>
                         <Image
                  source={require("../images/mapsmockup.png")}
    
                    style={{
                      height: 400,
                      width: 300,
                      marginHorizontal:50

                    }}
                /> 
                      {/* {textInput.map((value) => {
                          return value
                              })} 
{/* <View>
        <View style= {styles.row}>
          
        {/* <View style={{margin: 10}}>
        <Button title='Remove' onPress={() => removeTextInput()} />
        </View> 
        </View>
        {textInput.map((value) => {
          return value
        })}
        <Button title='Get Values' onPress={() =>getValues()} />
      </View>
    */} 
               
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
       
         <View style={{flex:1,backgroundColor:'white' }}  > 
       

         <View style={{flexDirection:'row' ,marginTop:20, alignItems:'flex-start'}}>
             <TouchableOpacity>
         </TouchableOpacity>
         
         { !valid && (
          <View style={styles.header}>
            <Text style={styless.errors}>{errorMessage}</Text>
          </View>
        )}
       

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
      <TouchableOpacity style={styles.ButtonContainer} onPress={validateForm} >
                        <Text style={styles.appButtonText} >حفظ</Text>
                    </TouchableOpacity>
                    
      </View>
  
    );
    }
    


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
        
        fontSize: 25
      },
      image:{
        flex: 1,
        backgroundColor: colors.primaryBlue,
        padding: 20,
        margin: 10,
      }
  });
  


export default serviceProvider;



 
