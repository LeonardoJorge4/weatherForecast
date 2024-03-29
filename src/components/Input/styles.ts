import { StyleSheet } from "react-native";
import theme from "../../global/theme";

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: theme.colors.shape,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.shape,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
  },
  addButton: {
    backgroundColor: theme.colors.shape,
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
})