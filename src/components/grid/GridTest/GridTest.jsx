import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";

export default function GridTest({
  data,
  onChange,
  template,
  inputProps,
  children,
  wrap_style = {},
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onChange && search ? onChange(search) : onChange();
  }, [search]);

  return (
    <ScrollView style={[styles.container, wrap_style]}>
      <View style={{ justifyContent: "center", paddingHorizontal: 40 }}>
        <TextInput
          onChangeText={(e) => setSearch(e)}
          value={search}
          {...inputProps}
          placeholder="Search"
        />
      </View>
      {children}
      {data?.length &&
        data.map((item) => {
          return template(item);
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
  },
});
