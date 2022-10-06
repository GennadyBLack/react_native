import React, { useEffect } from "react";

import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import FeedItem from "./FeedItem";
import useStore from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

import GridTest from "../grid/GridTest/GridTest";

const FeedMain = ({ navigation }) => {
  const [feed] = useStore("feed");

  const getAllFeed = async (search) => {
    const params = search
      ? { params: { filter: { title: { iLike: `%${search}%` } } } }
      : {};
    await feed.getAll(params);
  };
  useEffect(() => {
    getAllFeed();
  }, []);

  const deletePost = async (id) => {
    await feed.delete(id);
    await feed.getAll();
  };

  const renderItem = (item) => (
    <FeedItem
      feed={item}
      key={item.id}
      onDelete={deletePost}
      navigation={navigation}
    />
  );
  const inputProps = {
    mode: "outlined",
    style: { height: 40, marginBottom: 20 },
  };
  const wrap_style = { paddingHorizontal: 10 };
  return (
    <GridTest
      wrap_style={wrap_style}
      data={feed?.feeds}
      template={renderItem}
      onChange={getAllFeed}
      inputProps={inputProps}
    ></GridTest>
  );
};

export default observer(FeedMain);
