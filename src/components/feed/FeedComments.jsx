import React from "react";
import { Pressable, Text, View, ScrollView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Form from "../validation/Form";

const FeedComments = ({ comments, id }) => {
  const _renderComments = () => {
    return comments?.length > 0 ? (
      comments?.map((item, idx) => <CommentItem item={item} key={idx} />)
    ) : (
      <Text>No comments yet</Text>
    );
  };
  const submit = () => {};
  return (
    <Animated.ScrollView>
      {_renderComments()}
      <View>
        <Form onSubmit={submit}>
          <Form.Input
            multiline
            style={{ marginTop: 20 }}
            name="title"
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
              min: { value: 3, message: "Больше 3" },
            }}
          />
        </Form>
      </View>
    </Animated.ScrollView>
  );
};

const CommentItem = ({ item }) => {
  <View style={styles.comment_wrap}>
    <View style={styles.comment_author}></View>
    <View></View>
  </View>;
};

const styles = StyleSheet.create({
  comment_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  comment_author: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
  },
});
export default FeedComments;
