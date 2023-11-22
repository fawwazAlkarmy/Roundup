import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";

const categories: string[] = [
  "general",
  "sports",
  "business",
  "health",
  "science",
  "technology",
  "entertainment",
];

type Props = {
  activeCategory: string;
  setCategory: (categories: string) => void;
};

const CategoriesBar = ({ setCategory, activeCategory }: Props) => {
  const renderItem = ({ item: category }: { item: string }) => {
    const checkActiveCategory = activeCategory === category;
    return (
      <Pressable onPress={() => setCategory(category)}>
        <Text
          style={[
            mainStyles.normalFont,
            styles.category,
            checkActiveCategory && styles.activeCategory,
          ]}
        >
          {category}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(category) => category}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default CategoriesBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 16,
  },
  category: {
    color: Colors.white,
    marginHorizontal: 18,
    fontSize: 16,
  },
  activeCategory: {
    color: Colors.secondary,
  },
});
