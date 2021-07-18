import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";
import db from "../config";
import firebase from "firebase";
export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      isModalVisible: false,
      contact: "",
      confirmPassword: "",
    };
  }
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("BookDonateList");
      })
      .catch((error) => {
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };
  signUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("Password Does Not Match. Please Try Again.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            address: this.state.address,
            emailId: this.state.emailId,
            isBookRequestActive:false,
          });
          return Alert.alert("User Added Successfully", "Welcome to the App", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="First Name"
            placeholderTextColor="grey"
            onChangeText={(text) => {
              this.setState({ firstName: text });
            }}
          />
          <TextInput
            style={styles.inputBox2}
            placeholder="Last Name"
            placeholderTextColor="grey"
            onChangeText={(text) => {
              this.setState({ lastName: text });
            }}
          />

          <TextInput
            style={styles.inputBox2}
            placeholder="Contact"
            maxLength={10}
            placeholderTextColor="grey"
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
          />
          <TextInput
            style={styles.inputBox2}
            placeholder="Address"
            multiline={true}
            placeholderTextColor="grey"
            onChangeText={(text) => {
              this.setState({ address: text });
            }}
          />
          <TextInput
            style={styles.inputBox2}
            placeholder="Email ID"
            placeholderTextColor="grey"
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />
          <TextInput
            style={styles.inputBox2}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TextInput
            style={styles.inputBox2}
            placeholder="Confirm Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ confirmPassword: text });
            }}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.signUp(
                this.state.emailId,
                this.state.password,
                this.state.confirmPassword
              );
            }}
          >
            <Text style={{ fontSize: 35, color: "black" }}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.text}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.viewStyle}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.showModal()}
        </View>
        <Text style={styles.title}>Book Shop</Text>
        {/* <Image
          source={require("../assets/bookLogo.png")}
          style={styles.imageStyle2}
        /> */}
        <Image
          source={require("../assets/reactnativeIMG.png")}
          style={styles.imageStyle}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Email ID"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
        />
        <TextInput
          style={styles.inputBox2}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        <TouchableOpacity style={styles.text}>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.userLogin(this.state.emailId, this.state.password);
          }}
        >
          <Text style={{ fontSize: 35, color: "black" }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            this.setState({ isModalVisible: true });
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
            }}
          >
            Sign Up
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
  inputBox: {
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#475980",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    borderRadius: 15,
    marginTop: 40,
    backgroundColor: "#475980",
    fontSize: 22,
    color: "white",
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
  text: {
    marginLeft: 10,
    marginTop: 45,

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#EA595D",
    marginLeft: 90,
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 50,
  },
  imageStyle: {
    marginLeft: 170,
    marginTop: 50,
    height: 90,
    width: 90,
  },
  imageStyle2: {
    marginLeft: 320,
    marginTop: -70,

    height: 70,
    width: 70,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
    backgroundColor: "#15415B",
  },
});
