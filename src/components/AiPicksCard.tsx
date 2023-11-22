import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
} from "react-native";
import { AiPick } from "../types";
import { mainStyles } from "../../App";
import dayjs from "dayjs";
import { Colors } from "../colors";

type Props = {
  article: AiPick;
};

const openLink = (url: string) => {
  Linking.openURL(url);
};

const AiPicksCard = ({ article }: Props) => {
  const date = dayjs(article.published_at).format("DD MMM YYYY");

  return (
    <Pressable onPress={() => openLink(article.url)} style={styles.card}>
      <View style={styles.imgContainer}>
        {!article.url_to_image && article.url_to_image === "" ? (
          <Image
            source={require("../../assets/Images/placeholder.jpg")}
            style={styles.img}
          />
        ) : (
          <Image source={{ uri: article.url_to_image }} style={styles.img} />
        )}
      </View>

      <Text style={[mainStyles.boldFont, styles.title]}>{article.title}</Text>
      <Text style={[mainStyles.normalFont, styles.source]}>
        {article.source_name} . {date}
      </Text>
      <Pressable onPress={() => openLink(article.url)}>
        <Text style={[mainStyles.boldFont, styles.btnText]}>Full Article</Text>
      </Pressable>
    </Pressable>
  );
};
export default AiPicksCard;
const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.primary,
    marginVertical: 25,
    paddingVertical: 25,
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    color: Colors.white,
  },
  imgContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    marginHorizontal: -20,
    marginTop: -25,
  },

  img: {
    width: "100%",
    height: 200,
  },
  source: {
    color: Colors.white,
  },
  btnText: {
    borderBottomWidth: 2,
    borderColor: Colors.secondary,
    width: 75,
    textAlign: "center",
    paddingBottom: 2,
    marginTop: 10,
    color: Colors.white,
  },
});
