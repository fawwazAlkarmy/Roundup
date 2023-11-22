import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";
import { Article, RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import usePostTitle from "../hooks/usePostTitle";

type Props = {
  article: Article;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const FeaturedArticle = ({ article, navigation }: Props) => {
  const { postTitle } = usePostTitle(article.title);

  const handlePress = () => {
    postTitle.mutateAsync();
    navigation.navigate("Article", { article });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <View>
          {!article.image && article.image === null ? (
            <Image
              style={styles.img}
              source={require("../../assets/Images/placeholder.jpg")}
            />
          ) : (
            <Image style={styles.img} source={{ uri: article.image }} />
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.publisherCategoryContainer}>
            <View style={styles.category}>
              <Text style={[mainStyles.normalFont, styles.categoryText]}>
                {article.source}
              </Text>
            </View>
          </View>
          <Text style={[mainStyles.boldFont, styles.title]}>
            {article.title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
export default FeaturedArticle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    marginTop: 10,
    marginBottom: 35,
  },
  img: {
    width: 150,
    height: 270,
    borderRadius: 5,
  },

  publisherCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    width: "50%",
    marginLeft: 20,
    gap: 15,
    flexDirection: "column",
  },
  category: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },

  categoryText: {
    color: Colors.white,
    fontSize: 10,
  },

  publisherName: {
    width: 85,
    marginLeft: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
  },
});
