import {Dimensions} from 'react-native';
import colors from '../constants/colors'

const styles ={
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },

    fieldLabels:{
            marginRight:10,
            marginTop:13,
            marginLeft:18,
        
    },

    fields:{
    flexDirection:'row-reverse',
    margin:15 ,
    paddingRight:50,
    alignItems:'center'
    
    },
    TextInput:{
        
        flexDirection:'row-reverse',
        height: 30,
        width: Dimensions.get('window').width *0.5,
        borderColor: colors.primaryGrey,
        borderWidth: 1,
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white',
        textAlign: 'right'
    },
    Header:{
        flexDirection: 'row-reverse',
        alignItems: 'stretch',
    },
    HeaderText:{
        marginHorizontal: 15,
        color: colors.primaryBlue,
        fontSize: 25,
        
    },
    SignUpText:{
        marginTop:20 ,
        marginHorizontal: 15,
        color: colors.primaryBlue,
        fontSize: 15
    },
    forgotPassword:{
        "fontFamily": "Bodoni 72 Smallcaps",
        "fontSize": 15,
        "color": "rgba(121, 121, 121, 255)",
      },
      forgotPasswordView:{
        marginTop: 10,
        "alignItems": "flex-start"
      }
  
    
  };

  export default styles;
