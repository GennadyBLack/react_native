import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MenuToggler from "../menu/MenuToggler";
import { Entypo } from "@expo/vector-icons";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { apiUrl } from "../../api";
import FeedFooterMenu from "./feedComponents/FeedFooterMenu";

const AnimateImage = Animated.createAnimatedComponent(Image);
const { height, width } = Dimensions.get("window");
const SIZE = width;

const FeedItem = ({ feed, onDelete, navigation }) => {
  const menuList = [
    {
      permission: ["owner"],
      title: "Delete",
      onPress: (e) => onDelete(feed.id, e),
    },
    {
      permission: ["owner"],
      title: "Edit",
      onPress: () => {
        try {
          navigation.navigate("feed_edit", { id: feed.id });
        } catch (error) {
          console.log(error);
        }
      },
    },
  ];

  const scale = useSharedValue(1);
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

  return feed ? (
    <Animated.View style={styles.feed_wrapper}>
      {/* header */}
      <View style={styles.feed_header}>
        <View style={styles.header_info}>
          <View style={styles.author_img}></View>
          <View style={{ marginLeft: 10 }}>
            <View style={styles.author_name}>
              <Text>Aydar</Text>
            </View>
            <View style={styles.feed_created_at}>
              <Text>12.02.2022</Text>
            </View>
          </View>
        </View>
        <View style={styles.header_menu}>
          <MenuToggler
            items={menuList}
            anchor={
              <Entypo name="dots-three-vertical" size={18} color="black" />
            }
          ></MenuToggler>
        </View>
      </View>
      {/* header end */}
      {/* title */}
      <View style={styles.feed_title}>
        <Text>{feed?.title}</Text>
      </View>
      {/* title */}
      {/* image */}

      {/* image */}
      {/*<View style={styles.feed_image}>*/}
      {/*  /!* image *!/*/}
      {/*  /!* footer *!/*/}

      {/*</View>*/}
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={{ flex: 1, zIndex: 1000 }}>
          <AnimateImage
            style={[styles.image, rCover]}
            source={{
              uri: `${apiUrl}/files/${feed?.path || "placeholder.png"}`,
            }}
          />
        </Animated.View>
      </PinchGestureHandler>

      <FeedFooterMenu id={feed?.id} navigation={navigation} />
    </Animated.View>
  ) : (
    <Text>no data</Text>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  feed_wrapper: {
    padding: 5,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 10,
    borderRadius: 10,
    height: SIZE * 1.3,
    marginBottom: 10,
    backgroundColor: "white",
  },
  header_info: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feed_header: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 70,
    zIndex: 1,
  },
  author_img: {
    margin: 7,
    height: 55,
    width: 55,
    borderRadius: 27,
    backgroundColor: "grey",
  },
  header_menu: {
    justifyContent: "center",
    fontSize: 20,
    alignItems: "center",
    padding: 10,
    color: "black",
  },
  author_name: {
    color: "black",
    fontSize: 20,
  },
  feed_created_at: {
    color: "grey",
    fontSize: 14,
  },
  feed_title: {
    color: "black",
  },
  feed_image: {
    // backgroundColor: feed?.path ? "" : "#b7b5b5",
    height: 200,
  },

  image: {
    // ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
