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
import { Title } from 'react-native-paper'
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
        <Text>Title: {title}</Text>
        <Text>Category: {category}</Text>
        <Text>Location: {location}</Text>
        <Text>Description: {description}</Text>
        <Text>Complete Date: {completeDate}</Text>
        <View>
          <Text>Rating:</Text>
          <Rating
            style={styles.rating}
            type={"custom"}
            ratingColor={"#FFF36D"}
            tintColor={"white"}
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
          style={styles.button}
        >
          <Text>Edit</Text>
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
        <Text style={styles.text}>Complete Date: {completeDate}</Text>
        <View style={{ flex: 1, right: 0 }}>
          <Rating
            imageSize={20}
            type={"custom"}
            ratingColor={"#FFF36D"}
            tintColor={"#6667AB"}
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
                    <View style={styles.textData}>
                      <Text>Title: </Text>
                      <TextInput
                        defaultValue={title}
                        onChangeText={(val) => {
                          setTitle(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Category: </Text>
                      <TextInput
                        onChangeText={(val) => {
                          setCategory(val);
                        }}
                        editable={true}
                        defaultValue={category}
                      ></TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Location: </Text>
                      <TextInput
                        defaultValue={location}
                        onChangeText={(val) => {
                          setLocation(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Description: </Text>
                      <TextInput
                        defaultValue={description}
                        onChangeText={(val) => {
                          setDescription(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.textData}>
                      <Text>Complete Date: </Text>
                      <TextInput
                        defaultValue={completeDate}
                        onChangeText={(val) => {
                          setCompleteDate(val);
                        }}
                        editable={true}
                      ></TextInput>
                    </View>
                    <View style={styles.textData}>
                      <View>
                        <Text>Rating:</Text>
                        <Rating
                          style={styles.rating}
                          type={"custom"}
                          ratingColor={"#FFF36D"}
                          tintColor={"white"}
                          ratingBackgroundColor={"#CAD2C5"}
                          startingValue={rating}
                          onFinishRating={(rating) => {
                            setRating(rating);
                          }}
                        />
                      </View>
                    </View>
                    <Pressable onPress={onEditSubmit} style={styles.button}>
                      <Text>Submit Edit</Text>
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
    fontSize: 16,
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

export default StoryCard;
