import { useContext } from "react";
import FieldsContext from "../context/FieldsContext";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import COLORS from "../constants/COLORS";
import ThemeContext from "../context/ThemeContext";

export default function InputFields() {
  const fields = useContext(FieldsContext);
  const theme = useContext(ThemeContext);

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            flex: 1,
            fontSize: 48,
            fontWeight: "800",
            color: theme === "light" ? COLORS.black : COLORS.white,
            textAlign: "right",
            paddingRight: 16,
          }}
        >
          {fields.primaryText}
        </Text>
        <TouchableOpacity
          onPress={() => {
            fields.setPrimaryText((currentText) =>
              currentText.substring(0, currentText.length - 1)
            );
          }}
        >
          <Feather
            name="delete"
            size={24}
            color={theme === "light" ? COLORS.black : COLORS.white}
            style={{ opacity: 0.75 }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontSize: 32,
            textAlign: "right",
            opacity: 0.75,
            color: theme === "light" ? COLORS.black : COLORS.white,
          }}
        >
          {fields.secondaryText}
        </Text>
      </View>
    </View>
  );
}
