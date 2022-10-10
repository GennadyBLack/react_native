import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

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

export const getToken = async () => {
  try {
    // const value = await AsyncStorage.getItem("token");
    const value = await SecureStore?.getItemAsync("token");
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
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log(e, "token");
  }
};
