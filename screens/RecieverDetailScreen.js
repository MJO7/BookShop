import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default class RecieverDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",
      recieverId: this.props.navigation.getParam("details")["user_id"],
      requestId: this.props.navigation.getParam("details")["request_id"],
      bookName: this.props.navigation.getParam("details")["book_name"],
      bookImage: "#",
      description:
        this.props.navigation.getParam("details")["book_description"],
      bookPrice:this.props.navigation.getParam("details")["bookPrice"],
      currencyCode:this.props.navigation.getParam("details")["currencyCode"],
      recieverName: "",
      recieverContact: "",
      reciverAddress: "",
      recieverRequestDocId: "",
      convertedCurrency:"",
    };
  }
  getRecieverDetails() {
    db.collection("users")
      .where("emailId", "==", this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().first_name,
            recieverContact: doc.data().contact,
            reciverAddress: doc.data().address,
          });
        });
      });
    db.collection("requested_books")
      .where("request_id", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverRequestDocId: doc.id,
            bookImage: doc.data().image_link,
          });
        });
      });
  }
  getUserDetails = (userId) => {
    db.collection("users")
      .where("email_id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };

  updateBookStatus = () => {
    db.collection("all_donations").add({
      book_name: this.state.bookName,
      request_id: this.state.requestId,
      requested_by: this.state.recieverName,
      donor_id: this.state.user_id,
      request_status: "Donor Interested.",
    });
  };
  addNotification = () => {
    var message =
      this.state.userName + " has shown interest in donating the book";
    db.collection("all_notifications").add({
      targeted_user_id: this.state.recieverId,
      donor_id: this.state.userId,
      request_id: this.state.requestId,
      book_name: this.state.bookName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: "unread",
      message: message,
    });
  };

  componentDidMount() {
    this.getRecieverDetails();
    this.getUserDetails(this.state.userId);
  }
  getData(){
  //  var bookPrice = this.state.bookPrice
  //  var value = this.state.bookPrice/74.38
   this.setState({
     convertedCurrency:this.state.bookPrice/75
   })
  }

  // getData(){
  //   fetch("http://data.fixer.io/api/latest?access_key=174dfb28f712d766970ba3c989fedd8e")
  //   .then(respone=>{
  //     return Response.json();
  //   }).then(responseData=>{
  //     var currencyCode = this.state.currencyCode
  //     var currency= responseData.rates.INR
  //     var value = 75/currency
  //     console.log(value)
  //   })
  // }
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="blue"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            }
            centerComponent={{
              text: "Donate Books",
              style: {
                color: "red",
                fontSize: RFValue(20),
                fontWeight: "bold",
              },
            }}
            backgroundColor="white"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              paddingTop: RFValue(30),
              paddingLeft: RFValue(10),
            }}
          >
            <View style={{ flex: 0.4 }}>
              <Image
                source={{ uri: this.state.bookImage }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            </View>
            <View
              style={{
                flex: 0.6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: RFValue(28),
                  marginLeft:-10,
                  textAlign: "center",
                }}
              >
                {this.state.bookName}
              </Text>
             
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(15),
                  textAlign: "center",
                  marginLeft:-60,
                  marginTop: RFValue(15),
                }}
              >
                {this.state.description}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(15),
                  textAlign: "center",
                  marginLeft:-60,
                  marginTop: RFValue(15),
                }}
              >
                {this.state.bookPrice} {this.state.currencyCode} =  {this.state.convertedCurrency} $
              </Text>
              {/* <Text
                style={{
                  
                  fontSize: 25,
                  marginLeft:-10,
                  textAlign: "center",
                }}
              >
                {this.state.convertedCurrency} $
              </Text> */}
            
            </View>
          </View>
          <View style={{ flex: 0.7, padding: RFValue(20) }}>
            <View
              style={{
                flex: 0.7,
                alignItems: "center",
                justifyContent: "center",
                marginTop: RFValue(50),
                borderWidth: 1,
                backgroundColor: "#15415B",
                padding: RFValue(10),
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: RFValue(30) , color:'#EA595D'}}>
                Reciever Information
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                  color:'#EA595D'
                }}
              >
                Name:{this.state.recieverName}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                  color:'#EA595D'
                }}
              >
                Contact:{this.state.recieverContact}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                  color:'#EA595D'
                }}
              >
                Address:{this.state.reciverAddress}
              </Text>
            </View>

            <View
              style={{
                flex: 0.3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
               <TouchableOpacity style={styles.inputBox2}>
               <Text style={{ 
                  fontSize: RFValue(17),
                
                  color:'#EA595D'}}
                  onPress={() => {
               this.getData()
                  }}
                  >Change currency to your rate</Text>
             </TouchableOpacity>
              {this.state.recieverId !== this.state.userId ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateBookStatus();
                    this.addNotification();
                    this.props.navigation.navigate("MyDonations");
                  }}
                >
                  <Text>I Want to Donate</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "70%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(60),
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
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
    backgroundColor: "#15415B",
    fontSize: 22,
    color: "white",
  },
});
