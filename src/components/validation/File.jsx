import React from "react";
import Upload from "./UploadValidation";
import { Controller } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";

export default function File({ name, label, control, rules, ...rest }) {
  return (
    <Controller
      render={({ field: { value, onChange }, fieldState }) => (
        <View>
          <Upload
            error={fieldState?.error?.message}
            value={value || ""}
            onChange={(value) => {
              console.log(value);
              onChange(value);
            }}
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
