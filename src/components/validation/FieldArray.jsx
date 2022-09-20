import React, { useState } from "react";
import { TextInput, Text } from "react-native-paper";
import { Controller, useFieldArray } from "react-hook-form";
import { StyleSheet, View, Button } from "react-native";
import Switch from "./Switch";

export default function FieldArray({
  name,
  label,
  appendBtn,
  variant,
  control,
  rules,
  switchLabel,
  switchAction,
  ...rest
}) {
  //TODO: switch group

  // keyName: "id" по умолчанию, поэтому в item.id прописывается свой уникальный id, который существует до отправки филдов наверх. Определение своего id в append не затирает этот id. useFieldArray automatically generates a unique identifier named id which is used for key prop
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    keyName: "fieldId", //замена значение keyName, чтобы наш id append не затирался
  });
  const [switches, setSwitches] = useState([]);
  const field = (item, index) => (
    <View key={item.id} style={styles.answerWrap}>
      <Controller
        render={({ field: { value, onChange }, fieldState }) => (
          <View>
            <TextInput
              error={fieldState?.error?.message}
              label={label || ""}
              key={item.fieldId}
              value={value || item.title}
              onChangeText={(value) => {
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
        name={`${name}[${index}].title`}
      />
      <Switch
        label={label}
        key={index}
        value={switches[index]}
        onChange={(e) => {
          switchAction(item.id, e);
        }}
      />
      <Button type="button" title="Удалить" onPress={() => remove(index)} />
    </View>
  );
  const items = fields.map((item, index) => field(item, index));
  return (
    <View>
      <h1>Hello Boy</h1>
      {items}
      <Button
        title={appendBtn}
        disabled={fields.length === 4}
        type="button"
        onPress={(e) => {
          append({
            title: "",
            id: new Date().getTime(),
          });
          setSwitches([...switches, { id: switches.length + 1, value: false }]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  answerWrap: {
    marginVertical: 15,
  },
});
