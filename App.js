import * as React from "react";
import { View } from "react-native";
import Tabbar from "./components/Tabbar";
import Header from "./components/Header";

export default function App() {
  return (
    <View>
      <Header />
      <Tabbar />
    </View>
  );
}
