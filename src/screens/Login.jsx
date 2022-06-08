import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { TextInput } from "react-native-paper";

export default observer(Login);

function Login({ navigation }) {
  let [auth] = useStore("auth");
  let [form, setForm] = useState({ password: "", email: "" });

  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let login = () => {
    auth.login(form);
  };
  return (
    <View>
      <Text>Login {auth?.user?.id}</Text>
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
      <Button title="login" onPress={() => login()} color="#841584" />
      <Button
        title="reset"
        onPress={() => navigation.navigate("Profile")}
        color="#841584"
      />
      <Button
        title="CREDS"
        onPress={() => {
          setForm({
            ...form,
            password: "tester",
            email: "tester@mail.ru",
          });
          setTimeout(() => login(), 200);
        }}
        color="#76b5c5"
      />
    </View>
  );
}
