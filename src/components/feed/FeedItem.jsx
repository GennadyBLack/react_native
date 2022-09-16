import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Icon from "../base/Icon";
import MenuToggler from "../menu/MenuToggler";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { apiUrl } from "../../api";

// const AnimatedCover = Animated.createAnimatedComponent(Cover);
const AnimateImage = Animated.createAnimatedComponent(Image);

const { height, width } = Dimensions.get("window");

export default function FeedItem({ feed, onDelete, navigation }) {
  const [showComment, setShowComment] = useState(false);
  const scale = useSharedValue(1);
  const position = useSharedValue("relative");
  const zIndex = useSharedValue(10);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      console.log(event, "event");
      scale.value = event.scale;
      position.value = "absolute";
      zIndex.value = 10000;
    },
    onEnd: (event) => {
      scale.value = 1;
    },
  });

  const rCover = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      position: position.value,
      zIndex: zIndex.value,
    };
  });

  const menuList = [
    {
      permission: ["owner"],
      title: "delete",
      onPress: (e) => onDelete(feed.id, e),
      // icon:
      class: "test",
    },
    {
      permission: ["owner"],
      title: "edit",
      onPress: () => {
        try {
          navigation.navigate("feed_edit", { id: feed.id });
        } catch (error) {
          console.log(error);
        }
      },
      class: "test",
    },
  ];

  return (
    <View style={{ padding: 30, overflow: "visible" }}>
      {/*<Text>{JSON.stringify(feed)}</Text>*/}

      <View style={styles.card}>
        <View style={styles.item}>
          <Text>{feed?.title}</Text>
          <Text>{feed?.desc}</Text>
        </View>
        <PinchGestureHandler onGestureEvent={pinchHandler} style={{ flex: 1 }}>
          <AnimateImage
            style={[styles.image, rCover]}
            source={{
              uri: `${apiUrl}/files/${feed?.path || "placeholder.png"}`,
            }}
          />
        </PinchGestureHandler>
        {/*<Card.Cover source={{ uri: feed?.path }} /> Not allowed to load local resource // https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource*/}
        {showComment ? (
          <View>
            <TextInput placeholder="Оставьте свой комментарий"></TextInput>
            <Button title="Отправить" />
          </View>
        ) : null}
      </View>
      <Button
        onPress={setShowComment.bind(null, !showComment)}
        mode="contained"
        color="green"
        icon="card-text"
        style={{ zIndex: 1 }}
      />
      <MenuToggler
        anchor={
          // <Text>alo</Text>
          <Icon
            source={Icon?.sources?.base?.menuDot}
            style={{ height: 20, width: 20 }}
          />
        }
        items={menuList}
        style={styles.topMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: width - 60,
    height: height / 2.5,
  },
  item: {
    // width: "90%",
    // pointerEvents: "none",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  topMenu: {
    zIndex: 100,
    top: 100,
    backgroundColor: "blue",
    position: "absolute",
  },
  actions: {
    // display: "flex",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
