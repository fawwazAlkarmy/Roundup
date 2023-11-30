import { StyleSheet, Text, TextInput, View } from "react-native";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { mainStyles } from "../../App";
import { Colors } from "../colors";

type Props = {
  label: string;
  onChange: ControllerRenderProps<FieldValues, string>["onChange"];
  value: ControllerRenderProps<FieldValues, string>["value"];
};

const EditField = ({ label, onChange, value }: Props) => {
  return (
    <View>
      <Text style={[mainStyles.boldFont, styles.label]}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        value={value}
        style={[mainStyles.normalFont, styles.input]}
        placeholderTextColor={Colors.lightGray}
      />
    </View>
  );
};
export default EditField;
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    marginVertical: 12,
    borderRadius: 10,
    borderColor: Colors.secondary,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    letterSpacing: 1,
  },
});
