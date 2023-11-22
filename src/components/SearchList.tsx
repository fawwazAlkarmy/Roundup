import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchItem from "./SearchItem";
import { Article, RootStackParamList } from "../types";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
import { mainStyles } from "../../App";
import useSearch from "../hooks/useSearch";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  searchInput: string;
  navigation: NativeStackNavigationProp<RootStackParamList, "Search">;
};

const SearchList = ({ searchInput, navigation }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const offset = currentPage * limit;
  const { data, isLoading, isError } = useSearch(searchInput, offset, limit);

  let filteredArticles = data?.data || [];
  const uniqueArticleTitles = new Set();

  filteredArticles = filteredArticles.filter((article: Article) => {
    if (uniqueArticleTitles.has(article.title)) {
      return false;
    }
    uniqueArticleTitles.add(article.title);
    return true;
  });

  const handlePreviousPage = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {isLoading && (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      )}
      {isError && <Text>Error ...</Text>}
      <FlatList
        data={filteredArticles}
        renderItem={({ item }) => (
          <SearchItem article={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyExtractor={(item) => item.title}
      />
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text
          style={[
            mainStyles.boldFont,
            { textAlign: "center", color: Colors.lightGray },
          ]}
        >
          {currentPage + 1}
        </Text>
        <View style={styles.paginationButtons}>
          <Icon
            name="arrow-left-circle-fill"
            color={Colors.primary}
            size={30}
            onPress={handlePreviousPage}
          />
          <Icon
            name="arrow-right-circle-fill"
            color={Colors.primary}
            size={30}
            onPress={handleNextPage}
          />
        </View>
      </View>
    </>
  );
};
export default SearchList;

const styles = StyleSheet.create({
  paginationButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    width: 150,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
