import React, { useEffect } from "react";
import { View, Text, Button, Pressable, Image } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { apiUrl } from "../../api";
import { AntDesign } from "@expo/vector-icons";

export default observer(FeedCurrent);
import s from "../../helpers/styleHelper";
import ScrollPageComponent from "../base/ScrollPageComponent";
const dammy = [
  "test",
  "hi fried",
  "aloha maslo",
  "lorem aposum bro",
  "test",
  "hi fried",
  "aloha maslo",
  "lorem aposum bro",
  "test",
  "hi fried",
  "aloha maslo",
  "lorem aposum bro",
  "test",
  "hi fried",
  "aloha maslo",
  "lorem aposum bro",
];
function FeedCurrent({ route, navigation }) {
  const [feed] = useStore("feed");
  useEffect(() => {
    feed.get(route?.params?.id);
  }, []);

  return (
    <ScrollPageComponent
      header_menu={
        <View style={{ flexDirection: "row" }}>
          <AntDesign name="setting" size={24} color="black" />
          <AntDesign name="delete" size={24} color="black" />
          <AntDesign name="hearto" size={24} color="black" />
          <AntDesign name="heart" size={24} color="black" />
          <AntDesign name="message1" size={24} color="black" />
          <AntDesign name="staro" size={24} color="black" />
        </View>
      }
      header_image={
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{
            uri: `${apiUrl}/files/${
              feed?.currentFeed?.path || "placeholder.png"
            }`,
          }}
        />
      }
    >
      <Text style={s.title}>{feed?.currentFeed?.title ?? ""}</Text>
      <Text>{feed?.currentFeed?.desc ?? ""}</Text>
      {dammy.map((item, idx) => {
        return (
          <Text key={idx} style={{ padding: 40 }}>
            {item}
          </Text>
        );
      })}
      {/* <Pressable
        style={s.button}
        onPress={() =>
          navigation.navigate("feed_edit", { id: feed?.currentFeed?.id })
        }
      >
        <Text>Редактировать</Text>
      </Pressable> */}
    </ScrollPageComponent>
  );
}
