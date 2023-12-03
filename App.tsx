import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Colors } from "./src/colors";
import * as SplashScreen from "expo-splash-screen";
import StackNavigator from "./src/navigation/StackNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { supabase } from "./src/services/supabase";
import useStore from "./src/store/useStore";

const queryClient = new QueryClient();

export default function App() {
  // loading fonts
  const [fontsLoaded, fontError] = useFonts({
    Lora: require("./assets/fonts/Lora-Regular.ttf"),
    LoraBold: require("./assets/fonts/Lora-BoldItalic.ttf"),
    Orbitron: require("./assets/fonts/Orbitron.ttf"),
  });

  const user = useStore((state) => state.user);
  const getUserProfile = useStore((state) => state.getUserProfile);
  const profile = useStore((state) => state.profile);
  const setSession = useStore((state) => state.setSession);
  const setUser = useStore((state) => state.setUser);
  const setInitialized = useStore((state) => state.setInitialized);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    onLayoutRootView();
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [onLayoutRootView]);

  const userId = user?.id || "";

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, profile]);

  if (!fontsLoaded || fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
}

export const mainStyles = StyleSheet.create({
  normalFont: {
    fontFamily: "Lora",
    fontSize: 14,
    color: Colors.primary,
  },
  boldFont: {
    fontFamily: "LoraBold",
    color: Colors.primary,
  },
});
