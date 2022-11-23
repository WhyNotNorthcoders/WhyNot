import * as React from "react";
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
        options={{ tabBarLabel: "Top" }}
      >
        {props => <SearchTop {...props} searchPhrase={searchPhrase} />}
      </Tab.Screen>
      <Tab.Screen
        name="SearchUser"
        options={{ tabBarLabel: "User" }}
      >
        {props => <SearchUser {...props} searchPhrase={searchPhrase} />}
      </Tab.Screen>
      <Tab.Screen
        name="SearchEvent"
        options={{ tabBarLabel: "Events" }}
      >
        {props => <SearchEvent {...props} searchPhrase={searchPhrase} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default SearchTopTab;
