import { StyleSheet } from "react-native";
import theme from "../../global/theme";

export const styles = StyleSheet.create({
  containerNoData: {
    marginTop: 15,
    paddingHorizontal: 15
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text_dark,
    margin: 15
  }
})