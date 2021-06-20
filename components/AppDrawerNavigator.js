import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { DrawerItems } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSidebarMenu from "./CustomSidebarMenu";
import { createDrawerNavigator } from "react-navigation-drawer";
import SettingScreen from "../screens/SettingScreen";
import MyDonationScreen from "../screens/MyDonationScreen";
import RecieverDetailScreen from "../screens/RecieverDetailScreen";
export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppTabNavigator },
    MyDonations: { screen: MyDonationScreen },
    Settings: { screen: SettingScreen },
    RecieverDetailScreen: { screen: RecieverDetailScreen },
  },

  { contentComponent: CustomSidebarMenu },
  { initialRouteName: "Home" }
);
