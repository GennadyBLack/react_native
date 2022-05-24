import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";

export default observer(Profile);

function Profile() {
  let [auth] = useStore("auth");

  return (
    <View style={styles.cont}>
      <Text>Profile</Text>
      <Text>{auth.user.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: "column",
    width: "40%",
    margin: "auto",
  },
  btn: {
    backgroundColor: "red",
  },
});
