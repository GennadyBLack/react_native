import React from "react";
import { TextInput, Text } from "react-native-paper";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

export default function Input({
  name,
  label,
  variant,
  control,
  rules,
  ...rest
}) {
  return (
    <Controller
      render={({ field: { value, onChange }, fieldState }) => (
        <>
          <TextInput
            error={fieldState?.error?.message}
            value={value || ""}
            onChangeText={(value) => onChange(value)}
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
