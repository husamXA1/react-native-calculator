import { createContext, useContext, useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeButton from "./app/ThemeButton";
import ThemeContext from "./context/ThemeContext";
import COLORS from "./constants/COLORS";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [primaryText, setPrimaryText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");

  // Load the last theme used
  useEffect(() => {
    async function loadTheme() {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
    loadTheme();
  }, []);

  async function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    await AsyncStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme === "light" ? COLORS.lightBG : COLORS.black,
          },
        ]}
      >
        <ThemeButton switchTheme={switchTheme} />
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
