import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const FeedItem = ({ feed, navigation }) => {
  const feed_footer_menu = () => {
    const menu = [
      { title: "Like", onPress: () => {}, icon: "" },
      { title: "Comments", onPress: () => {}, icon: "" },
      { title: "Share", onPress: () => {}, icon: "" },
    ];
    return menu.map((item) => {
      return (
        <Pressable onPress={item.onPress}>
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
            <View style={styles.author_name}>Aydar</View>
            <View style={styles.feed_created_at}>12.02.2022</View>
          </View>
        </View>
        <View style={styles.header_menu}>:::</View>
      </View>
      {/* header end */}
      {/* title */}
      <View style={styles.feed_title}>{feed?.title}</View>
      {/* title */}
      {/* image */}
      <View style={styles.feed_image}>
        {/* image */}
        {/* footer */}
      </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 10,
    borderRadius: 10,
    height: 350,
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
    backgroundColor: "grey",
    height: 200,
  },
  feed_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
