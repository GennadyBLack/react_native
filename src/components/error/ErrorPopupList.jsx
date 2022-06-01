import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import ErrorPopup from "./ErrorPopup";
import useStore from "../../hooks/useStore";
import { StyleSheet, View } from "react-native";

export default observer(ErrorPopupList);

function ErrorPopupList() {
  const root = useStore();

  const errors = root?.errors;

  useEffect(() => {
    console.log(errors, "ALOOOO");
  }, [errors]);

  let remove = (index) => {
    root.removeError(index);
  };

  const mappedErrors = errors.length ? (
    <View style={styles.error_container}>
      {errors.map((item, index) => (
        <ErrorPopup
          key={index}
          text={item.message}
          onDelete={() => remove(index)}
        />
      ))}
    </View>
  ) : null;

  return <>{mappedErrors}</>;
}

const styles = StyleSheet.create({
  error_container: {
    position: "absolute",
    zIndex: 2,
    bottom: 50,
  },
});
