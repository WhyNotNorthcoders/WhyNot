import { useNavigation } from "@react-navigation/native";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth, database } from "../config/firebaseConfig";
import Profile from "../screens/Profile";
import StoryForm from "./Forms/StoryForm";

const BucketListCard = ({ item, itemID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [complete, setComplete] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [location, setLocation] = useState(item.location);
  const [targetDate, setTargetDate] = useState(item.targetDate);
  const [difficulty, setDifficulty] = useState(item.difficulty);

  const bucketRef = collection(
    database,
    "users",
    auth.currentUser.uid,
    "Bucket_list"
  );

  const onEditSubmit = () => {
    const data = {
      title: title,
      category: category,
      location: location,
      targetDate: targetDate,
      difficulty: difficulty,
    };
    setEdit(false);
    setModalVisible(false);
    const itemRef = doc(bucketRef, itemID);
    updateDoc(itemRef, data)
      .then(alert("item has been updated"))
      .catch((err) => alert(err.message));
  };

  const BucketItem = ({ title, location, category, setComplete }) => {
    const navigation = useNavigation();

    return (
      <>
        <Text>Title: {title}</Text>
        <Text>Category: {category}</Text>
        <Text>Location: {location}</Text>
        <Text>Target Date: {targetDate}</Text>
        <Text>Difficulty: {difficulty}</Text>
        <Pressable
          onPress={() => {
            setComplete(false);
            setEdit(true);
          }}
          style={styles.button}
        >
          <Text>Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalVisible(false);
            setEdit(false);
            navigation.navigate("Add to Story", {
              setComplete: setComplete,
              title: title,
              category: category,
              location: location,
              bucketItemId: itemID,
            });
          }}
          style={styles.button}
        >
          <Text>Complete</Text>
        </Pressable>
      </>
    );
  };

  const EditModal = () => {
    return (
      <>
        <View style={styles.textData}>
          <Text>Title: </Text>
          <TextInput
            value={title}
            onChangeText={(val) => {
              setTitleInput(val);
            }}
            onEndEditing={setTitle(titleInput)}
          ></TextInput>
        </View>
        <View style={styles.textData}>
          <Text>Category: </Text>
          <TextInput
            value={category}
            onChangeText={(val) => {
              setCategoryInput(val);
            }}
            onEndEditing={setCategory(categoryInput)}
          ></TextInput>
        </View>
        <View style={styles.textData}>
          <Text>Location: </Text>
          <TextInput
            value={location}
            onChangeText={(val) => {
              setLocationInput(val);
            }}
            onEndEditing={setLocation(locationInput)}
          ></TextInput>
        </View>
        <View style={styles.textData}>
          <Text>Target Date: </Text>
          <TextInput
            value={targetDate}
            onChangeText={(val) => {
              setTargetDateInput(val);
            }}
            onEndEditing={setTargetDate(targetDateInput)}
          ></TextInput>
        </View>
        <View style={styles.textData}>
          <Text>Difficulty: </Text>
          <TextInput
            value={difficulty}
            onChangeText={(val) => {
              setDifficultyInput(val);
            }}
            onEndEditing={setDifficulty(difficultyInput)}
          ></TextInput>
        </View>
        <Pressable onPress={onEditSubmit} style={styles.button}>
          <Text>Submit Edit</Text>
        </Pressable>
      </>
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.item}
      >
        <Text style={styles.titles}>{title}: </Text>
        <Text style={styles.text}>Category: {category}</Text>
        <Text style={styles.text}>Location: {location}</Text>
        <Text style={styles.text}>Target Date: {targetDate}</Text>
        <Text style={styles.text}>Difficulty: {difficulty}</Text>
      </TouchableOpacity>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                {edit ? (
                  <EditModal />
                ) : (
                  <BucketItem
                    title={title}
                    location={location}
                    category={category}
                    setComplete={setComplete}
                  />
                )}
              </View>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  setEdit(false);
                  setModalVisible(false);
                  setComplete(false);
                }}
              >
                <Text style={{ color: "white" }}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#faf9f6",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#6667AB",
    elevation: 2,
  },
  buttonClose: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
    backgroundColor: "#6667AB",
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
    borderRadius: 10,
  },
  textData: {
    width: 250,
    margin: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: "black",
  },
});

export default BucketListCard;
