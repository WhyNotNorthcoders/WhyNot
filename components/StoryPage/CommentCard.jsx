import { View, Text } from "react-native";
import {
  Title,
  Caption,
  Paragraph,
  Card,
  Avatar,
  Button,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../config/firebaseConfig";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState({});
  const { comment_text, user_id, created_at, story_id, id } = comment;

  useEffect(() => {
    const user = doc(database, "users", user_id);
    getDoc(user).then((user) => {
      setUser(user.data());
    });
  }, []);

  const deleteComment = () => {
    const commentRef = doc(
      database,
      "users",
      user_id,
      "Story_list",
      story_id,
      "Comments",
      id
    );
    deleteDoc(commentRef).then(() => {
      alert("comment delete button pressed");
    });
  };

  return (
    <View style={styles.commentBox}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginTop: 5, marginRight: 5, paddingTop: 5 }}>
          <Avatar.Image source={{ uri: user.profile_picture }} size={40} />
        </View>
        <Text></Text>
        <Card style={styles.commentCard}>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Card.Content>
              <Paragraph>{'"' + comment_text + '"'}</Paragraph>
              <View>
                <Caption style={{ fontSize: 10 }}>from {user.username}</Caption>
              </View>
            </Card.Content>
          </View>
          {user_id === auth.currentUser.uid ? (
            <View style={{ position: "absolute", right: "7%" }}>
              <Button icon="delete" onPress={deleteComment} />
            </View>
          ) : (
            <View></View>
          )}
        </Card>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    margin: 5,
  },
  commentCard: {
    width: "100%",
  },
});
