import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import Icon from "react-native-remix-icon";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const SearchBar = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Search", { searchInput: searchInput });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[mainStyles.normalFont, styles.input]}
          placeholder="Search articles you want"
          placeholderTextColor={Colors.lightGray}
          onChangeText={(text) => setSearchInput(text)}
        />
        <Icon
          name="search-line"
          color={Colors.lightGray}
          size={16}
          style={styles.icon}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },

  input: {
    height: 40,
    width: "85%",
    marginHorizontal: 20,
    marginVertical: 25,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 13,
  },
  icon: {
    position: "absolute",
    right: 55,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});
