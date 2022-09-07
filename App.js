import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import Routes from "./src/components/Routes";
import store from "./src/store/index";
import StoreContext from "./src/contexts/store";
const rootStore = new store();
import ErrorPopupList from "./src/components/error/ErrorPopupList";
import ModalWrapper from "./src/components/base/ModalWrapper";
import "react-native-gesture-handler";
import { PortalProvider } from "./src/components/base/PortalNative";
import BottomSheet from "./src/components/base/BottomSheet";

const initialApp = async () => {
  await new Promise((resolve) => {
    let res = rootStore.auth.fetchMe();
    resolve(res, "SuperRes");
  });
};

function App() {
  let [isReady, setReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={initialApp}
        onFinish={() => setReady({ isReady: true })}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.app_wrapper}>
      <StoreContext.Provider value={rootStore}>
        <PortalProvider>
          <ModalWrapper>
            <ErrorPopupList className="errors" />
            <Routes />
          </ModalWrapper>
        </PortalProvider>
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
