import React from "react";
import { View } from "react-native";
import { Control, Controller } from "react-hook-form";
import EditField from "../components/EditField";
import { ProfileField, profileData } from "../types";

type Props = {
  fields: ProfileField[];
  control: Control<profileData, any>;
};

const FieldList = ({ fields, control }: Props) => {
  return (
    <View>
      {fields.map(({ name, label }: ProfileField) => (
        <Controller
          key={name}
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <EditField label={label} value={value} onChange={onChange} />
          )}
        />
      ))}
    </View>
  );
};

export default FieldList;
