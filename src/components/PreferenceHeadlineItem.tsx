import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Linking,
} from "react-native";
import { Article } from "../types";
import { mainStyles } from "../../App";
import { Colors } from "../colors";

type Props = {
  article: Article;
};

const openLink = (url: string) => {
  Linking.openURL(url);
};

const PreferenceHeadlineItem = ({ article }: Props) => {
  return (
    <Pressable style={styles.container} onPress={() => openLink(article.url)}>
      <Text style={[mainStyles.normalFont, styles.source]}>
        {article.source}
      </Text>
      <Text style={[mainStyles.boldFont, styles.heading]}>
        {article.title.substring(0, 100) + " ..."}
      </Text>
      <Pressable
        onPress={() => openLink(article.url)}
        style={styles.readMoreContainer}
      >
        <Text style={[mainStyles.boldFont, styles.linkText]}>Read More</Text>
      </Pressable>
      {article.image ? (
        <Image source={{ uri: article.image }} style={styles.img} />
      ) : null}
    </Pressable>
  );
};
export default PreferenceHeadlineItem;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    marginRight: 20,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    gap: 15,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    width: 150,
    color: Colors.white,
  },
  source: {
    fontSize: 12,
    color: Colors.lightGray,
  },
  readMoreContainer: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  linkText: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.secondary,
    width: 70,
    textAlign: "right",
    color: Colors.white,
  },
  img: {
    borderRadius: 5,
    resizeMode: "cover",
    overflow: "hidden",
    opacity: 0.2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
