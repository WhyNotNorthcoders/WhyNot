import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import ProfileDetails from "./ProfileDetails";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Profile = () => {
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#CAD2C5" : "#84A98C";
    const color = item.id === selectedId ? "white" : "white";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ProfileDetails />
        <Text style={styles.titles}>Bucket List</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <Text style={styles.titles}>Recently Completed</Text>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354F52",
  },
  list: {
    backgroundColor: "#52796F",
    height: "100%",
    margin: 10,
    borderRadius: 15,
  },
  text: {
    color: "#CAD2C5",
    fontSize: 42,
  },
  titles: {
    color: "#CAD2C5",
    padding: 10,
    fontSize: 25,
    textAlign: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: "solid",
    borderColor: "#CAD2C5",
    borderWidth: 2,
    borderRadius: 15,
  },
});

export default Profile;
