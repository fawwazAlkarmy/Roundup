import { Text, ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import FeaturedArticle from "./FeaturedArticle";
import { Article, RootStackParamList } from "../types";
import useTopHeadlines from "../hooks/useTopHeadlines";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  category: string;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const FeaturedArticlesList = ({ category, navigation }: Props) => {
  const { data, isLoading, isError } = useTopHeadlines(category);

  let filteredArticles = data?.data || [];
  const uniqueArticleTitles = new Set();

  filteredArticles = filteredArticles.filter((article: Article) => {
    if (uniqueArticleTitles.has(article.title)) {
      return false;
    }
    uniqueArticleTitles.add(article.title);
    return true;
  });

  return (
    <>
      {isLoading && (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      )}
      {isError && <Text>Error ...</Text>}
      <FlatList
        data={filteredArticles}
        renderItem={({ item }) => (
          <FeaturedArticle navigation={navigation} article={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 400 }}
        keyExtractor={(item) => item.title}
      />
    </>
  );
};
export default FeaturedArticlesList;
