import { StyleSheet } from "react-native";

const REM = 16,
  DANGER = "#D21100",
  SUCCESS = "#4DBE25",
  GREEN = "#66bfbf",
  WARNING = "#FCAB00",
  SECONDARY = "#555860",
  LIGHT = "#F2F2F2",
  PRIMARY = "#3278B9",
  // DARK = '#302528',
  DARK = "#2d2829",
  DARK_LIGHT = "#5B5456",
  GRAY = "#918B8D",
  SPACER = 16,
  GRID_GUTTER_WIDTH = 8,
  BTN_BORDER_RADIUS = 55,
  BTN_BORDER_RADIUS_LG = 64;

const constants = {
  REM,
  DANGER,
  SUCCESS,
  WARNING,
  SECONDARY,
  LIGHT,
  GREEN,
  PRIMARY,
  DARK,
  DARK_LIGHT,
  GRAY,
  SPACER,
  GRID_GUTTER_WIDTH,
  BTN_BORDER_RADIUS,
  BTN_BORDER_RADIUS_LG,
};

const mainStyles = {
  button: {
    backgroundColor: constants.GREEN,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    // borderRadius: 4,
    elevation: 3,
    // backgroundColor: "#66bfbf",
    borderRadius: 20,
  },
  buttonText: {
    color: constants.LIGHT,
  },
  cGreen: {
    color: "#66bfbf",
  },
  title: { fontSize: 30 },
};

const s = StyleSheet.create(mainStyles);

export default s;
