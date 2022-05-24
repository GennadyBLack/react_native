import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";

export default observer(Login);

function Login({ navigation }) {
  let [auth] = useStore("auth");
  console.log(navigation, "navigation");
  let login = () => {
    auth.login({ username: 79000000000, password: "tester" });
  };
  return (
    <View>
      <Text>Login{auth?.user?.id}</Text>
      <Button title="login" onPress={() => login()} color="#841584" />
      <Button
        title="reset"
        onPress={() => navigation.navigate("Profile")}
        color="#841584"
      />
    </View>
  );
}
