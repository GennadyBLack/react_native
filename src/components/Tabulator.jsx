import React, { useState } from "react";
import { View, Text } from "react-native";

export default function Tabulator({ initialTab, tabs, Header, btns }) {
  let [currentTab, setCurrentTab] = useState(() => {
    return initialTab ? initialTab : 0;
  });

  let setTab = (tabInx) => {
    tabs[tabInx] ? setCurrentTab(tabInx) : null;
  };
  return (
    <>
      <View>
        {Header && <Header />}
        {/* {tabs[currentTab]}
        {btns && <btns />} */}
        <Text>asd</Text>
      </View>
    </>
  );
}
