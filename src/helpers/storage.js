import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const setToken = async (value) => {
  try {
    if (!value) return;
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    console.log(e, "token");
  }
};

export const setInStorage = async (key, value) => {
  try {
    if (!value) return;
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e, "item set in storage");
  }
};

export const getFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null || value !== "null") {
      return value;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const getToken = async () => {
  try {
    let value;
    if (Platform.OS === "web") {
      value = await AsyncStorage.getItem("token");
    } else {
      value = await SecureStore?.getItemAsync("token");
    }
    if (value !== null || value !== "null") {
      return value;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const removeToken = async () => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem("token");
    } else {
      await SecureStore?.deleteItemAsync("token");
    }
  } catch (e) {
    console.log(e, "token");
  }
};
