import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allDonations: [],
    };
    this.requestRef = null;
  }
  getAllDonations = () => {
    this.requestRef = db
      .collection("all_donations")
      .where("donor_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allDonations = snapshot.docs.map((document) => document.data());
        this.setState({
          allDonations: allDonations,
        });
      });
  };
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.book.name}
      subtitle={
        "Requested By:" + item.requested_by + "\nstatus:" + item.request_status
      }
      leftElement={<Icon name="book" type="font-awesome" color="white" />}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Send Book</Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );
  componentDidMount() {
    this.getAllDonations();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} title="My Donations" />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List Of All Book Donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    shadowColor: "lightblue",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
