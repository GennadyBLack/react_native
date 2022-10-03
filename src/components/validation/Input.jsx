import React from "react";
import { TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";

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
        <View>
          <TextInput
            error={fieldState?.error?.message}
            value={value || ""}
            label={label || ""}
            onChangeText={(value) => onChange(value)}
            {...{
              ...fieldState,
              ...rest,
            }}
          />
          <Text style={styles.error}>{fieldState?.error?.message}</Text>
        </View>
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
