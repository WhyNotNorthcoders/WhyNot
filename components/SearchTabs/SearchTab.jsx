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
      initialRouteName="SearchTop"
      screenOptions={{
        tabBarIndicatorStyle: {
          borderWidth: 1,
          borderColor: "black",
          height: "100%",
          backgroundColor: "#9f86c0",
        },
        tabBarActiveLabelStyle: {
          color: "black",
          fontSize: 14,
        },
        tabBarStyle: {
          borderWidth:1,
          backgroundColor: "#6667AB",
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="SearchTop"
        component={SearchTop}
        options={{ tabBarLabel: "Top" }}
      />
      <Tab.Screen
        name="SearchUser"
        component={SearchUser}
        options={{ tabBarLabel: "User" }}
      />
      <Tab.Screen
        name="SearchEvent"
        component={SearchEvent}
        options={{ tabBarLabel: "Events" }}
      />
    </Tab.Navigator>
  );
}

export default SearchTopTab;
