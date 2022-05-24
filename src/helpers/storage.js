import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (value) => {
  try {
    console.log(value, "value token");
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    console.log(e, "token");
  }
};

export const getToken = () => {
  try {
    const value = AsyncStorage.getItem("token");
    if (value !== null) {
      console.log("get token", value);
      return value;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};
