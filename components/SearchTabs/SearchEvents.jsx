import { useEffect, useState } from "react";
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
import { fetchEvents } from "../../fetch-api/events";

const SearchEvent = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://serpapi.com/search.json?engine=google_events&q=Events+in+United+Kingdom&api_key=cbf9cea56cfe76bcdad1f5f2a29f887f54dafebcc8d26e33f0ca2392fa1860ed&start=100"
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events_results);
      });
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
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
                      source={{ uri: events.image }}
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#52796F",
  },
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

export default SearchEvent;
