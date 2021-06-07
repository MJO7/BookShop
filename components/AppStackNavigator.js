import * as React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import BookDonateScreen from "../screens/BookDonateScreen";
import RecieverDetailScreen from "../screens/RecieverDetailScreen";
export const AppStackNavigator = createAppContainer(
  {
    bookDonateList: { screen: BookDonateScreen },
    recieverDetails: { screen: RecieverDetailScreen },
  },
  { initialRouteName: "bookDonateList" }
);
