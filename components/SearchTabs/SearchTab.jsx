import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchTop from "./SearchTop";
import SearchUser from "./SearchUsers";
import SearchEvent from "./SearchEvents";

const Tab = createMaterialTopTabNavigator();
function SearchTopTab({ searchPhrase }) {
  return (
    <Tab.Navigator
      initialRouteName="SearchTop"
      screenOptions={{
        tabBarIndicatorStyle: {
          borderWidth: 1,
          borderColor: "#CAD2C5",
          height: "100%",
          backgroundColor: "#6667AB",
        },
        tabBarActiveLabelStyle: {
          color: "black",
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: "white",
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
        },
      }}
    >
      <Tab.Screen
        name="SearchTop"
        children={() => <SearchTop searchPhrase={searchPhrase} />}
        options={{ tabBarLabel: "Top" }}
      />
      <Tab.Screen
        name="SearchUser"
        children={() => <SearchUser searchPhrase={searchPhrase} />}
        options={{ tabBarLabel: "User" }}
      />
      <Tab.Screen
        name="SearchEvent"
        children={() => <SearchEvent searchPhrase={searchPhrase} />}
        options={{ tabBarLabel: "Events" }}
      />
    </Tab.Navigator>
  );
}

export default SearchTopTab;
