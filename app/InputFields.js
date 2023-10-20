import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import COLORS from "../constants/COLORS";
import ThemeContext from "../context/ThemeContext";
import FieldsContext from "../context/FieldsContext";

export const formatExpression = (exp) => {
  if (typeof exp === "number") return exp;
  const map = {
    "*": "×",
    "/": "÷",
  };
  let newExpression = "";
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] in map) {
      newExpression += map[exp[i]];
    } else {
      newExpression += exp[i];
    }
  }
  return newExpression;
};

const InputFields = () => {
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
          {formatExpression(fields.primaryText)}
        </Text>
        <TouchableOpacity
          onPress={() => {
            fields.setPrimaryText((currentText) =>
              `${currentText}`.substring(0, currentText.length - 1)
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
          {formatExpression(fields.secondaryText)}
        </Text>
      </View>
    </View>
  );
};

export default InputFields;
