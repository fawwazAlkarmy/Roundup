import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { Article, RootStackParamList } from "../types";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import dayjs from "dayjs";
import ArticleDetailsMenu from "../components/ArticleDetailsMenu";
import Comments from "../components/Comments";

type ArticleRouteParams = {
  article: Article;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Article">;
};

const ArticleDetails = ({ navigation }: Props) => {
  const route = useRoute();
  const { article } = route.params as ArticleRouteParams;
  const formattedDate = dayjs(article.published_at).format("MMMM-D-YYYY");
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  if (showComments) {
    return <Comments toggleComments={toggleComments} />;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Pressable
            onPress={() => navigation.navigate("AiPicks")}
            style={styles.iconContainer}
          >
            <AntDesign name="arrowleft" size={26} color={Colors.primary} />
          </Pressable>
          <View style={styles.articleContainer}>
            <Text style={[mainStyles.boldFont, styles.title]}>
              {article.title}
            </Text>
            <Text style={[mainStyles.normalFont, styles.source]}>
              {article.source} . {formattedDate}
            </Text>
            <Text style={[mainStyles.normalFont, styles.description]}>
              {article.description}
            </Text>
            <Pressable
              style={styles.btnContainer}
              onPress={() => openLink(article.url)}
            >
              <Text style={[mainStyles.boldFont, styles.btnText]}>
                Full Article
              </Text>
            </Pressable>
            <View style={styles.imgContainer}>
              {!article.image && article.image === null ? (
                <Image
                  source={require("../../assets/Images/placeholder.jpg")}
                  style={styles.placeHolderImage}
                />
              ) : (
                <Image source={{ uri: article.image }} style={styles.img} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <ArticleDetailsMenu toggleComments={toggleComments} article={article} />
    </>
  );
};
export default ArticleDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  iconContainer: {
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 28,
  },
  articleContainer: {
    marginTop: 28,
    gap: 20,
  },
  source: {
    fontSize: 11,
    paddingHorizontal: 28,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 28,
  },
  btnContainer: {
    paddingHorizontal: 28,
  },
  btnText: {
    borderBottomWidth: 2,
    borderColor: Colors.secondary,
    width: 75,
    textAlign: "center",
    paddingBottom: 2,
    marginTop: 10,
  },
  imgContainer: {
    width: "100%",
  },
  img: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  placeHolderImage: {
    width: 400,
    height: 350,
  },
});
