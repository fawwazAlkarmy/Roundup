import { FlatList } from "react-native";
import useStore from "../store/useStore";
import useLocationHeadlines from "../hooks/useLocationHeadlines";
import { Article } from "../types";
import PreferenceHeadlineItem from "./PreferenceHeadlineItem";

const LocationHeadlinesList = () => {
  const profile = useStore((state) => state.profile);
  const { data, isLoading, isError } = useLocationHeadlines(profile!.location);

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
export default LocationHeadlinesList;
