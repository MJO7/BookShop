import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import firebase from 'firebase'
import { Header } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from '../config'
export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
    userId:firebase.auth().currentUser.email,
      description: "",
    };
  }
  createUniqueId(){
return Math.random().toString(36).substring(7)
  }
  addRequest=(bookName , description)=>{
var userId=this.state.userId
var randomRequestId=this.createUniqueId()
db.collection('requested_books').add({
  user_id:userId , 
  book_name:bookName,
  book_description:description,
  request_id:randomRequestId,
})
this.setState({
  bookName:'',
  description:'',
})
Alert.alert("Book Requested Successfully")
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <MyHeader title="Request Book" />
        <TextInput
          style={styles.inputBox2}
          placeholder="Book Name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            this.setState({ bookName: text });
          }}
        />
        <TextInput
          style={[styles.inputBox2, { height: "40%" }]}
          placeholder="Reason to request"
          multiline
          placeholderTextColor="grey"
          onChangeText={(text) => {
            this.setState({ description: text });
          }}
        />
        <TouchableOpacity style={styles.loginButton}
        onPress={()=>{
          this.addRequest(this.state.bookName , this.state.description)
        }}
        >
          <Text style={{ fontSize: 35, color: "black" }}>REQUEST</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "#15415B",
    height: 1000,
  },
  inputBox2: {
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#475980",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: "#475980",
    fontSize: 22,
    color: "white",
  },
  loginButton: {
    borderWidth: 1,
    alignSelf: "center",
    marginTop: 45,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    width: 360,
    borderRadius: 15,
    borderColor: "#EA595D",
    backgroundColor: "#EA595D",
  },
});
