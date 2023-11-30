import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import dayjs from "dayjs";
import SearchBar from "../components/SearchBar";
import CategoriesBar from "../components/CategoriesBar";
import BottomNav from "../components/BottomNav";
import { useState } from "react";
import SideMenu from "../components/SideMenu";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import FeaturedArticlesList from "../components/FeaturedArticlesList";
import useStore from "../store/useStore";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const Home = ({ navigation }: Props) => {
  const date = dayjs();
  const formattedDate = date.format("dddd, MMMM D, YYYY");
  const [category, setCategory] = useState("general");
  const menuIsOpen = useStore((state) => state.menuIsOpen);
  const setMenuIsOpen = useStore((state) => state.setMenuIsOpen);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Icon
            name="menu-2-fill"
            color={Colors.primary}
            size={24}
            onPress={() => setMenuIsOpen(true)}
          />
          <Text style={[mainStyles.boldFont, styles.headerTitle]}>Home</Text>
          <Text style={[mainStyles.normalFont, styles.date]}>
            {formattedDate}
          </Text>
        </View>
        <SearchBar navigation={navigation} />
        <CategoriesBar activeCategory={category} setCategory={setCategory} />
        <Text style={[mainStyles.boldFont, styles.sectionTitle]}>
          Featured News
        </Text>
        <View>
          <FeaturedArticlesList navigation={navigation} category={category} />
        </View>
      </View>
      {menuIsOpen && <SideMenu navigation={navigation} />}
      <BottomNav navigation={navigation} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 70,
    height: "100%",
  },
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 30,
  },
  date: {
    width: 100,
  },
  sectionTitle: {
    fontSize: 26,
    marginLeft: 24,
    marginTop: 24,
  },
  text: {
    color: "#c4c4c4",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 24,
  },
  listContainer: {
    paddingBottom: 200,
  },
});
