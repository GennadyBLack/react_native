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

  let setTab = (tabInx) => {
    if (tabInx && tabs[tabInx]) {
      setCurrentTab(tabInx);
    } else {
      tabs[currentTab + 1] ? setCurrentTab(currentTab + 1) : null;
    }
  };

  return (
    <>
      <View className={customClass}>
        {/* {Header && <Header data={tabs[currentTab]} />} */}
        {Content && tabs.length && (
          <Content data={tabs[currentTab]} next={setTab} />
        )}
        {/* {Btns && <Btns />} */}
      </View>
    </>
  );
}
