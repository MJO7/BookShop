import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
const MyHeader = (props) => {
  return (
    <Header
      centerComponent={{
        text: props.title,
        style: {
          color: "#EA595D",

          fontSize: 30,
          fontWeight: "bold",
        },
      }}
      backgroundColor="#15415B"
    />
  );
};

export default MyHeader;
