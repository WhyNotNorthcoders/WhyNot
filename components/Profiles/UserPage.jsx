import {
    FlatList,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import { useState, useEffect } from "react";
  import {
    collection,
    getDocs,
  } from "firebase/firestore";
  import { database, auth } from "../../config/firebaseConfig";
  import UserDetails from "./UserDetails";

const UserPage = ({route}) => {
    const [data, setData] = useState([]);
    const [storyData, setStoryData] = useState([]);

    const bucketRef = collection(
      database,
      "users",
      route.params.user.id,
      "Bucket_list"
    );

    const storyRef = collection(
      database,
      "users",
      route.params.user.id,
      "Story_list"
    );
  
    useEffect(() => {
      getDocs(bucketRef)
        .then((snapshot) => {
          let list = [];
          snapshot.docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id });
          });
          setData(list);
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
          setStoryData(storyList);
        })
        .catch((err) => {
          alert(err.message);
        });
    }, [route.params.user.id]);
  
    const Item = ({ item, onPress }) => (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={styles.titles}>{item.title}: </Text>
        <Text style={styles.text}>Category: {item.category}</Text>
        <Text style={styles.text}>Location: {item.location}</Text>
        <Text style={styles.text}>Target Date: {item.targetDate}</Text>
        <Text style={styles.text}>Difficulty: {item.difficulty}</Text>
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
        <ScrollView style={styles.container}>
          <UserDetails user={route.params.user}/>
          <Text style={styles.header}>Bucket List</Text>
          <FlatList
            nestedScrollEnabled={true}
            style={styles.list}
            renderItem={renderItem}
            data={data}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            horizontal={true}
          />
          <Text style={styles.header}>Recently Completed</Text>
          <FlatList
            nestedScrollEnabled={true}
            style={styles.list}
            data={storyData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
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

export default UserPage