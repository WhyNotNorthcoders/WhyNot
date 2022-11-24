import { Pressable, View, StyleSheet } from "react-native";
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
  storyImage,
  navigation,
  user_id,
}) => {
  return (
    <View style={styles.storyCard}>
      <Pressable
        onPress={() => {
          navigation.navigate("StoryPage", {
            story_id: story_id,
            title: title,
            description: description,
            category: category,
            location: location,
            rating: rating,
            completeDate: completeDate,
            storyImage: storyImage,
            navigation: navigation,
            user_id: user_id,
          });
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
            {storyImage ? (
              <Card.Cover
                source={{ uri: storyImage }}
                style={styles.storyImage}
              />
            ) : (
              <></>
            )}
            <Card.Content>
              <Paragraph>{'"' + description + '"'}</Paragraph>
            </Card.Content>
          </Card>
          <View style={styles.date_rating}>
            <Caption style={{ fontSize: 10 }}>
              Date Completed: {completeDate}
            </Caption>
            <View style={[styles.rating, { marginLeft: "25%" }]}>
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
    backgroundColor: "#faf9f6",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
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

  storyImage: {
    borderRadius: 5,
    height: 125,
  },
});
