import { FlatList, StyleSheet, Text, SafeAreaView } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { database } from "../../config/firebaseConfig";
import HomeSuggested from "./HomeComponents/HomeSuggested";
import HomeStories from "./HomeComponents/HomeStories";

const Home = () => {
  const [Suggested, setSuggested] = useState([]);

  const bucketRef = collection(database, "HomeSuggested");

  useEffect(() => {
    getDocs(bucketRef)
      .then((results) => {
        let list = [];
        results.docs.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setSuggested(list);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Stories</Text>
        <FlatList
          data={DATA}
          horizontal={true}
          renderItem={({ item }) => <HomeStories item={item} />}
        />
        <Text style={styles.header}>Suggested</Text>
        <FlatList
          data={Suggested}
          horizontal={true}
          renderItem={({ item }) => <HomeSuggested item={item} />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },

  header: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 5,
    color: "#6667AB",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

export default Home;
