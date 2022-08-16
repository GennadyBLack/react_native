import React, { useState } from "react";
import { View, Text } from "react-native";
import { isFunction } from "../helpers/utils";

export default function Tabulator({
  lastFunction,
  onClose,
  initialTab,
  tabs,
  Header,
  Btns,
  Content,
  customClass = "",
}) {
  let [currentTab, setCurrentTab] = useState(() => {
    return initialTab ? initialTab : 0;
  });

  let setTab = (tabInx) => {
    if (currentTab == tabs?.length - 1) {
      isFunction(lastFunction());
      return;
    }

    if (tabInx && tabs[tabInx]) {
      setCurrentTab(tabInx);
    } else {
      tabs[currentTab + 1] ? setCurrentTab(currentTab + 1) : null;
    }
  };

  return (
    <>
      <View className={customClass}>
        {Header && tabs?.length && <Header data={tabs[currentTab]} />}
        {Content && tabs?.length && (
          <Content data={tabs[currentTab]} next={setTab} />
        )}
        {Btns && <Btns />}
      </View>
    </>
  );
}
