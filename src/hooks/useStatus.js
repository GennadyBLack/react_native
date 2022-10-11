import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAppState() {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);

  useEffect(() => {
    function onChange(newState) {
      AsyncStorage.setItem("appState", "active");
      setAppState(newState);
    }

    const subscription = AppState.addEventListener("change", onChange);

    return () => {
      AsyncStorage.setItem("appState", "closed");
      if (typeof subscription?.remove === "function") {
        subscription.remove();
      } else {
        // React Native < 0.65
        AppState.removeEventListener("change", onChange);
      }
    };
  }, []);

  return appState;
}

export { AppStateStatus };
