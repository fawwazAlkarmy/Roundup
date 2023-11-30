import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-remix-icon";
import { Colors } from "../colors";
import { mainStyles } from "../../App";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  text: string;
  icon: string;
  isPassword: boolean;
  onChange: ControllerRenderProps<FieldValues, string>["onChange"];
  value: ControllerRenderProps<FieldValues, string>["value"];
  onBlur: ControllerRenderProps<FieldValues, string>["onBlur"];
};

const InputField = ({
  text,
  icon,
  onChange,
  onBlur,
  value,
  isPassword,
}: Props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        secureTextEntry={isPassword}
        placeholder={text}
        style={[mainStyles.normalFont, styles.input]}
        placeholderTextColor={Colors.lightGray}
      />
      <Icon name={icon} size={20} color={Colors.primary} style={styles.icon} />
    </View>
  );
};
export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  input: {
    height: 40,
    width: "95%",
    marginVertical: 18,
    borderRadius: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 13,
    paddingLeft: 50,
  },
  icon: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});
