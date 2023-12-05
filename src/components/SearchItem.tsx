import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Article, RootStackParamList } from "../types";
import { mainStyles } from "../../App";
import dayjs from "dayjs";
import { Colors } from "../colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import usePostTitle from "../hooks/usePostTitle";

type Props = {
  article: Article;
  navigation: NativeStackNavigationProp<RootStackParamList, "Search">;
};

const SearchItem = ({ article, navigation }: Props) => {
  const formattedDate = dayjs(article.published_at).format("MMMM D");
  const { postTitle } = usePostTitle(article.title);
  const handlePress = () => {
    postTitle.mutate();
    navigation.navigate("Article", { article });
  };
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.dateSourceContainer}>
        <Text style={[mainStyles.boldFont, styles.sourceName]}>
          {article.source}
        </Text>
        <Text style={[mainStyles.normalFont, styles.date]}>
          {formattedDate}
        </Text>
      </View>
      <View>
        {!article.image && article.image === null ? (
          <Image
            style={styles.image}
            source={require("../../assets/Images/placeholder.jpg")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: article.image }} />
        )}
      </View>
      <Text style={[mainStyles.boldFont, styles.title]}>
        {article.title?.substring(0, 100) + "..."}
      </Text>
      <Text style={[mainStyles.normalFont, styles.description]}>
        {article.description?.substring(0, 100) + "..."}
      </Text>
      <View style={styles.line}></View>
    </Pressable>
  );
};
export default SearchItem;
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  sourceName: {
    fontSize: 14,
  },
  dateSourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    marginTop: 8,
  },
  line: {
    borderWidth: 0.4,
    borderColor: Colors.secondary,
    marginTop: 30,
    width: "100%",
    alignSelf: "center",
  },
});
