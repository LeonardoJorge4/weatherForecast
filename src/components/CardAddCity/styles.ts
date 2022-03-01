import { StyleSheet } from "react-native";
import theme from "../../global/theme";

export const styles = StyleSheet.create({
  loading: {
    marginTop: 15,
  },
  container: {
    backgroundColor: theme.colors.shape,
    borderRadius: 5,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
    padding: 15,
    marginTop: 15,
    marginHorizontal: 15,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  city: {
    fontSize: 24,
    color: theme.colors.text_dark
  },
  country: {
    fontSize: 14,
    color: theme.colors.text
  },
  button: {
    backgroundColor: theme.colors.secondary,
    padding: 15,
    borderRadius: 5,
  },
  textButton: {
    textAlign: "center",
    color: theme.colors.shape,
    fontSize: 16,
  }
})