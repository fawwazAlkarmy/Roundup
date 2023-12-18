import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { mainStyles } from "../../App";
import { Colors } from "../colors";
import { supabase } from "../services/supabase";
import { Controller, useForm } from "react-hook-form";
import { Article, CommentData } from "../types";
import useStore from "../store/useStore";
import Toast from "react-native-toast-message";

type Props = {
  article: Article;
};

const CommentInputField = ({ article }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<CommentData>();
  const user = useStore((state) => state.user);
  const onSubmit = async (data: CommentData) => {
    try {
      if (user) {
        const { error } = await supabase.from("comments").insert({
          user_id: user?.id,
          comment_text: data.text,
          created_at: new Date(),
          article_url: article.url,
        });
        reset();
        if (error) {
          console.log(error.message);
          return;
        }
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      return;
    }
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Please login or signup to post a comment",
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Controller
        control={control}
        name="text"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[mainStyles.normalFont, styles.input]}
            placeholderTextColor={Colors.lightGray}
            placeholder="Share your thoughts..."
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Pressable
        style={isValid ? styles.btn : [styles.btn, styles.disabledBtn]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text style={[mainStyles.normalFont, styles.btnText]}>Post</Text>
      </Pressable>
    </View>
  );
};
export default CommentInputField;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginLeft: 20,
  },
  input: {
    height: 40,
    width: "70%",
    marginVertical: 18,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 13,
  },
  btn: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -13 }],
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnText: {
    color: Colors.white,
  },
  disabledBtn: {
    backgroundColor: Colors.lightGray,
  },
});
