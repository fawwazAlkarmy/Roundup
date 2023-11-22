import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import SearchList from "../components/SearchList";

type SearchRouteParams = {
  searchInput: string;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Search">;
};

const Search = ({ navigation }: Props) => {
  const route = useRoute();
  const params = route.params as SearchRouteParams;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={26} color={Colors.primary} />
      </Pressable>
      <Text style={[mainStyles.boldFont, styles.searchHeader]}>
        Search Result For : {params.searchInput}
      </Text>
      <SearchList searchInput={params.searchInput} navigation={navigation} />
    </View>
  );
};
export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 25,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  searchHeader: {
    fontSize: 15,
    marginTop: 20,
  },
});
