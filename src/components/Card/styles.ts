import { StyleSheet } from "react-native";
import theme from "../../global/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.shape,
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 15
  },
  city: {
    fontSize: 24,
    color: theme.colors.text_dark
  },
  country: {
    fontSize: 14,
    color: theme.colors.text
  },
  climate: {
    marginTop: 10,
    fontSize: 14,
    color: theme.colors.secondary,
    textTransform: "capitalize"
  },
  minMaxDegrees: {
    fontSize: 14,
    color: theme.colors.text
  },
  contentRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  degrees: {
    fontSize: 34,
    color: theme.colors.secondary
  },

})