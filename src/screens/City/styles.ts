import { StyleSheet } from "react-native";
import theme from "../../global/theme";

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    margin: 15,
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 16
  }
})