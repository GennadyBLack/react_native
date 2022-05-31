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

import useStore from "../../hooks/useStore";
// import Spiner from "../Spiner";

import { observer } from "mobx-react-lite";

export default observer(QuizList);

function QuizList({ navigation }) {
  const [quiz] = useStore("quiz");

  useEffect(() => {
    quiz.getAll();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => navigation.navigate("quiz_edit", { id: item.id })}
    >
      <QuizItem key={item.id} quiz={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrap}>
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
