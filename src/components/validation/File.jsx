import React from "react";
import { Text } from "react-native-paper";
import Upload from "./Upload";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

export default function File({ name, label, control, rules, ...rest }) {
  return (
    <Controller
      render={({ field: { value, onChange }, fieldState }) => (
        <>
          <Upload
            error={fieldState?.error?.message}
            value={value || ""}
            onChange={(value) => onChange(value)}
            {...{
              ...fieldState,
              ...rest,
            }}
          />
          <Text style={styles.error}>{fieldState?.error?.message}</Text>
        </>
      )}
      rules={rules}
      control={control}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
