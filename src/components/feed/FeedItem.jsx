import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, Share, Image } from "react-native";
import Animated from "react-native-reanimated";
import { apiUrl } from "../../api";

const FeedItem = ({ feed, navigation }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
        url: "google.com",
        title: "see on my nutc",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const feed_footer_menu = () => {
    const menu = [
      { title: "Like", onPress: () => {}, icon: "" },
      {
        title: "Comments",
        onPress: () => {
          navigation.navigate("feed_current", { id: feed?.id });
        },
        icon: "",
      },
      {
        title: "Share",
        onPress: () => {
          onShare();
        },
        icon: "",
      },
    ];
    return menu.map((item) => {
      return (
        <Pressable onPress={item.onPress} key={item.title}>
          <View>
            <Text>{item.title}</Text>
          </View>
        </Pressable>
      );
    });
  };
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
          <Text>:::</Text>
        </View>
      </View>
      {/* header end */}
      {/* title */}
      <View style={styles.feed_title}>
        <Text>{feed?.title}</Text>
      </View>
      {/* title */}
      {/* image */}
      <Pressable
        style={styles.feed_image}
        onPress={() => {
          navigation.navigate("feed_current", { id: feed?.id });
        }}
      >
        <Image
          style={{ flex: 1 }}
          source={{ uri: `${apiUrl}/files/${feed?.path || "placeholder.png"}` }}
        ></Image>
      </Pressable>
      {/* image */}
      {/* footer */}
      <View style={styles.feed_footer}>{feed_footer_menu()}</View>
      {/* footer */}
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
    height: 350,
    zIndex: 999,
    marginBottom: 10,
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
  feed_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
