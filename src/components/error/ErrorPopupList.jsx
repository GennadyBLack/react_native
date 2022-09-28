import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import ErrorPopup from "./ErrorPopup";
import useStore from "../../hooks/useStore";
import { StyleSheet, View, Text } from "react-native";

export default observer(ErrorPopupList);

function ErrorPopupList() {
  const root = useStore();

  const errors = root?.errors;

  useEffect(() => {}, [errors]);

  let remove = (index) => {
    root.removeError(index);
  };

  const mappedErrors = errors.length ? (
    <View style={styles.error_container} nativeID="error-id">
      {errors.map((item, index) => (
        <ErrorPopup
          key={index}
          text={item.message}
          onDelete={() => remove(index)}
        />
      ))}
    </View>
  ) : (
    <Text></Text>
  );

  return <View>{mappedErrors}</View>;
}

const styles = StyleSheet.create({
  error_container: {
    // flex: 1,
    width: 100,
    height: 100,
    position: "absolute",
    zIndex: 2,
    left: 10,
    bottom: 50,
  },
});
