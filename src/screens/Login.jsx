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
import s from "../helpers/stylehelper";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import Animated from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

export default observer(Login);

function Login({ navigation }) {
  const [supportBiometric, setSupportBiometric] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  let [auth] = useStore("auth");
  let [form, setForm] = useState({ password: "", email: "" });

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setSupportBiometric(compatible);
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
        setFingerprint(true);
      }
    })();
  }, []);

  const regisrer = () => {
    navigation.navigate("Register");
  };
  const handle = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
      });
      if (biometricAuth.success) {
        navigation.replace("Home");
      }
    } catch (error) {
      console.log(error);
    }
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
      <Text style={styles.welcome}>Welome !</Text>
      <Animated.View style={[styles.login_content]}>
        <TextInput
          label="Email"
          value={form?.email}
          onChangeText={(text) => setText(text, "email")}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Password"
          type="password"
          value={form?.password}
          onChangeText={(text) => setText(text, "password")}
        />
        <Pressable
          onPress={() => login()}
          style={[s.button, { marginTop: 20 }]}
        >
          <Text style={[{ color: "white", fontSize: 15 }]}>Sign In</Text>
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
            <Text style={s.c_green}>Fill</Text>
          </Pressable>
          <TouchableOpacity onPress={regisrer}>
            <Text style={[s.c_green]}>Don`t have an account ?</Text>
          </TouchableOpacity>
        </View>

        <View>
          {supportBiometric && fingerprint ? (
            <TouchableOpacity onPress={handle}>
              <Text style={s.button}>Go to home</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text></Text>
            </View>
          )}
        </View>
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
