import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function GridTest({ data, onChange, template, inputProps }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onChange && search ? onChange(search) : onChange();
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(e) => setSearch(e)}
        value={search}
        {...inputProps}
        placeholder="Search"
      />
      <FlatList data={data} renderItem={({ item }) => template(item)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#eee",
    padding: 20,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
  },
});
