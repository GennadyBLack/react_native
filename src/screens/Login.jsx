import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Pressable,
} from "react-native";
import constants from "../helpers/style";
import s from "../helpers/styleHelper";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { TextInput } from "react-native-paper";
import Animated from "react-native-reanimated";
const { height, width } = Dimensions.get("window");
import useFingerPrint from "../hooks/useFingerPring";

export default observer(Login);

function Login({ navigation }) {
  let [auth] = useStore("auth");
  let [form, setForm] = useState({ password: "", email: "" });
  const [content] = useFingerPrint();

  const regisrer = () => {
    navigation.navigate("Register");
  };

  let setText = (e, field) => {
    setForm({ ...form, [field]: e });
  };

  let login = () => {
    auth.login(form);
  };
  return (
    <Animated.View style={[styles.login_wrapper]}>
      <StatusBar style="dark" />
      <Text style={styles.welcome}>Здравствуйте !</Text>
      <Animated.View style={[styles.login_content]}>
        <TextInput
          mode="outlined"
          label="Email"
          value={form?.email}
          onChangeText={(text) => setText(text, "email")}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          secureTextEntry
          mode="outlined"
          label="Password"
          type="password"
          value={form?.password}
          onChangeText={(text) => setText(text, "password")}
        />
        <Pressable
          onPress={() => login()}
          style={[s.button, { marginTop: 20 }]}
        >
          <Text style={[{ color: "white", fontSize: 15 }]}>Войти</Text>
        </Pressable>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Pressable
            onPress={() => {
              setForm({
                ...form,
                password: "tester",
                email: "tester@mail.ru",
              });
              setTimeout(() => login(), 200);
            }}
          >
            <Text style={{ color: constants.GREEN }}>Заполнить</Text>
          </Pressable>
          <TouchableOpacity onPress={regisrer}>
            <Text style={{ color: constants.GREEN }}>Еще нет аккаунта ?</Text>
          </TouchableOpacity>
        </View>
        {content}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  login_wrapper: {
    flex: 1,
    backgroundColor: "#66bfbf",
  },
  login_content: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    height: height / 1.2,
    backgroundColor: "#eee",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  // button: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 4,
  //   elevation: 3,
  //   color: "white",
  //   backgroundColor: "#66bfbf",
  //   borderRadius: 20,
  // },
  welcome: {
    paddingTop: height - height / 1.2,
    fontSize: 40,
    fontStyle: "normal",
    color: "white",
  },
});
