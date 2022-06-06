import React, { useState } from "react";
import { View, Text } from "react-native";

export default function Tabulator({
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

  console.log(tabs, "tabstabs");
  let setTab = (tabInx) => {
    tabs[tabInx] ? setCurrentTab(tabInx ? tabInx : currentTab + 1) : null;
  };

  return (
    <>
      <View className={customClass}>
        {Header && <Header />}
        {Content && tabs.length && (
          <Content data={tabs[currentTab]} next={setTab} />
        )}
        {Btns && <Btns />}
      </View>
    </>
  );
}
