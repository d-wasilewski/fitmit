import { StyleSheet } from "react-native";
import fonts from "./fonts";
import colors from "./colors";

const defaultStyle = Object.assign(fonts.roboto_medium, {
  color: colors.blackPrimary,
  fontSize: "18px",
  paddingVertical: "19px",
  minWidth: "150px",
  minHeight: "40px",
  width: "70%",
  letterSpacing: "0.08em",
});

const inputs = StyleSheet.create({
  standard: defaultStyle,
  underlined: Object.assign(defaultStyle, {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    color: colors.white,
    textAlign: "center",
    fontWeight: 500,
  }),
});

export default inputs;
