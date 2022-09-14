import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { observer } from "mobx-react-lite";

export default observer(QuestionItemList);

function QuestionItemList({ edit, index, question, onDelete }) {
  return (
    <>
      <View style={styles.question_list__item}>
        <Text>
          {index}.{question?.title}
        </Text>
        {edit ? (
          <Button
            style={styles.fab}
            small
            mode="contained"
            title="-"
            onPress={() => onDelete()}
          ></Button>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  question_list__item: {
    padding: 20,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  fab: { width: 5 },
});
