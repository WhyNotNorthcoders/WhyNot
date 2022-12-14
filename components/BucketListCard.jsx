import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
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

const BucketListCard = ({ item, itemID, setIsDeleted, setStoryAdded }) => {
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
    setBucketItemAdded(true);
    const itemRef = doc(bucketRef, itemID);
    updateDoc(itemRef, data)
      .then(alert("item has been updated"))
      .catch((err) => alert(err.message));
  };

  const BucketItem = ({ title, location, category, setComplete }) => {
    const navigation = useNavigation();

    const handleDelete = () => {
      const itemRef = doc(bucketRef, itemID);
      deleteDoc(itemRef).then(
        alert("item has been deleted"),
        setIsDeleted(true)
      );
    };
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <Text style={styles.modaltitle}>{title}</Text>
        <Text style={styles.textData}>Category: {category}</Text>
        <Text style={styles.textData}>Location: {location}</Text>
        <Text style={styles.textData}>Target Date: {targetDate}</Text>
        <Text style={styles.textData}>Difficulty: {difficulty}</Text>
        <View style={{ flexDirection: "row", bottom: 0, position: "absolute" }}>
          <Pressable
            onPress={() => {
              setComplete(false);
              setEdit(true);
            }}
            style={styles.editButton}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Edit
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setModalVisible(false);
              setEdit(false);
              navigation.navigate("Add to Story", {
                title: title,
                category: category,
                location: location,
                bucketItemId: itemID,
                setStoryAdded: setStoryAdded,
              });
            }}
            style={styles.completeButton}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Complete
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleDelete();
            }}
            style={styles.deleteButton}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
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
        <Text style={styles.titles}>{title}</Text>
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
                  <>
                    <View style={styles.editData}>
                      <Text style={styles.editTitle}>Title: </Text>
                      <TextInput
                        defaultValue={title}
                        onChangeText={(val) => {
                          setTitle(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.editData}>
                      <Text style={styles.editTitle}>Category: </Text>
                      <TextInput
                        onChangeText={(val) => {
                          setCategory(val);
                        }}
                        editable={true}
                        defaultValue={category}
                      ></TextInput>
                    </View>
                    <View style={styles.editData}>
                      <Text style={styles.editTitle}>Location: </Text>
                      <TextInput
                        defaultValue={location}
                        onChangeText={(val) => {
                          setLocation(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.editData}>
                      <Text style={styles.editTitle}>Target Date: </Text>
                      <TextInput
                        defaultValue={targetDate}
                        onChangeText={(val) => {
                          setTargetDate(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.editData}>
                      <Text style={styles.editTitle}>Difficulty: </Text>
                      <TextInput
                        editable={true}
                        defaultValue={difficulty}
                        onChangeText={(val) => {
                          setDifficulty(val);
                        }}
                      ></TextInput>
                    </View>
                    <Pressable
                      onPress={onEditSubmit}
                      style={styles.editcompleteButton}
                    >
                      <Text>Submit Edit</Text>
                    </Pressable>
                  </>
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
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                >
                  X
                </Text>
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
    borderWidth: 2,
    marginTop: "44%",
    borderColor: "#6667AB",
    margin: 20,
    width: "95%",
    height: "55%",
    backgroundColor: "#6667AB",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editButton: {
    padding: 10,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 15,
    margin: 5,
    height: 40,
    width: 100,
  },
  completeButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "green",
    alignSelf: "center",
    borderRadius: 15,
    height: 40,
    width: 100,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "black",
    alignSelf: "center",
    borderRadius: 15,
    height: 40,
    width: 100,
  },
  buttonClose: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 15,
    width: 50,
    alignSelf: "center",
    padding: 10,
    margin: 5,
  },
  item: {
    overflow: "hidden",
    padding: 5,
    width: 250,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#6667AB",
    fontSize: 20,
    margin: 10,
    shadowRadius: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  titles: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 16,
    marginTop: 4,
  },
  modaltitle: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  textData: {
    color: "white",
    fontSize: 20,
    width: 250,
    margin: 5,
    padding: 5,
  },
  editData: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    marginTop: 5,
    marginBottom: 20,
  },
  editTitle: {
    marginTop: -20,
    marginBottom: 15,
    color: "white",
  },
  editcompleteButton: {
    padding: 10,
    backgroundColor: "green",
    alignSelf: "center",
    marginTop: 0,
    borderRadius: 15,
    height: 40,
    width: 100,
  },
});

export default BucketListCard;
