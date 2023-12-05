import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import SavedArticlesList from "../components/SavedArticlesList";
import { mainStyles } from "../../App";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "SavedArticles">;
};

const SavedArticles = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <AntDesign name="arrowleft" size={26} color={Colors.primary} />
        </Pressable>
        <Text style={[mainStyles.boldFont, styles.heading]}>
          Saved Articles
        </Text>
      </View>
      <SavedArticlesList />
    </View>
  );
};
export default SavedArticles;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 16,
  },
});
