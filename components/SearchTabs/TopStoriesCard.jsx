import { Text, Pressable, View, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import { Title, Caption, Paragraph, Card } from "react-native-paper";
import { Rating } from "react-native-ratings";

const TopStoriesCard = ({
  story_id,
  title,
  description,
  category,
  location,
  rating,
  completeDate,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.storyCard}>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.item}>
          <Title style={styles.storyInformation}>{title}</Title>
          <View style={styles.caption}>
            <Caption style={styles.storyInformation}>
              Category: {category}
            </Caption>
            <Caption style={styles.storyInformation}>
              Location: {location}
            </Caption>
          </View>
          <Card>
            <Card.Content>
              <Paragraph>{description}</Paragraph>
            </Card.Content>
          </Card>
          <View style={styles.date_rating}>
            <Caption style={{ fontSize: 10 }}>
              Date Completed: {completeDate}
            </Caption>
            <View style={[styles.rating, {marginLeft: 100}]}>
              <Caption style={{ fontSize: 10 }}>Rating:</Caption>
              <Rating
                style={styles.rating}
                type={"custom"}
                ratingColor={"#FFF36D"}
                tintColor={"white"}
                imageSize={15}
                ratingBackgroundColor={"#CAD2C5"}
                minValue={0}
                startingValue={rating}
                readonly={true}
              />
            </View>
          </View>
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
                <Title style={styles.storyInformation}>{title}</Title>
                <Text style={styles.storyInformation}>
                  Description: {description}
                </Text>
                <Text style={styles.storyInformation}>{category}</Text>
                <Text style={styles.storyInformation}>{location}</Text>
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
      </Pressable>
    </View>
  );
};

export default TopStoriesCard;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
  },
  date_rating: {
    flexDirection: "row",
  },
  caption: {
    flexDirection: "row",
  },
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
  storyInformation: {
    margin: 5,
  },
});
