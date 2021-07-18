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
import NotificationScreen from "../screens/NotificationScreen";
import { Icon } from "react-native-elements";
import MyRecievedBooksScreen from "../screens/MyRecievedBooksScreen";
export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" />,
      },
    },
    MyDonations: {
      screen: MyDonationScreen,
      navigationOptions: {
        drawerIcon: <Icon name="gift" type="font-awesome" />,
        drawerLabel: "My Donations",
      },
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: <Icon name="settings" type="fontawesome5" />,
        drawerLabel: "Settings",
      },
    },

    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        drawerIcon: <Icon name="bell" type="font-awesome" />,
        drawerLabel: "Notifications",
      },
    },
    MyRecievedBooks: {
      screen: MyRecievedBooksScreen,
      navigationOptions: {
        drawerIcon: <Icon name="gift" type="font-awesome" />,
        drawerLabel: "My Recieved Books",
      },
    },
    RecieverDetailScreen: { screen: RecieverDetailScreen },
  },

  { contentComponent: CustomSidebarMenu },
  { initialRouteName: "Home" }
);
