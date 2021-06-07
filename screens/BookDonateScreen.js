import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import MyHeader from "../components/MyHeader";
import { ListItem } from "react-native-elements";
import db from "../config";
export default class BookDonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedBookList: [],
    };
  }
  getRequestedBookList = () => {
    db.collection("requested_books").onSnapshot((snapshot) => {
      var requestedBookList = snapshot.docs.map((document) => document.data());
      this.setState({
        requestedBookList: requestedBookList,
      });
    });
  };
  componentDidMount() {
    this.getRequestedBookList();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.book_name}</ListItem.Title>
          <ListItem.Subtitle>{item.book_description}</ListItem.Subtitle>
        </ListItem.Content>
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
        <MyHeader title="Donate Book" />
        <View style={{ flex: 1 }}>
          {this.state.requestedBookList.length === 0 ? (
            <View style={{ flex: 1 }}>
              <Text>No Requested Books</Text>
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
});
