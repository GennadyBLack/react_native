import React, { useEffect } from "react";

import {
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Button, FAB } from "react-native-paper";

import QuizItem from "./QuizItem";
import GridList from "../grid/GridList";
import useStore from "../../hooks/useStore";
// import Spiner from "../Spiner";

import { observer } from "mobx-react-lite";

export default observer(QuizList);

const Item = ({ entry }) => (
  <View>
    <Text>{entry?.title}</Text>
    <Text>{entry?.desc}</Text>
  </View>
);

function QuizList({ navigation }) {
  const [quiz] = useStore("quiz");
  const [auth] = useStore("auth");
  const user = auth?.user?.user;

  const startQuiz = async (id) => {
    //create Result in db
    await quiz.start(id);
    //redirect to firs question
    await navigation.navigate("quiz_start", { id: id });
  };

  useEffect(() => {
    quiz.getAll();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        startQuiz(item.id);
      }}
      onLongPress={() => {
        // if(user && user.id === item.user.id)
        navigation.navigate("quiz_edit", { id: item.id });
      }}
    >
      <QuizItem key={item.id} entry={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrap}>
      {/*<GridList*/}
      {/*  data={options}*/}
      {/*  ItemComponent={QuizItem}*/}
      {/*  onSave={setOptions.bind(null, [*/}
      {/*    { id: 3, title: "hehe", desc: "sasai" },*/}
      {/*    { id: 4, title: "ohohoh", desc: "kudasai" },*/}
      {/*  ])}*/}
      {/*/>*/}
      <>
        {quiz?.loading ? null : (
          <>
            <Text>quiz Main </Text>
            <Button
              title="Create"
              onPress={() => {
                navigation.navigate("quiz_create");
              }}
            ></Button>
            <FlatList
              data={quiz?.quiz_list}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <FAB
              style={styles.fab}
              small
              icon="plus"
              onPress={() => navigation.navigate("quiz_create")}
            />
          </>
        )}
      </>
    </View>
  );
}
//TODO:поправить скролл
const styles = StyleSheet.create({
  wrap: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
    height: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 130,
  },
});
