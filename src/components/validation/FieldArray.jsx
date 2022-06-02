import React from "react";
import { TextInput, Text } from "react-native-paper";
import { Controller, useFieldArray } from "react-hook-form";
import { StyleSheet, View, Button } from "react-native";

export default function FieldArray({
  name,
  label,
  variant,
  control,
  rules,
  ...rest
}) {
  const { fields, append } = useFieldArray({
    control,
    name,
  });
  const field = (item, index) => (
    <View key={item.id}>
      <Controller
        render={({ field: { value, onChange }, fieldState }) => (
          <>
            <TextInput
              error={fieldState?.error?.message}
              name={`test.${index}.lastName`}
              value={value || ""}
              label={label || ""}
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
      <Button type="button" onClick={() => remove(index)}>
        Delete
      </Button>
    </View>
  );
  const items = fields.map((item, index) => field(item, index));
  return (
    <>
      <h1>Hello Boy</h1>
      {items}
      <Button
        title="APPEND"
        type="button"
        onPress={(e) => {
          console.log(e, "EEEEE");
          append({ lastName: "luo" });
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
