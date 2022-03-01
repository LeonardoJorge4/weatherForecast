import { StyleSheet } from "react-native";
import theme from "../../global/theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text_dark,
    textAlign: 'center',
    marginBottom: 15
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  }
})