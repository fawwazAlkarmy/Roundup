import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { mainStyles } from "../../App";
import ProfilesList from "../components/ProfilesList";
import LocationHeadlinesList from "../components/LocationHeadlinesList";
import CategoryHeadlinesList from "../components/CategoryHeadlineList";
import useStore from "../store/useStore";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Community">;
};

const Community = ({ navigation }: Props) => {
  const profile = useStore((state) => state.profile);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <AntDesign name="arrowleft" size={26} color={Colors.primary} />
        </Pressable>
        <Text style={[mainStyles.boldFont, styles.heading]}>Community</Text>
      </View>
      <Text style={[mainStyles.boldFont, styles.text]}>
        Collaborate with global readers in our community
      </Text>
      <Text style={[mainStyles.boldFont, styles.subHeading]}>
        Connect Circle
      </Text>
      <ProfilesList navigation={navigation} />
      <View style={styles.section}>
        <Text style={[mainStyles.boldFont, styles.subHeading]}>
          Based on your Location - {profile?.location}
        </Text>
        <LocationHeadlinesList />
      </View>
      <View style={styles.section}>
        <Text style={[mainStyles.boldFont, styles.subHeading]}>
          Your favorite category - {profile?.favorite_category}
        </Text>
        <CategoryHeadlinesList />
      </View>
    </ScrollView>
  );
};
export default Community;
const styles = StyleSheet.create({
  container: {
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
  text: {
    fontSize: 22,
    marginVertical: 35,
  },
  subHeading: {
    color: Colors.secondary,
  },
  section: {
    marginTop: 25,
  },
});
