import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import MyHeader from "../components/MyHeader";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
export default class BookDonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedBookList: [],
    };
    this.requestRef = null;
  }
  getRequestedBookList = () => {
    this.requestRef = db
      .collection("requested_books")
      .onSnapshot((snapshot) => {
        var requestedBookList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          requestedBookList: requestedBookList,
        });
      });
  };
  componentDidMount() {
    this.getRequestedBookList();
  }
  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      // <ListItem
      //   key={i}
      //   title={item.book_name}
      //   Subtitle={item.book_description}
      //   titleStyle={{
      //     color: "black",
      //     fontWeight: "bold",
      //   }}
      //   leftElement={
      //     <Image
      //       style={{ height: 50, width: 50 }}
      //       source={{
      //         uri: item.image_link,
      //       }}
      //     />
      //   }
      //   rightElement={
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => {
      //         this.props.navigation.navigate("RecieverDetailScreen", {
      //           "details": item,
      //         });
      //       }}
      //     >
      //       <Text style={{ color: "blue" }}>View</Text>
      //     </TouchableOpacity>
      //   }
      //   bottomDivider
      // />

      // <ListItem
      //   key={i}
      //   title={item.book_name}
      //   subtitle={item.reason_to_request}
      //   titleStyle={{ color: "black", fontWeight: "bold" }}
      //   leftElement={
      //     <Image
      //       style={{ height: 50, width: 50 }}
      //       source={{
      //         uri: item.image_link,
      //       }}
      //     />
      //   }
      //   rightElement={
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => {
      //         this.props.navigation.navigate("RecieverDetails", {
      //           details: item,
      //         });
      //       }}
      //     >
      //       <Text style={{ color: "#ffff" }}>View</Text>
      //     </TouchableOpacity>
      //   }
      //   bottomDivider
      // />
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{fontWeight:'bold' , fontSize:20}}>{item.book_name}</ListItem.Title>
          <ListItem.Subtitle style={{
            marginLeft:120 ,
            fontSize:15,
            fontWeight:'bold'
            }}>{item.book_description}</ListItem.Subtitle>
             <ListItem.Subtitle style={{
            marginLeft:120 ,
            fontSize:15,
            fontWeight:'bold'
            }}>{item.bookPrice}</ListItem.Subtitle>
          <ListItem.Subtitle>
            <Image
              style={{ height: 100, width: 100, }}
              source={{
                uri: item.image_link,
              }}
            />
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("RecieverDetailScreen", {
              details: item,
            });
          }}
        >
          <Text>View</Text>
        </TouchableOpacity>
        <ListItem.Chevron
          onPress={() => {
            this.props.navigation.navigate("recieverDetailScreen");
          }}
        />
      </ListItem>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#15415B", height: 1000 }}>
        <MyHeader title="Donate Book" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.requestedBookList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontSize: 25,
                }}
              >
                List of all requested books
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedBookList}
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
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
