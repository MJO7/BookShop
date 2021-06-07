import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import BookDonateScreen from "../screens/BookDonateScreen";
import BookRequestScreen from "../screens/BookRequestScreen";
import { AppStackNavigator } from "./AppStackNavigator";
export const AppTabNavigator = createBottomTabNavigator({
  AppStack: AppStackNavigator,
  BookRequest: BookRequestScreen,
});
