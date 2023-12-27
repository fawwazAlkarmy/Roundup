import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { mainStyles } from "../../App";
import QuestionItem from "../components/QuestionItem";
import { Colors } from "../colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { supabase } from "../services/supabase";
import useStore from "../store/useStore";

const questions = [
  {
    id: 1,
    question: "Choose your favorite category",
    options: [
      "General",
      "Sports",
      "Business",
      "Health",
      "Science",
      "Technology",
      "Entertainment",
    ],
  },
  {
    id: 2,
    question: "Do you mind sharing your profile info with readers community",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    question: "Where are you located",
    options: ["Asia", "Europe", "Middle East", "Africa"],
  },
  {
    id: 4,
    question:
      "Would you like to receive notifications & updates about latest news and trending topics",
    options: ["Yes", "No"],
  },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Preferences">;
};

const Preferences = ({ navigation }: Props) => {
  const { control, handleSubmit, watch } = useForm();
  const selectedOptions = watch();
  const user = useStore((state) => state.user);

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          favorite_category: selectedOptions["1"],
          location: selectedOptions["3"],
        })
        .eq("id", user?.id);
      if (error) {
        throw new Error(error.message);
      }
      Toast.show({
        type: "success",
        text1: "All Done 😊",
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Something went wrong 😥",
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
      console.log(err);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <Text style={[mainStyles.boldFont, styles.header]}>
        Customize Your Experience
      </Text>
      <Text style={[mainStyles.normalFont]}>
        Help us tailor your news feed by selecting your favorite categories &
        answer few questions.
      </Text>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} control={control} />
      ))}
      <Pressable style={styles.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={[mainStyles.boldFont, styles.btnText]}>Customize</Text>
      </Pressable>
    </ScrollView>
  );
};
export default Preferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 28,
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
  },
  btn: {
    marginTop: 50,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 75,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
  },
});
