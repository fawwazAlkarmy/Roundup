import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { mainStyles } from "../../App";
import Icon from "react-native-remix-icon";
import { Colors } from "../colors";
import SingleComment from "./SingleComment";
import Animated, {
  SlideOutDown,
  Easing,
  SlideInDown,
} from "react-native-reanimated";
import CommentInputField from "./CommentInputField";
import { Article, Comment } from "../types";
import { supabase } from "../services/supabase";
import { useEffect, useState } from "react";

type Props = {
  toggleComments: () => void;
  article: Article;
};

const Comments = ({ toggleComments, article }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("article_url", article.url);
      if (error) {
        console.log(error.message);
        return;
      }
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      return;
    }
  };

  useEffect(() => {
    getComments();
  }, [comments]);

  const renderData = (item: Comment) => {
    return <SingleComment comment={item} />;
  };

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(500).easing(Easing.ease)}
      exiting={SlideOutDown.duration(500).easing(Easing.ease)}
    >
      <View style={styles.header}>
        <Text style={[mainStyles.boldFont]}>Comments ({comments.length})</Text>
        <Pressable onPress={toggleComments}>
          <Icon name="close-circle-fill" color={Colors.primary} size={20} />
        </Pressable>
      </View>
      <FlatList
        style={styles.commentList}
        data={comments}
        renderItem={({ item }) => renderData(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <Text
            style={[
              mainStyles.normalFont,
              {
                textAlign: "center",
                marginVertical: 30,
              },
            ]}
          >
            No comments yet
          </Text>
        )}
      />
      <View style={styles.inputContainer}>
        <CommentInputField article={article} />
      </View>
    </Animated.View>
  );
};
export default Comments;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: Colors.tertiary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  commentList: {
    flex: 1,
  },
  inputContainer: {
    paddingBottom: 10,
  },
});
