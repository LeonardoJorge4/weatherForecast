import { StyleSheet } from "react-native";
import theme from "../../global/theme";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.shape,
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
})