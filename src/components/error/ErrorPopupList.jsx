import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import ErrorPopup from "./ErrorPopup";
import useStore from "../../hooks/useStore";
import { StyleSheet, View } from "react-native";

export default observer(ErrorPopupList);

function ErrorPopupList() {
  const root = useStore();
  useEffect(() => {}, [root.errors, mappedErrors]);

  const mappedErrors = root?.errors.length
    ? root?.errors.map((item, index) => (
        <ErrorPopup key={index} text={item.message} />
      ))
    : null;

  return <View style={styles.error_container}>{mappedErrors}</View>;
}

const styles = StyleSheet.create({
  error_container: {
    position: "absolute",
    zIndex: 2,
  },
});
