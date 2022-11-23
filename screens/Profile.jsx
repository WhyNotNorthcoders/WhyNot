import { FlatList, StyleSheet, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import ProfileDetails from "../components/Profiles/ProfileDetails";
import { collection, getDocs } from "firebase/firestore";
import { database, auth } from "../config/firebaseConfig";
import BucketListCard from "../components/BucketListCard";
import StoryCard from "../components/StoryCard";

const Profile = () => {
  const [bucketListData, setBucketListData] = useState([]);
  const [bucketItemAdded, setBucketItemAdded] = useState(false)
  const [storyData, setStoryData] = useState([]);

  const bucketRef = collection(
    database,
    "users",
    auth.currentUser.uid,
    "Bucket_list"
  );

  const storyRef = collection(
    database,
    "users",
    auth.currentUser.uid,
    "Story_list"
  );

  useEffect(() => {
    setBucketItemAdded(false)
    getDocs(bucketRef)
      .then((snapshot) => {
        let bucketList = [];
        snapshot.docs.forEach((doc) => {
          bucketList.push({ ...doc.data(), id: doc.id });
        });
        setBucketListData(bucketList);
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
  }, [bucketItemAdded]);

  return (
    <>
      <ScrollView style={styles.container}>
        <ProfileDetails />
        <Text style={styles.header}>Bucket List</Text>
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          data={bucketListData}
          renderItem={({ item }) => (
            <BucketListCard item={item} itemID={item.id} setBucketItemAdded={setBucketItemAdded}/>
          )}
          horizontal={true}
        />
        <Text style={styles.header}>Recently Completed</Text>
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          data={storyData}
          renderItem={({ item }) => <StoryCard item={item} itemID={item.id} />}
          horizontal={true}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  list: {
    backgroundColor: "white",
    borderColor: "#6667AB",
    borderWidth: 2,
    borderStyle: "solid",
    padding: 2,
    height: 200,
    margin: 10,
    borderRadius: 15,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },

  header: {
    alignSelf: "center",
    fontSize: 20,
    color: "#6667AB",
  },
  titles: {
    color: "white",
    padding: 10,
    fontSize: 25,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  item: {
    backgroundColor: "#6667AB",
    height: 180,
    width: 200,
    padding: 10,
    margin: 5,
    borderRadius: 15,
  },
});

export default Profile;
