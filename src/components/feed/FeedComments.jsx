import React, { useState } from "react";
import { Pressable, Text, View, ScrollView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import apis from "../../api/api";

import Form from "../validation/Form";

const FeedComments = ({ comments, id }) => {
  const addComment = async (e) => {
    await apis.feed.createComment(id, { title: e?.title });
  };

  const _renderComments = () => {
    return comments?.length > 0 ? (
      comments?.map((item, idx) => <CommentItem item={item} key={idx} />)
    ) : (
      <Text>No comments yet</Text>
    );
  };

  return (
    <Animated.ScrollView>
      {_renderComments()}
      <View>
        <Form onSubmit={addComment}>
          <Form.Input
            mode="outlined"
            multiline
            style={{ marginTop: 20 }}
            name="title"
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
            }}
          />
        </Form>
      </View>
    </Animated.ScrollView>
  );
};

const CommentItem = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.comment_wrap}>
      <View style={styles.comment_author}></View>
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={styles.author_name}>{item?.user?.username}</Text>
        <Text>{item?.title}</Text>
      </View>
    </View>
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
export default FeedComments;
