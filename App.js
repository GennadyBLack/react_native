import { StyleSheet, Text, View, StatusBar } from "react-native";
import {} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getToken } from "./src/helpers/storage";

// import AppLoading from "expo-app-loading";
import * as Network from "expo-network";
import Routes from "./src/components/Routes";
import store from "./src/store/index";
import StoreContext from "./src/contexts/store";
const rootStore = new store();
import ErrorPopupList from "./src/components/error/ErrorPopupList";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { io } from "socket.io-client";
import { baseURL } from "./src/api";

SplashScreen.preventAutoHideAsync();
function App() {
  let [isReady, setReady] = useState(false);

  useEffect(() => {
    const initialApp = async () => {
      try {
        await Network.getNetworkStateAsync().then((res) => {
          rootStore.setInternetConnection(res.isInternetReachable);
          rootStore.setError({
            message: "Отсутствует подключение к интернету дружочек",
          });
        });
        await new Promise((resolve) => {
          let res = rootStore.auth.fetchMe();
          resolve(res, "SuperRes");
        });
        const iniOptions = {
          reconnection: true,
          auth: {
            token: await getToken(),
          },
        };

        const socket = io(baseURL, iniOptions);
        console.log("iniOptions", socket);
        socket.emit("ping");
        socket.on("ping", () => {
          console.log("ping");
        });
        socket.on("pong", () => {
          console.log("pong");
        });
        socket.on("connection", () => {
          console.log("socket was connected succesfull");
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
        <ErrorPopupList className="errors" />
        <Routes />
      </StoreContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  app_wrapper: {
    marginTop: StatusBar.currentHeight,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default App;
