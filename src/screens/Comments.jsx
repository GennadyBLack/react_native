import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import apis from "../api/api";
import Form from "../components/validation/Form";
import { getIcon } from "../helpers/iconHelper";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import ProfileImg from "../components/profile/ProfileImg";

const Comments = () => {
  const [comments] = useStore("comments");
  const route = useRoute();
  const [text, setText] = useState("");
  const getComments = async () => {
    await comments.getByFeedId(route?.params?.id);
  };
  useEffect(() => {
    getComments();
    console.log(comments.comments, "comments");
  }, []);

  const addComment = async () => {
    if (text === "" || text === " " || text === undefined) return;
    await apis.feed.createComment(route?.params?.id, { title: text });
    setText("");
    await getComments();
  };

  const template = (item, key) => {
    return (
      <View style={styles.comment_wrap} key={key}>
        <View style={styles.comment_author}>
          <ProfileImg width={40} path={item?.user?.avatar} />
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "stretch",
            flex: 1,
          }}
        >
          <Text style={styles.author_name}>{item?.user?.username}</Text>
          <Text>{item?.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {comments?.comments?.length &&
          comments?.comments.map((item, idx) => {
            return template(item, idx);
          })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <TextInput
          multiline
          style={{
            borderColor: "black",
            // borderWidth: 1,
            borderBottomWidth: 1,
            height: 40,
            width: "70vh",
          }}
          value={text}
          onChangeText={(e) => {
            setText(e);
          }}
          //   onKeyPress={(e) => {
          //     e.key === "Enter" ? addComment() : null;
          //   }}
        />
        <Pressable onPress={addComment} style={{ marginHorizontal: 10 }}>
          <Text>{getIcon("send", "black", 27)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  comment_wrap: {
    borderRadius: 5,
    padding: 10,
    alignItems: "stretch",
    flexShrink: 0,
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
    minHeight: 60,
  },

  comment_author: {
    marginRight: 20,
    borderRadius: 20,
  },
  author_name: {
    fontSize: 20,
  },
});

export default observer(Comments);
