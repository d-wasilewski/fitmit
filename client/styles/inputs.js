import { StyleSheet } from "react-native"
import fonts from "./fonts";
import colors from "./colors";


const defaultStyle = Object.assign(fonts.roboto_medium, {
    color: colors.blackPrimary,
    fontSize: '18px',
}),


const inputs = StyleSheet.create({
    standard: defaultStyle,
    underlined: Object.assign(defaultStyle, {
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    }),
})

export default inputs;