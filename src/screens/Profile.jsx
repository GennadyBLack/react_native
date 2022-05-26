import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";

export default observer(Profile);

function Profile() {
  let [auth] = useStore("auth");

  return (
    <View style={styles.cont}>
      <Text>Profile</Text>
      <Text>{auth?.user?.username}</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
      <Button mode="contained" onPress={() => auth?.logout()}>
        logout
      </Button>
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
