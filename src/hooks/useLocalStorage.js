import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default (key, initialValue = "") => {
  const [value, setValue] = useState(() => {
    return AsyncStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    AsyncStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
