import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
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
          const sortedRating = storyList.sort((a, b) => b.rating - a.rating);
          const sortedRecent = sortedRating.sort((a, b) => b.completeDate.split(" ").join("") - a.completeDate.split(" ").join(""))
          setStories(sortedRecent);
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
            storyImage={item.storyImage}
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
