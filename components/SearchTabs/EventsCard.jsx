import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  Modal,
  Pressable,
} from "react-native";

const EventsCard = ({ item }) => {
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
            source={{ uri: item.image }}
          />
          <Text style={styles.eventInformation}>
            Address: {item.address[0]}, {item.address[1]}
          </Text>
          <Text style={styles.eventInformation}>{item.date.when}</Text>
          <Text style={styles.eventInformationLink}>
            Click on the post to see more about event!
          </Text>
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
                  style={{
                    height: 150,
                    width: 250,
                    borderRadius: 15,
                    borderStyle: "solid",
                    borderWidth: 1,
                    alignSelf: "center",
                  }}
                  source={{ uri: item.image }}
                />
                <Text style={styles.eventInformationModal}>
                  {item.description}
                </Text>
                <Text style={styles.eventInformationModal}>
                  Address: {item.address[0]}, {item.address[1]}
                </Text>
                <Text style={styles.eventInformationModal}>
                  {item.date.when}
                </Text>
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

export default EventsCard;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#6667AB",
    fontSize: 20,
    margin: 15,
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
    marginTop: "25%",
    height: "60%",
    margin: 10,
    borderWidth: 2,
    borderColor: "#6667AB",
    backgroundColor: "#faf9f6",
    borderRadius: 15,
    padding: 15,
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
    marginTop: "10%",
    padding: 10,
    backgroundColor: "#6667AB",
  },
  eventInformationTitle: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  eventInformation: {
    margin: 5,
  },
  eventInformationModal: {
    margin: 5,
    fontSize: 15,
  },
  eventInformationLink: {
    margin: 5,
    textDecorationLine: "underline",
  },
});
