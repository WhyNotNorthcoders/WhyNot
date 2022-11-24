import { useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";
import { Caption } from "react-native-paper";

const HomeStories = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.eventCard}>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.item}>
          <Text style={styles.eventInformationTitle}>{item.title}</Text>
          <Image
            style={{ height: 150, width: "100%", borderRadius: 15 }}
            source={{ uri: item.storyImage }}
          />
          <Text style={styles.eventInformation}>Location: {item.location}</Text>
          <Text style={styles.eventInformation}>Rating: {item.rating} / 5</Text>
          <Caption style={styles.eventInformation}>
            Click on the item see more details!
          </Caption>
          <View style={styles.imageContainer}></View>
        </View>
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
                <Text style={styles.eventInformationTitle}>{item.title}</Text>
                <Image
                  style={{ height: 150, width: "100%", borderRadius: 15 }}
                  source={{ uri: item.storyImage }}
                />
                <Text style={styles.eventInformation}>
                  Location: {item.location}
                </Text>
                <Text style={styles.eventInformation}>
                  Description: {item.description}
                </Text>
                <View style={styles.imageContainer}></View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    width: 350,
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    borderWidth: 2,
    borderColor: "#6667AB",
    margin: 20,
    width: 300,
    backgroundColor: "#faf9f6",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 2,
  },
  buttonClose: {
    padding: 10,
    backgroundColor: "#6667AB",
    alignSelf: "center",
  },
  eventInformationTitle: {
    textAlign: "center",
    fontSize: 20,
    margin: 2,
    fontWeight: "bold",
  },
  eventInformation: {
    margin: 5,
    fontStyle: "italic",
  },
});

export default HomeStories;
