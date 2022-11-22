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
import { Title } from "react-native-paper";
import { TextInput } from "react-native-gesture-handler";
import { Rating } from "react-native-ratings";
import { auth, database } from "../config/firebaseConfig";

const StoryCard = ({ item, itemID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [location, setLocation] = useState(item.location);
  const [description, setDescription] = useState(item.description);
  const [completeDate, setCompleteDate] = useState(item.completeDate);
  const [rating, setRating] = useState(item.rating);

  const storyRef = collection(
    database,
    "users",
    auth.currentUser.uid,
    "Story_list"
  );

  const onEditSubmit = () => {
    const data = {
      title: title,
      category: category,
      description: description,
      location: location,
      completeDate: completeDate,
      rating: rating,
    };
    setEdit(false);
    setModalVisible(false);
    const itemRef = doc(storyRef, itemID);
    updateDoc(itemRef, data)
      .then(alert("story has been updated"))
      .catch((err) => alert(err.message));
  };

  const StoryItem = () => {
    return (
      <>
        <Text style={styles.title}>Completed</Text>
        <Text style={styles.modaltitle}>{title}</Text>
        <Text style={styles.textData}>Category: {category}</Text>
        <Text style={styles.textData}>Location: {location}</Text>
        <Text style={styles.textData}>Description: {description}</Text>
        <Text style={styles.textData}>Complete Date: {completeDate}</Text>
        <View>
          <Text style={styles.textData}>Rating:</Text>
          <Rating
            style={styles.rating}
            type={"custom"}
            ratingColor={"#FFF36D"}
            tintColor={"#6667AB"}
            ratingBackgroundColor={"#CAD2C5"}
            minValue={0}
            startingValue={rating}
            readonly={true}
          />
        </View>
        <Pressable
          onPress={() => {
            setEdit(true);
          }}
          style={styles.editButton}
        >
          <Text
            style={{
              color: "#6667AB",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Edit
          </Text>
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
        <Title style={styles.titles}>{title}</Title>
        <Text style={styles.text}> Description: {description}</Text>
        <Text style={styles.text}>Complete Date: {completeDate}</Text>
        <View style={{ flex: 1, right: 0 }}>
          <Rating
            imageSize={20}
            type={"custom"}
            ratingColor={"#FFF36D"}
            tintColor={"white"}
            ratingBackgroundColor={"#CAD2C5"}
            startingValue={rating}
            readonly={true}
          />
        </View>
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
                      <Text style={styles.editTitle}>Description: </Text>
                      <TextInput
                        defaultValue={description}
                        onChangeText={(val) => {
                          setDescription(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.editData}>
                      <Text style={styles.editTitle}>Complete Date: </Text>
                      <TextInput
                        defaultValue={completeDate}
                        onChangeText={(val) => {
                          setCompleteDate(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={{ marginTop: 5, marginBottom: 5 }}>
                      <View>
                        <Text style={styles.editTitle}>Rating:</Text>
                        <Rating
                          style={styles.rating}
                          type={"custom"}
                          ratingColor={"#FFF36D"}
                          tintColor={"#6667AB"}
                          ratingBackgroundColor={"#CAD2C5"}
                          startingValue={rating}
                          onFinishRating={(rating) => {
                            setRating(rating);
                          }}
                        />
                      </View>
                    </View>
                    <Pressable
                      onPress={onEditSubmit}
                      style={styles.editcompleteButton}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Submit Edit
                      </Text>
                    </Pressable>
                  </>
                ) : (
                  <StoryItem
                    title={title}
                    location={location}
                    category={category}
                  />
                )}
              </View>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  setEdit(false);
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
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
  rating: {
    backgroundColor: "#6667AB",
  },
  modalView: {
    borderWidth: 2,
    borderColor: "#6667AB",
    margin: 20,
    width: "95%",
    marginTop: 215,
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
  button: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#6667AB",
    elevation: 2,
  },

  text: {
    color: "black",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4,
  },
  item: {
    padding: 10,
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
  modaltitle: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  textData: {
    color: "white",
    fontSize: 20,
    width: 250,
    margin: 5,
    padding: 5,
  },
  editButton: {
    padding: 10,
    marginTop: 15,
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderRadius: 15,
    height: 40,
    width: 100,
  },
  buttonClose: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "red",
    alignSelf: "flex-end",
    marginTop: -35,
    marginRight: -10,
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

export default StoryCard;
