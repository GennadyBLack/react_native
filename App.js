// In App.js in a new project

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// import "./src/styles/main.css";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import Routes from "./src/components/Routes";
import store from "./src/store/index";
import StoreContext from "./src/contexts/store";
const rootStore = new store();

const initialApp = async () => {
  await new Promise((resolve) => {
    let res = rootStore.auth.fetchMe();
    resolve(res, "SuperRes");
  });
};

function App() {
  let [isReady, setReady] = useState(false);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    mode: "adaptive",
    colors: {
      ...DefaultTheme.colors,
      primary: "#3498db",
      accent: "#f1c40f",
    },
  };

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
    <StoreContext.Provider value={rootStore}>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </StoreContext.Provider>
  );
}

export default App;
