import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
// import AppLoading from "expo-app-loading";
import Routes from "./src/components/Routes";
import store from "./src/store/index";
import StoreContext from "./src/contexts/store";
const rootStore = new store();
import ErrorPopupList from "./src/components/error/ErrorPopupList";
import ModalWrapper from "./src/components/base/ModalWrapper";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
function App() {
  let [isReady, setReady] = useState(false);

  useEffect(() => {
    const initialApp = async () => {
      try {
        await new Promise((resolve) => {
          let res = rootStore.auth.fetchMe();
          resolve(res, "SuperRes");
        });
      } catch (e) {
        console.error(e);
      } finally {
        // Tell the application to render
        setReady(true);
      }
    };
    initialApp();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      console.log("Ready");
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <View style={styles.app_wrapper} onLayout={onLayoutRootView}>
      <StoreContext.Provider value={rootStore}>
        <ModalWrapper>
          <ErrorPopupList className="errors" />
          <Routes />
        </ModalWrapper>
      </StoreContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  app_wrapper: {
    width: "100%",
    height: "100%",
    // position: "relative",
  },
});

export default App;
