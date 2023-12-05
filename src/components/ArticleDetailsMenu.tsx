import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
import { supabase } from "../services/supabase";
import { Article } from "../types";
import useStore from "../store/useStore";

type Props = {
  toggleComments: () => void;
  article: Article;
};

type SavedArticle = {
  article_url: string;
  article_title: string;
  article_source: string;
  article_date: string;
};

const ArticleDetailsMenu = ({ toggleComments, article }: Props) => {
  const user = useStore((state) => state.user);
  const isBookmarked = useStore((state) =>
    state.profile?.saved_articles.some(
      (savedArticle: any) => savedArticle.article_url === article.url
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
        (savedArticle: SavedArticle) => savedArticle.article_url === article.url
      );
      if (!isAlreadyBookmarked) {
        const updatedSavedArticles = [
          ...savedArticles,
          {
            article_url: article.url,
            article_title: article.title,
            article_source: article.source,
            article_date: article.published_at,
          },
        ];

        await supabase
          .from("profiles")
          .update({ saved_articles: updatedSavedArticles })
          .eq("id", user?.id);
        setIsBookmarked(true);
      } else {
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
            savedArticle.article_url !== article.url
        );

        await supabase
          .from("profiles")
          .update({ saved_articles: updatedSavedArticles })
          .eq("id", user?.id);
      }
    } catch (error) {
      console.error("Error bookmarking article:", error);
    }
  };

  const toggleBookmark = () => {
    handleBookmark();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleBookmark}>
        <Icon
          name={isBookmarked ? "bookmark-fill" : "bookmark-line"}
          color={Colors.lightGray}
          size={24}
        />
      </Pressable>
      <Pressable onPress={toggleComments}>
        <Icon name="message-3-line" color={Colors.lightGray} size={24} />
      </Pressable>
    </View>
  );
};
export default ArticleDetailsMenu;
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 70,
  },
});
