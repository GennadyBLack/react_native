// In App.js in a new project

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
      <Routes />
    </StoreContext.Provider>
  );
}

export default App;
