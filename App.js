import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeButton from "./app/ThemeButton";
import ThemeContext from "./context/ThemeContext";
import FieldsContext from "./context/FieldsContext"; // Make sure this import is correct
import COLORS from "./constants/COLORS";
import InputFields from "./app/InputFields";
import Keypad from "./app/Keypad";

SplashScreen.preventAutoHideAsync();

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
      await SplashScreen.hideAsync();
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
      <FieldsContext.Provider
        value={{ primaryText, setPrimaryText, secondaryText, setSecondaryText }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                theme === "light" ? COLORS.lightBG : COLORS.black,
            },
          ]}
        >
          <ThemeButton switchTheme={switchTheme} />
          <InputFields />
          <Keypad />
        </View>
      </FieldsContext.Provider>
      <ExpoStatusBar style="dark" />
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
