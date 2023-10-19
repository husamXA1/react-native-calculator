import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "./constants/COLORS";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function aquireDarkMode() {
      const storageDarkMode = await AsyncStorage.getItem("darkMode");
      if (storageDarkMode) {
        setDarkMode(storageDarkMode === "true" ? true : false);
      }
    }
    aquireDarkMode();
  }, []);

  async function switchTheme() {
    await AsyncStorage.setItem("darkMode", (!darkMode).toString());
    setDarkMode((pendingMode) => !pendingMode);
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: darkMode ? COLORS.black : COLORS.lightBG,
      }}
    >
      <TouchableOpacity style={styles.darkModeIcon} onPress={switchTheme}>
        {darkMode ? (
          <Ionicons name="ios-sunny" size={30} color={COLORS.white} />
        ) : (
          <Ionicons name="ios-moon" size={30} color={COLORS.black} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  darkModeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 30,
    height: 30,
  },
});
