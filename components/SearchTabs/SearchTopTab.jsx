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
          borderBottomWidth: 1,
        },
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: "#A8A8A8",
          borderBottomWidth: 0.5,
          borderBottomColor: "black",
        },
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
