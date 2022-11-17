import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  Modal,
  Pressable,
} from "react-native";

const EventsCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <View style={styles.item}>
        <Text>Title: {item.title}</Text>
        <Image
          style={{ height: 100, width: 100, borderRadius: 50 }}
          source={{ uri: item.image }}
        />
        <Text>
          Address: {item.address[0]}, {item.address[1]}
        </Text>
        <Text>{item.date.when}</Text>
        <View style={styles.imageContainer}></View>
        <Text
          style={{ color: "blue" }}
          onPress={() => {
            Linking.openURL(item.link);
          }}
        >
          More About This Event
        </Text>
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
              <Text>Title: {item.title}</Text>
              <Image
                style={{ height: 100, width: 100, borderRadius: 50 }}
                source={{ uri: item.image }}
              />
              <Text>Description: {item.description}</Text>
              <Text>
                Address: {item.address[0]}, {item.address[1]}
              </Text>
              <Text>{item.date.when}</Text>
              <View style={styles.imageContainer}></View>
              <Text>Click to see more about this event</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{ color: "white" }}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default EventsCard;

const styles = StyleSheet.create({
  item: {
    textAlign: "center",
    backgroundColor: "#84A98C",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CAD2C5",
    padding: 50,
    fontSize: 20,
    margin: 5,
  },
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    padding: 10,
    backgroundColor: "#6667AB",
  },
});
