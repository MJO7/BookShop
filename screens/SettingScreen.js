import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      firstName: "",
      lastName: "",
      Address: "",
      Contact: "",
      docId: "",
    };
  }
  updateDetails = () => {
    db.collection("users").doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      contact: this.state.contact,
      address: this.state.Address,
    });
    Alert.alert("Details Udpated Successfully");
  };
  getUserDetails = () => {
    var emailId = firebase.auth().currentUser.email;
    db.collection("users")
      .where("emailId", "==", emailId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            Address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });
  };
  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.title}>Settings</Text>

        <TextInput
          style={styles.inputBox2}
          placeholder="First Name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            this.setState({
              firstName: text,
            });
          }}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.inputBox2}
          placeholder="Last Name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            this.setState({
              lastName: text,
            });
          }}
          value={this.state.lastName}
        />
        <TextInput
          style={styles.inputBox2}
          placeholder="Contact"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            this.setState({
              contact: text,
            });
          }}
          value={this.state.contact}
        />
        <TextInput
          style={styles.inputBox2}
          placeholder="Address"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            this.setState({
              Address: text,
            });
          }}
          value={this.state.Address}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            this.updateDetals();
          }}
        >
          <Text
            style={{
              fontSize: 35,
              color: "black",
            }}
            i
          >
            Submit
          </Text>
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
  title: {
    color: "#EA595D",
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 50,
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
  submitButton: {
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
