import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../colors";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { mainStyles } from "../../App";
import ProfilesList from "../components/ProfilesList";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Community">;
};

const Community = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <AntDesign name="arrowleft" size={26} color={Colors.primary} />
        </Pressable>
        <Text style={[mainStyles.boldFont, styles.heading]}>Community</Text>
      </View>
      <Text style={[mainStyles.boldFont, styles.text]}>
        Collaborate with global readers in our community
      </Text>
      <Text style={[mainStyles.boldFont, styles.connectCircle]}>
        Connect Circle
      </Text>
      <ProfilesList navigation={navigation} />
    </View>
  );
};
export default Community;
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
  text: {
    fontSize: 22,
    marginVertical: 35,
  },
  connectCircle: {
    color: Colors.secondary,
  },
});
