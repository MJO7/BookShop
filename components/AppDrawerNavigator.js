import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { DrawerItems } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSidebarMenu from "./CustomSidebarMenu";
import { createDrawerNavigator } from "react-navigation-drawer";
import SettingScreen from "../screens/SettingScreen";
export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppTabNavigator },
    Settings: { screen: SettingScreen },
  },

  { contentComponent: CustomSidebarMenu },
  { initialRouteName: "Home" }
);
