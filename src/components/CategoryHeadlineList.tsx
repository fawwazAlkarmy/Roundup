import { FlatList, Text } from "react-native";
import useStore from "../store/useStore";
import { Article } from "../types";
import PreferenceHeadlineItem from "./PreferenceHeadlineItem";
import useCategoryHeadlines from "../hooks/useCategoryHeadlines";

const CategoryHeadlinesList = () => {
  const profile = useStore((state) => state.profile);
  const { data, isLoading, isError } = useCategoryHeadlines(
    profile!.favorite_category
  );
  if (isError) {
    return <Text>Error</Text>;
  }

  const renderData = (item: Article) => {
    return <PreferenceHeadlineItem article={item} />;
  };
  return (
    <>
      <FlatList
        data={data?.data}
        renderItem={({ item }) => renderData(item)}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item) => item.url}
      />
    </>
  );
};
export default CategoryHeadlinesList;
