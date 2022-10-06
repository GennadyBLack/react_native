import React, { useEffect } from "react";
import { View, Text, Button, Pressable, Image } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { apiUrl } from "../../api";
import { AntDesign } from "@expo/vector-icons";
import FeedComments from "./FeedComments";

export default observer(FeedCurrent);
import s from "../../helpers/styleHelper";
import ScrollPageComponent from "../base/ScrollPageComponent";
import Toggler from "../menu/Toggler";
import { getIcon } from "../../helpers/iconHelper";

function FeedCurrent({ route, navigation }) {
  const [feed] = useStore("feed");
  useEffect(() => {
    feed.get(route?.params?.id, { include: "comments" });
  }, []);

  return (
    <ScrollPageComponent
      footer_menu={
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 40,
            justifyContent: "flex-start",
          }}
        >
          <Toggler anchor={getIcon("message1")} useToggle>
            <FeedComments
              id={route?.params?.id}
              comments={feed?.currentFeed?.comments}
            />
          </Toggler>
          {/* <Pressable onPress={() => alert("hi")}>{getIcon("heart")}</Pressable>

          <Pressable onPress={() => alert("hi")}>{getIcon("staro")}</Pressable> */}
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
      {/* {dammy.map((item, idx) => {
        return (
          <Text key={idx} style={{ padding: 40 }}>
            {item}
          </Text>
        );
      })} */}
    </ScrollPageComponent>
  );
}
