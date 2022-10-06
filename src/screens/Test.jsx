import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import ModalSheet from "../components/base/ModalSheet";
import GridSearchComponent from "../components/grid/GridSearchComiponent";
import GridTest from "../components/grid/GridTest/GridTest";
import ChatMain from "../components/chat/ChatMain";
import FeedItem from "../components/feed/FeedItem";
function Test({ navigation }) {
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
  const inputProps = { style: { height: 40, marginBottom: 20 } };
  return (
    <GridTest
      data={feed?.feeds}
      template={renderItem}
      onChange={getAllFeed}
      inputProps={inputProps}
    />
  );
}
export default observer(Test);
