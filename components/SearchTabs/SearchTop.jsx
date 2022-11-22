import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../config/firebaseConfig";
import TopStoriesCard from "./TopStoriesCard";

const SearchTop = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const users = collection(database, "users");
    let storyList = [];
    getDocs(users).then((users) => {
      users.forEach((user) => {
        const stories = collection(database, "users", user.id, "Story_list");
        getDocs(stories).then((stories) => {
          stories.forEach((story) => {
            storyList.push({ ...story.data(), id: story.id });
          });
          const sorted = storyList.sort((a, b) => b.rating - a.rating)
          setStories(sorted);
        });
      });
    });
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={stories}
        renderItem={({ item }) => (
          <TopStoriesCard
            story_id={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            location={item.location}
            rating={item.rating}
            completeDate={item.completeDate}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
  },
  item: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#6667AB",
    height: 200,
    fontSize: 20,
    margin: 15,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
});

export default SearchTop;
