import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../hooks/useStore";
import { TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";

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
    <View>
      <StatusBar style="dark" />
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
      <View>
        {supportBiometric && fingerprint ? (
          <TouchableOpacity onPress={handle}>
            <Text style={styles.button}>Go to home</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text>fingerprint not supported/ allocated</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {},
});
