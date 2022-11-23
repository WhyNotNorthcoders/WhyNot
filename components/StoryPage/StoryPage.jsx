import {
  Title,
  Caption,
  Paragraph,
  Card,
  TextInput,
  Button,
} from "react-native-paper";
import { ScrollView, View, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import { Rating } from "react-native-ratings";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, database } from "../../config/firebaseConfig";
import CommentCard from "./CommentCard";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      if (comments) {
        comments.forEach((comment) => {
          commentList.push({ ...comment.data(), id: comment.id });
        });
      }
      if (commentList.length > 0) {
        setIsCommentsLoading(false);
        setComments(commentList);
      } else {
        setIsCommentsLoading(true);
        setComments(commentList);
      }
    });
  }, [story_id, comments.length]);

  const onSubmitComment = () => {
    const commentItem = {
      comment_text: commentInput,
      user_id: auth.currentUser.uid,
      story_id: story_id,
      created_at: String(new Date()),
    };
    addDoc(commentRef, commentItem).then(() => {
      alert("Comment has been added");
      Keyboard.dismiss()
      setCommentInput("");
    });
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Button
        style={{
          position: "absolute",
          zIndex: 999,
        }}
        size={60}
        icon="arrow-left"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.storyContent}>
        <Card style={{ padding: 15 }}>
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
        <ScrollView style={styles.commentSection}>
          {isCommentsLoading ? (
            <Card styles={styles.comments}>
              <Card.Content>
                <Paragraph>"No Comments"</Paragraph>
              </Card.Content>
            </Card>
          ) : (
            comments.map((comment) => {
              return <CommentCard key={comment.id} comment={comment} />;
            })
          )}
        </ScrollView>
      </View>
      <View style={styles.commentForm}>
        <TextInput
          mode="outlined"
          label="Enter Comment"
          value={commentInput}
          onChangeText={(input) => {
            setCommentInput(input);
          }}
          right={
            <TextInput.Icon
              icon="send-circle-outline"
              size={30}
              onPress={onSubmitComment}
            />
          }
        />
      </View>
    </SafeAreaView>
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
  commentForm: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  storyContent: {
    margin: 5,
  },
});
