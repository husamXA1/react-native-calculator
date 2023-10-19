import { createContext, useContext, useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeButton from "./app/ThemeButton";
import ThemeContext from "./context/ThemeContext";
import FieldsContext from "./context/FieldsContext";
import COLORS from "./constants/COLORS";
import InputFields from "./app/InputFields";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [primaryText, setPrimaryText] = useState("15");
  const [secondaryText, setSecondaryText] = useState("3×5");

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
        <FieldsContext.Provider
          value={{
            primaryText,
            setPrimaryText,
            secondaryText,
            setSecondaryText,
          }}
        >
          <InputFields />
        </FieldsContext.Provider>
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    marginTop: StatusBar.currentHeight,
  },
});
