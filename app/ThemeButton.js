import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "../context/ThemeContext";
import COLORS from "../constants/COLORS";

const ThemeButton = ({ switchTheme }) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.darkModeIcon} onPress={switchTheme}>
      {theme === "dark" ? (
        <Ionicons name="ios-sunny" size={30} color={COLORS.white} />
      ) : (
        <Ionicons name="ios-moon" size={30} color={COLORS.black} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkModeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 30,
    height: 30,
  },
});

export default ThemeButton;
