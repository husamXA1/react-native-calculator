import React, { useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ThemeContext from "../context/ThemeContext";
import COLORS from "../constants/COLORS";
import FieldsContext from "../context/FieldsContext";
import { formatExpression } from "./InputFields";

const windowWidth = Dimensions.get("window").width;

const Key = ({
  color,
  bgColor,
  value,
  onPress,
  height = (windowWidth - 70) / 4,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: bgColor,
        alignItems: "center",
        justifyContent: "center",
        width: (windowWidth - 70) / 4,
        height,
        borderRadius: 10,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        borderColor:
          theme === "light" ? COLORS.secondaryBlack : COLORS.secondaryWhite,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 32,
          textAlign: "center",
          color: color,
          fontWeight: "800",
        }}
      >
        {formatExpression(value)}
      </Text>
    </TouchableOpacity>
  );
};

const NumKey = ({ value }) => {
  const theme = useContext(ThemeContext);
  const fields = useContext(FieldsContext);
  const color = theme === "light" ? COLORS.black : COLORS.white;
  const bgColor = theme === "light" ? COLORS.white : COLORS.black;

  return (
    <Key
      color={color}
      bgColor={bgColor}
      value={value}
      onPress={() => {
        fields.setPrimaryText((currentValue) => `${currentValue}${value}`);
      }}
    />
  );
};

const OperatorKey = ({ value }) => {
  const theme = useContext(ThemeContext);
  const fields = useContext(FieldsContext);
  const color = theme === "light" ? COLORS.black : COLORS.white;
  const bgColor =
    theme === "light" ? COLORS.secondaryWhite : COLORS.secondaryBlack;

  return (
    <Key
      color={color}
      bgColor={bgColor}
      value={value}
      onPress={() => {
        fields.setPrimaryText((currentValue) => `${currentValue}${value}`);
      }}
    />
  );
};

const Keypad = () => {
  const theme = useContext(ThemeContext);
  const fields = useContext(FieldsContext);

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 20,
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          theme === "light" ? COLORS.secondaryLightBG : "#1e1e1e",
      }}
    >
      <View style={styles.column}>
        <OperatorKey value={"("} />
        <NumKey value={7} />
        <NumKey value={4} />
        <NumKey value={1} />
        <Key
          color={COLORS.white}
          bgColor={COLORS.orange}
          value={"C"}
          onPress={() => {
            fields.setPrimaryText("");
            fields.setSecondaryText("");
          }}
        />
      </View>
      <View style={styles.column}>
        <OperatorKey value={")"} />
        <NumKey value={8} />
        <NumKey value={5} />
        <NumKey value={2} />
        <NumKey value={0} />
      </View>
      <View style={styles.column}>
        <OperatorKey value={"/"} />
        <NumKey value={9} />
        <NumKey value={6} />
        <NumKey value={3} />
        <NumKey value={"."} />
      </View>
      <View style={styles.column}>
        <OperatorKey value={"*"} />
        <OperatorKey value={"-"} />
        <OperatorKey value={"+"} />
        <Key
          color={COLORS.white}
          bgColor={COLORS.blue}
          value={"="}
          onPress={() => {
            const expression = fields.primaryText;
            if (typeof expression === "number") {
              fields.setSecondaryText(fields.primaryText);
              return;
            }
            try {
              const result = eval(expression);
              if (typeof result === "number" && !isNaN(result)) {
                fields.setSecondaryText([...fields.primaryText]);
                fields.setPrimaryText(result.toString());
              } else {
                fields.setSecondaryText("ERROR");
              }
            } catch (error) {
              fields.setSecondaryText("ERROR");
            }
          }}
          height={(windowWidth - 50) / 2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: { gap: 10 },
});

export default Keypad;
