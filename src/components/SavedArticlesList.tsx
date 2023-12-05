import { StyleSheet, Text, View, FlatList } from "react-native";
import useStore from "../store/useStore";
import { SavedArticle } from "../types";
import SavedArticleItem from "./SavedArticleItem";
const SavedArticlesList = () => {
  const profile = useStore((state) => state.profile);

  const renderData = (item: SavedArticle) => {
    return <SavedArticleItem article={item} />;
  };
  return (
    <>
      <FlatList
        data={profile?.saved_articles}
        renderItem={({ item }) => renderData(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 400 }}
        keyExtractor={(item) => item.article_title}
      />
    </>
  );
};
export default SavedArticlesList;
const styles = StyleSheet.create({});
