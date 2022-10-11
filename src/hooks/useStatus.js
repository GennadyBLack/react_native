import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFromStorage, setInStorage} from "../helpers/storage";

export function useAppState() {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);

  useEffect(() => {
    async function onChange(newState) {
      setAppState(newState);
    }
    const subscription = AppState.addEventListener("change", onChange);

    return () => {
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
