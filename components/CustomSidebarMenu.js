import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import db from "../config";
import * as Permissions from "expo-permissions";
export default class CustomSidebarMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      image: "#",
      name: "",
      docId: "",
    };
  }
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.setState({
        image: uri,
      });
      this.uploadImage(uri, this.state.userId);
    }
  };
  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles" + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };
  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles" + imageName);
    storageRef.getDownloadURL().then((uri) => {
      this.setState({ image: uri }).catch((error) => {
        this.setState({ image: "#" });
      });
    });
  };
  componentDidMount() {
    this.fetchImage(this.state.userId);
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <View style={{ flex: 0.5, alignItems: "center" }}>
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            size="large"
            onPress={() => {
              this.selectPicture();
            }}
            showEditButton
          />
        </View>
        <View style={{ flex: 0.8, marginTop: -235 }}>
          <DrawerItems {...this.props} />
        </View>
        <TouchableOpacity
          style={{ marginBottom: 300 }}
          onPress={() => {
            this.props.navigation.navigate("WelcomeScreen");
            firebase.auth().signOut();
          }}
        >
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
