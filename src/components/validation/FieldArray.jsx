import React from "react";
import { TextInput, Text } from "react-native-paper";
import { Controller, useFieldArray } from "react-hook-form";
import { StyleSheet, View, Button } from "react-native";

export default function FieldArray({
  name,
  label,
  appendBtn,
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
              label={label || ""}
              value={value || item.title}
              onChangeText={(value) => {
                console.log(fieldState, "fieldState");
                onChange(value);
              }}
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
        name={`${name}[${index}].title`}
      />
      {/*<Button type="button" onClick={() => remove(index)}>*/}
      {/*  Delete*/}
      {/*</Button>*/}
    </View>
  );
  const items = fields.map((item, index) => field(item, index));
  return (
    <>
      <h1>Hello Boy</h1>
      {items}
      <Button
        title={appendBtn}
        disabled={fields.length === 4}
        type="button"
        onPress={(e) => {
          append({ title: "", id: fields.length + 1 });
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
