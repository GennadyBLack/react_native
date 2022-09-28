import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import constants from "../../helpers/style";

const ProfileHeader = () => {
  const [auth] = useStore("auth");

  const user = auth?.user?.user;
  return (
    <View style={styles.profile_wrapper}>
      <View style={styles.profile_avatar}></View>
      <View>
        <Text style={styles.profile_name}>{user?.username}</Text>
        <Text style={{ color: constants.LIGHT }}> {user?.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_wrapper: {
    borderTopRightRadius: 10,
    flexDirection: "column",

    padding: 10,
    height: 200,
    backgroundColor: constants.GREEN,
    justifyContent: "space-between",
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
