import { FlatList, StyleSheet, Text, SafeAreaView } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, database } from "../../config/firebaseConfig";
import HomeSuggested from "./HomeComponents/HomeSuggested";
import HomeStories from "./HomeComponents/HomeStories";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  const [Suggested, setSuggested] = useState([]);
  const [StoryData, setStoryData] = useState([]);

  const bucketRef = collection(database, "HomeSuggested");

  const storyRef = collection(
    database,
    "users",
    auth.currentUser.uid,
    "Story_list"
  );

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
    getDocs(storyRef)
      .then((snapshot) => {
        let storyList = [];
        snapshot.docs.forEach((doc) => {
          storyList.push({ ...doc.data(), id: doc.id });
        });
        const sortedStory = storyList.sort(
          (a, b) => (b.completeDate.split(" ").join("")) - (a.completeDate.split(" ").join(""))
        );
        setStoryData(sortedStory);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Stories</Text>
        <FlatList
          data={StoryData}
          horizontal={true}
          renderItem={({ item }) => <HomeStories item={item} />}
        />
        <Text style={styles.header}>Suggested</Text>
        <FlatList
          data={Suggested}
          horizontal={true}
          renderItem={({ item }) => <HomeSuggested item={item} />}
        />
      </ScrollView>
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
