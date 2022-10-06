import React, { useEffect } from "react";
import { View, Button } from "react-native";

export default function GridList({
  data,
  ItemComponent,
  onSave,
  onCancel,
  emitFn = null,
}) {
  //rendering Item component based on passed data
  //passing data entry to Item component
  const RenderItems = Array.isArray(data)
    ? data.map((el) => (
        <ItemComponent
          key={el?.id || el?.title || el.desc}
          entry={el}
          onEmit={emitFn}
        />
      ))
    : null;
  //button for save function
  //button to cancel function
  return (
    <View>
      {RenderItems}
      <Button title="Save" onPress={onSave} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
}
