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
        <View style={styles.comment_author}></View>
        <View style={{ justifyContent: "flex-start" }}>
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
            console.log(item, "ITEM");
            return template(item, idx);
          })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TextInput
          multiline
          style={{
            borderColor: "black",
            borderWidth: 1,
            height: 40,
            width: "70vh",
          }}
          value={text}
          onChangeText={(e) => {
            setText(e);
          }}
        />
        <Pressable onPress={addComment}>
          <Text>{getIcon("send")}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  comment_wrap: {
    borderRadius: 5,
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
    minHeight: 60,
    // justifyContent: "space-between",
  },

  comment_author: {
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: "grey",
  },
  author_name: {
    fontSize: 20,
  },
});

export default observer(Comments);
