import Toast from "react-native-toast-message";
import { supabase } from "../services/supabase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type UseSignupProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

const useSignup = ({ navigation }: UseSignupProps) => {
  const signupWithEmail = async (
    email: string,
    password: string,
    name: string | undefined
  ) => {
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: name,
        },
      },
    });

    if (authError) {
      Toast.show({
        type: "error",
        text1: `${authError.message} 😕 `,
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "User Created Successfully! 🎉",
        position: "top",
        topOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    }
  };

  return { signupWithEmail };
};

export default useSignup;
