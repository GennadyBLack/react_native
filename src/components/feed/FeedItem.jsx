import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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
  const scale = useSharedValue(2);
  const cardHeight = useSharedValue(height / 1.5);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      cardHeight.value = height * event.scale;
    },
    onEnd: (event) => {
      scale.value = withTiming(1);
      cardHeight.value = height / 1.5;
    },
  });

  const rCover = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const rCard = useAnimatedStyle(() => {
    return {
      height: cardHeight.value,
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
    <View style={{ padding: 30 }}>
      {/*<Text>{JSON.stringify(feed)}</Text>*/}

      <Animated.View style={[styles.card, rCard]}>
        <View style={styles.item}>
          <Text>{feed?.title}</Text>
          <Text>{feed?.desc}</Text>
        </View>

        <View
          style={{
            flex: 1,
            zIndex: 1000,
          }}
        >
          <PinchGestureHandler onGestureEvent={pinchHandler}>
            <AnimateImage
              style={[styles.image, rCover]}
              source={{
                uri: `${apiUrl}/files/${feed?.path || "placeholder.png"}`,
              }}
              resizeMode="cover"
            />
          </PinchGestureHandler>
        </View>

        {showComment ? (
          <View>
            <TextInput placeholder="Оставьте свой комментарий"></TextInput>
            <Button title="Отправить" />
          </View>
        ) : null}
        <TouchableOpacity
          nativeID="button"
          onPress={setShowComment.bind(null, !showComment)}
          style={styles.btn}
        >
          <Text>Жми</Text>
        </TouchableOpacity>
      </Animated.View>

      {/*<MenuToggler*/}
      {/*  anchor={*/}
      {/*    // <Text>alo</Text>*/}
      {/*    <Icon*/}
      {/*      source={Icon?.sources?.base?.menuDot}*/}
      {/*      style={{ height: 20, width: 20 }}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  items={menuList}*/}
      {/*  style={styles.topMenu}*/}
      {/*/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "blue",
    width: width - 60,
  },
  item: {
    // width: "90%",
    // pointerEvents: "none",
    // marginHorizontal: 10,
    // marginVertical: 10,
    padding: 15,
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
    flex: 1,
  },
  btn: {
    zIndex: 0,
    flex: 1,
    maxHeight: 40,
    backgroundColor: "green",
  },
});
