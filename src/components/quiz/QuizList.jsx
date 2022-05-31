import React, { useEffect } from "react";

import {
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "react-native-paper";

import quizItem from "./quizItem";

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
      <quizItem quiz={item} key={item.id} />
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
              data={quiz?.quizs}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <Button
              icon="camera"
              mode="contained"
              onPress={() => {
                navigation.navigate("upload");
              }}
            >
              UPLOAD
            </Button>
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
});
