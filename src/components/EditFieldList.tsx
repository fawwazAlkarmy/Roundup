import React from "react";
import { View } from "react-native";
import { Control, Controller } from "react-hook-form";
import EditField from "../components/EditField";
import { ProfileField, profileData } from "../types";
import useStore from "../store/useStore";

type Props = {
  fields: ProfileField[];
  control: Control<profileData, any>;
};

const FieldList = ({ fields, control }: Props) => {
  const profile = useStore((state) => state.profile);
  const data: profileData = {
    name: profile?.username ?? "",
    email: profile?.email ?? "",
    bio: profile?.bio,
    facebookUrl: profile?.facebook_url,
    instagramUrl: profile?.instagram_url,
  };
  return (
    <View>
      {fields.map(({ name, label }: ProfileField) => (
        <Controller
          key={name}
          name={name}
          control={control}
          defaultValue={data[name]}
          render={({ field: { onChange, value } }) => (
            <EditField label={label} value={value} onChange={onChange} />
          )}
        />
      ))}
    </View>
  );
};

export default FieldList;
