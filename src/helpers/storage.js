import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (value) => {
  try {
    if (!value) return;
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    console.log(e, "token");
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
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
