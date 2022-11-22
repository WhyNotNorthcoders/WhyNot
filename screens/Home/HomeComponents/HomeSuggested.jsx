import { useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";
import { Caption } from "react-native-paper";

const HomeSuggested = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.eventCard}>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.item}>
          <Text style={styles.eventInformationTitle}>{item.Title}</Text>
          <Image
            style={{ height: 150, width: "100%", borderRadius: 15 }}
            source={{ uri: item.image_url }}
          />
          <Text style={styles.eventInformation}>Location: {item.Location}</Text>
          <Text style={styles.eventInformation}>
            Difficulty: {item.Difficulty}
          </Text>
          <Caption style={styles.eventInformation}>
            Click on the item to add to your Bucket List
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
                <Text style={styles.eventInformationTitle}>{item.Title}</Text>
                <Image
                  style={{
                    height: 150,
                    width: 240,
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                  source={{ uri: item.image_url }}
                />
                <Text style={styles.eventInformation}>
                  Location: {item.Location}
                </Text>
                <Text style={styles.eventInformation}>
                  Difficulty: {item.Difficulty}
                </Text>
                <View style={styles.imageContainer}></View>
              </View>
              <Pressable style={[styles.button]}>
                <Text style={{ color: "white" }}>Add to my Bucket List</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Close
                </Text>
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
    marginTop: 2,
    padding: 10,
    backgroundColor: "green",
    alignSelf: "center",
  },
  buttonClose: {
    borderRadius: 20,
    marginTop: 2,
    padding: 10,
    backgroundColor: "red",
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

export default HomeSuggested;
