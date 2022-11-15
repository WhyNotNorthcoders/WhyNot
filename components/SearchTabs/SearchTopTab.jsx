import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchTop from "./SearchTop";
import SearchUser from "./SearchUsers";
import SearchEvent from "./SearchEvents";

const Tab = createMaterialTopTabNavigator();
function SearchTopTab() {
  return (
    <Tab.Navigator
      initialRouteName="Route1"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#4169e1",
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: "#A8A8A8",
          borderBottomWidth: 0.5,
          borderBottomColor: "black",
          tabBarInactiveTintColor: "blue",
          tabBarPressColor: "pink",
        },
      }}
    >
      <Tab.Screen
        name="SearchTop"
        component={SearchTop}
        options={{ tabBarLabel: "Top", tabBarPressColor: "pink" }}
      />
      <Tab.Screen
        name="SearchUser"
        component={SearchUser}
        options={{ tabBarLabel: "User", tabBarPressColor: "pink" }}
      />
      <Tab.Screen
        name="SearchEvent"
        component={SearchEvent}
        options={{ tabBarLabel: "Events", tabBarPressColor: "pink" }}
      />
    </Tab.Navigator>
  );
}

export default SearchTopTab;
