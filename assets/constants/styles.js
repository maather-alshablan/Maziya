import { Dimensions } from "react-native";
import colors from "../constants/colors";

const styles = {
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  fieldLabels: {
    marginRight: 10,
    marginTop: 13,
    marginLeft: 18,
  },

  fields: {
    flexDirection: "row-reverse",
    margin: 15,
    paddingRight: 50,
    alignItems: "center",
  },
  TextInput: {
    flexDirection: "row-reverse",
    height: 30,
    width: Dimensions.get("window").width * 0.5,
    borderColor: colors.primaryGrey,
    borderWidth: 1,
    borderLeftColor: "white",
    borderRightColor: "white",
    borderTopColor: "white",
    textAlign: "right",
  },
  Header: {
    flexDirection: "row-reverse",
    alignItems: "stretch",
  },
  HeaderText: {
    marginHorizontal: 15,
    color: colors.primaryBlue,
    fontSize: 25,
  },
  SignUpText: {
    marginTop: 20,
    marginHorizontal: 15,
    color: colors.primaryBlue,
    fontSize: 15,
  },
  forgotPassword: {
    fontFamily: "Bodoni 72 Smallcaps",
    fontSize: 15,
    color: "rgba(121, 121, 121, 255)",
  },
  forgotPasswordView: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  header: {
    fontFamily: "Bradley Hand",
    fontWeight: "bold",
    fontSize: 35,
    alignSelf: "center",
    color: colors.primaryBlue,
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: "rgba(247, 247, 247, 255)",
    backgroundColor: "rgba(1, 132, 189, 255)",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    color: colors.primaryGrey,
    borderRadius: 22.5,
    borderWidth: 0.1,
    borderColor: colors.primaryGrey,
    backgroundColor: colors.primaryBlue,
  },
  image: { width: 200, height: 200, backgroundColor: 'white' }, 

  errors: {
    color: "red",
  },
};

export default styles;
