import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import useRecommendation from "../hooks/useRecommendation";
import LottieView from "lottie-react-native";
import AiPicksCard from "../components/AiPicksCard";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "AiPicks">;
};

const AiPicks = ({ navigation }: Props) => {
  const { data: aiPicks, isError, isLoading, isFetching } = useRecommendation();

  let filteredAiPicks = aiPicks?.filter((item) => {
    return Object.values(item).every((value) => value !== undefined);
  });

  const handlePress = () => {
    navigation.navigate("Home");
  };

  if (isError)
    return (
      <View style={styles.lottieContainer}>
        <LottieView
          source={require("../../assets/404.json")}
          autoPlay={true}
          loop
          style={styles.lottie}
          speed={1}
        />
      </View>
    );
  if (isLoading || isFetching)
    return (
      <View style={styles.lottieContainer}>
        <Text
          style={[
            mainStyles.boldFont,
            { fontSize: 20, width: 220, textAlign: "center" },
          ]}
        >
          Awaiting your carefully chosen articles ...
        </Text>
        <LottieView
          source={require("../../assets/Animation.json")}
          autoPlay={true}
          loop
          style={styles.lottie}
          speed={1}
        />
        <Text style={[mainStyles.normalFont]}>This may take a minute</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <AntDesign name="arrowleft" size={26} color={Colors.primary} />
      </Pressable>
      <Text style={[mainStyles.boldFont, styles.header]}>AI Picks</Text>
      <FlatList
        data={filteredAiPicks}
        renderItem={({ item }) => <AiPicksCard article={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.published_at}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};
export default AiPicks;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 28,
  },
  header: {
    fontSize: 25,
    marginTop: 20,
  },
  lottieContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: -50,
  },
  lottie: {
    width: 350,
    height: 350,
  },
});
