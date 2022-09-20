import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";

const ProfileHeader = () => {
  const [auth] = useStore("auth");

  const user = auth?.user?.user;
  return (
    <View style={styles.profile_wrapper}>
      <View style={styles.profile_avatar}></View>
      <View>
        <Text style={styles.profile_name}>{user?.username}</Text>
      </View>
      <Text>{user?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_wrapper: {
    borderTopRightRadius: 10,
    flexDirection: "row",
    padding: 10,
    height: 200,
    backgroundColor: "blue",
  },
  profile_avatar: {
    backgroundColor: "red",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profile_name: {},
});
export default observer(ProfileHeader);
