import { StyleSheet, Text, View, Image, Alert } from "react-native";
import useStore from "../store/useStore";
import { Colors } from "../colors";
import Icon from "react-native-remix-icon";
import { mainStyles } from "../../App";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { FileObject } from "@supabase/storage-js";
import { supabase } from "../services/supabase";
import { useEffect, useState } from "react";

const Avatar = () => {
  const profile = useStore((state) => state.profile);
  const user = useStore((state) => state.user);
  const [files, setFiles] = useState<FileObject[]>([]);
  const image = useStore((state) => state.image);
  const setImage = useStore((state) => state.setImage);

  useEffect(() => {
    if (!user) return;

    loadImage();
  }, [user]);

  const loadImage = async () => {
    const { data } = await supabase.storage.from("avatars").list(user!.id);
    if (data) {
      setFiles(data);
    }
  };

  const onSelectImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled
    if (!result.canceled) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `${user!.id}/${new Date().getTime()}.${
        img.type === "image" ? "png" : "mp4"
      }`;
      const contentType = img.type === "image" ? "image/png" : "video/mp4";
      await supabase.storage
        .from("avatars")
        .upload(filePath, decode(base64), { contentType });
      loadImage();
    }
  };

  const item = files.length > 0 ? files[0] : null;

  if (item) {
    supabase.storage
      .from("avatars")
      .download(`${user?.id}/${item.name}`)
      .then(({ data }) => {
        if (data instanceof Blob) {
          const fr = new FileReader();
          fr.readAsDataURL(data);
          fr.onload = () => {
            setImage(fr.result as string);
          };
        } else {
          console.error("Data received is not of type Blob");
        }
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  }

  return (
    <View style={styles.imgContainer}>
      {!image ? (
        <View style={styles.defaultImage}>
          <Text style={[mainStyles.boldFont, styles.defaultText]}>
            {profile?.username[0]}
          </Text>
        </View>
      ) : (
        <Image style={styles.img} source={{ uri: image }} />
      )}

      <Icon
        style={styles.icon}
        name="edit-circle-fill"
        size={22}
        color={Colors.primary}
        onPress={onSelectImage}
      />
    </View>
  );
};
export default Avatar;
const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 100,
  },
  defaultImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.secondary,
  },
  defaultText: {
    color: Colors.white,
    fontSize: 32,
    textAlign: "center",
    lineHeight: 70,
  },
});
