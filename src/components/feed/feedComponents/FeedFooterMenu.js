import { Pressable, Text, View, StyleSheet, Share } from "react-native";
import React from "react";
import { getIcon } from "../../../helpers/iconHelper";

const FeedFooterMenu = ({ id, navigation }) => {
  const menu = [
    {
      title: "Like",
      onPress: () => {},
      icon: getIcon("hearto"),
    },
    {
      title: "Comments",
      onPress: () => {
        navigation.navigate("feed_current", { id });
      },
      icon: getIcon("message1"),
    },
    {
      title: "Share",
      onPress: () => {
        onShare();
      },
      icon: getIcon("forward"),
    },
  ];
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

  return (
    <View style={styles.feed_footer} nativeID={"FEED-FOOTER"}>
      {menu.map((item) => (
        <Pressable
          onPress={item.onPress}
          key={item.title}
          style={{ marginRight: 10 }}
        >
          {item.icon}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  feed_footer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});

export default FeedFooterMenu;
