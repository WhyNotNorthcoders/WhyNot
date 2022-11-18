import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  View,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { diff } from "react-native-reanimated";
import { auth, database } from "../config/firebaseConfig";

const BucketListCard = ({ item, data, itemID }) => {
  const [bucketItem, setBucketItem] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
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

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.item}
      >
        <Text style={styles.titles}>{item.title}: </Text>
        <Text style={styles.text}>Category: {item.category}</Text>
        <Text style={styles.text}>Location: {item.location}</Text>
        <Text style={styles.text}>Target Date: {item.targetDate}</Text>
        <Text style={styles.text}>Difficulty: {item.difficulty}</Text>
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
                  <>
                    <View style={styles.textData}>
                      <Text>Title: </Text>
                      <TextInput
                        onChangeText={(val) => {
                          setTitle(val);
                        }}
                      >
                        {item.title}
                      </TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Category: </Text>
                      <TextInput
                        onChangeText={(val) => {
                          setCategory(val);
                        }}
                      >
                        {item.category}
                      </TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Location: </Text>
                      <TextInput
                        onChangeText={(val) => {
                          setLocation(val);
                        }}
                      >
                        {item.location}
                      </TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Target Date: </Text>
                      <TextInput
                        onChangeText={(val) => {
                          setTargetDate(val);
                        }}
                      >
                        {item.targetDate}
                      </TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Difficulty: </Text>
                      <TextInput
                        onChangeText={(val) => {
                          setDifficulty(val);
                        }}
                      >
                        {item.difficulty}
                      </TextInput>
                    </View>
                    <Pressable onPress={onEditSubmit} style={styles.button}>
                      <Text>Submit Edit</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Text>Title: {item.title}</Text>
                    <Text>Category: {item.category}</Text>
                    <Text>Location: {item.location}</Text>
                    <Text>Target Date: {item.targetDate}</Text>
                    <Text>Difficulty: {item.difficulty}</Text>
                    <Pressable
                      onPress={() => {
                        setEdit(true);
                      }}
                      style={styles.button}
                    >
                      <Text>Edit</Text>
                    </Pressable>
                  </>
                )}
              </View>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  setEdit(false);
                  setModalVisible(!modalVisible);
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
    padding: 5,
    borderWidth: 2,
    borderColor: "black",
  },
});

export default BucketListCard;
