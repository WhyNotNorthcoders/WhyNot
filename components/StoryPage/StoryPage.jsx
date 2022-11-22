import { Title, Caption, Paragraph, Card, TextInput } from "react-native-paper";
import { Button, ScrollView, View, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import { useState, useEffect } from "react";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { auth, database } from "../../config/firebaseConfig";
import CommentCard from "./CommentCard";

const StoryPage = ({
  route: {
    params: {
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
    },
  },
}) => {
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");

  const commentRef = collection(
    database,
    "users",
    user_id,
    "Story_list",
    story_id,
    "Comments"
  );

  useEffect(() => {
    setIsCommentsLoading(true);
    let commentList = [];
    getDocs(commentRef).then((comments) => {
      comments.forEach((comment) => {
        commentList.push({ ...comment.data(), id: comment.id });
      });
      if (commentList.length !== 0) {
        setIsCommentsLoading(false);
        setComments(commentList);
      }
    });
  }, []);

  const onSubmitComment = () => {
    const commentItem = {
      comment_text: commentInput,
      user_id: auth.currentUser.uid,
      story_id: story_id,
      created_at: String(new Date()),
    };

    addDoc(commentRef, commentItem).then(() => {
      alert("Comment has been added");
      setCommentInput("");
    });
  };

  return (
    <ScrollView>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Card>
        <View style={styles.header}>
          <Title>{title}</Title>
          <Caption>{location}</Caption>
          <Card.Cover source={{ uri: storyImage }} />
          <View style={styles.date_rating}>
            <View style={{}}>
              <View style={styles.rating}>
                <Caption style={{ fontSize: 8 }}>Rating:</Caption>
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
              <Caption style={{ fontSize: 8, marginTop: -5 }}>
                Date Completed: {completeDate}
              </Caption>
            </View>
          </View>
        </View>
        <Card.Content>
          <Paragraph>{'"' + description + '"'}</Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.commentSection}>
        {isCommentsLoading ? (
          <Card styles={styles.comments}>
            <Card.Content>
              <Paragraph>"No Comments"</Paragraph>
            </Card.Content>
          </Card>
        ) : (
          comments.map((comment) => {
            return <CommentCard comment={comment} />;
          })
        )}
      </View>
      <TextInput
        mode="outlined"
        label="Enter Comment"
        placeholder="Type Text"
        onChangeText={(input) => {
          setCommentInput(input);
        }}
        right={<TextInput.Affix text="/100" />}
      ></TextInput>
      <Button title="submit" onPress={onSubmitComment} />
    </ScrollView>
  );
};

export default StoryPage;

const styles = StyleSheet.create({
  commentSection: {
    margin: 5,
  },
  date_rating: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 5,
  },
  rating: {
    flexDirection: "row",
  },
  caption: {
    fontSize: 10,
  },
});
