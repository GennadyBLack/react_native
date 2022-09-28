import { StyleSheet } from "react-native";
import constants from "./style";

const mainStyles = {
  button: {
    backgroundColor: constants.GREEN,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: "#66bfbf",
    borderRadius: 20,
  },
  bottonText: {
    color: constants.LIGHT,
  },
  c_green: {
    color: constants.GREEN,
  },
};

const s = StyleSheet.create(mainStyles);

export default s;
