import { Image, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";
import { Comment } from "../types";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { ProfileType } from "../types";

dayjs.extend(relativeTime);

type Props = {
  comment: Comment;
};

const SingleComment = ({ comment }: Props) => {
  const datetime: Dayjs = dayjs(comment.created_at);
  dayjs.locale("en");
  const formattedTimeAgo: string = datetime.fromNow();
  const getUserProfile = useStore((state) => state.getUserProfile);
  const [user, setUser] = useState<ProfileType | null>(null);

  useEffect(() => {
    getUserProfile(comment.user_id).then((data) => setUser(data));
  }, [comment.user_id, getUserProfile]);

  return (
    <View style={styles.container}>
      <View>
        {user?.avatar_url ? (
          <Image style={styles.userImg} source={{ uri: user?.avatar_url }} />
        ) : (
          <View style={styles.defaultImage}>
            <Text style={[mainStyles.boldFont, styles.defaultText]}>
              {user?.username[0]}
            </Text>
          </View>
        )}
      </View>
      <View>
        <Text style={[mainStyles.boldFont, styles.username]}>
          {user?.username}{" "}
          <Text style={[mainStyles.normalFont, styles.commentTime]}>
            . {formattedTimeAgo}
          </Text>
        </Text>
        <Text style={[mainStyles.normalFont, styles.commentText]}>
          {comment.comment_text}
        </Text>
      </View>
    </View>
  );
};
export default SingleComment;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 12,
    marginTop: 30,
  },
  userImg: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  username: {
    marginBottom: 18,
  },
  commentTime: {
    color: Colors.lightGray,
  },
  commentText: {
    width: 250,
  },
  defaultImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
  },
  defaultText: {
    color: Colors.white,
    fontSize: 26,
    textAlign: "center",
    lineHeight: 58,
  },
});
