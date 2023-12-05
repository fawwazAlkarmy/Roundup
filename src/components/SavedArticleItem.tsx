import { Pressable, StyleSheet, Text, Linking, Image } from "react-native";
import { SavedArticle } from "../types";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import dayjs from "dayjs";
import Icon from "react-native-remix-icon";
import useStore from "../store/useStore";
import { supabase } from "../services/supabase";
import Toast from "react-native-toast-message";

type Props = {
  article: SavedArticle;
};

const openLink = (url: string) => {
  Linking.openURL(url);
};

const SavedArticleItem = ({ article }: Props) => {
  const formattedDate = dayjs(article.article_date).format("DD MMM YYYY");
  const user = useStore((state) => state.user);
  const isBookmarked = useStore((state) =>
    state.profile?.saved_articles.some(
      (savedArticle: SavedArticle) =>
        savedArticle.article_url === article.article_url
    )
  );
  const setIsBookmarked = useStore((state) => state.setIsBookmarked);

  const handleBookmark = async () => {
    try {
      const userProfile = await supabase
        .from("profiles")
        .select("saved_articles")
        .eq("id", user?.id)
        .single();

      const savedArticles = userProfile.data?.saved_articles || [];
      const isAlreadyBookmarked = savedArticles.some(
        (savedArticle: SavedArticle) =>
          savedArticle.article_url === article.article_url
      );
      if (isAlreadyBookmarked) {
        // remove from bookmarked
        setIsBookmarked(false);
        const userProfile = await supabase
          .from("profiles")
          .select("saved_articles")
          .eq("id", user?.id)
          .single();
        const savedArticles = userProfile.data?.saved_articles || [];
        const updatedSavedArticles = savedArticles.filter(
          (savedArticle: SavedArticle) =>
            savedArticle.article_url !== article.article_url
        );

        await supabase
          .from("profiles")
          .update({ saved_articles: updatedSavedArticles })
          .eq("id", user?.id);

        Toast.show({
          type: "success",
          text1: "Article removed from bookmarked  ❌",
          position: "top",
          visibilityTime: 3000,
          topOffset: 50,
        });
      }
    } catch (error) {
      console.error("Error bookmarking article:", error);
    }
  };
  return (
    <Pressable
      style={styles.card}
      onPress={() => openLink(article.article_url)}
    >
      <Text style={[mainStyles.boldFont, styles.title]}>
        {article.article_title}
      </Text>
      <Text style={[mainStyles.normalFont, styles.source]}>
        {article.article_source} - {formattedDate}
      </Text>
      <Pressable style={styles.bookmark} onPress={handleBookmark}>
        <Icon
          name={isBookmarked ? "bookmark-fill" : "bookmark-line"}
          color={Colors.lightGray}
          size={24}
        />
      </Pressable>
      {article.article_image ? (
        <Image source={{ uri: article.article_image }} style={styles.img} />
      ) : null}
    </Pressable>
  );
};
export default SavedArticleItem;
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    width: "auto",
    height: 260,
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: "space-between",
  },
  title: {
    color: Colors.white,
    fontSize: 14,
    width: 220,
  },
  source: {
    color: Colors.white,
    fontSize: 12,
  },
  bookmark: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 10,
  },
  img: {
    width: 310,
    height: 260,
    borderRadius: 10,
    marginBottom: 10,
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
