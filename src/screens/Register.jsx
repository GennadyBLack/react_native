import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { TextInput } from "react-native-paper";

export default observer(Register);

function Register({ navigation }) {
  let [auth] = useStore("auth");

  let [form, setForm] = useState({ username: "", password: "", email: "" });

  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let register = () => {
    auth.register(form);
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput
        label="Name"
        value={form?.username}
        onChangeText={(text) => setText(text, "username")}
      />
      <TextInput
        label="Email"
        value={form?.email}
        onChangeText={(text) => setText(text, "email")}
      />
      <TextInput
        label="Password"
        type="password"
        value={form?.password}
        onChangeText={(text) => setText(text, "password")}
      />
      <Button title="register" onPress={() => register()} color="#841584" />
      <Button
        title="reset"
        onPress={() => navigation.navigate("Profile")}
        color="#841584"
      />
    </View>
  );
}
