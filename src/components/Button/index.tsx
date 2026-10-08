/**
 * Button — botão padrão do app. Pode ser cheio (solid) ou só com borda (outline)
 * e receber um ícone antes do texto.
 */
import type { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  type StyleProp,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";
import { styles } from "./styles";

type ButtonProps = {
  text: string;
  color: string;
  onPress?: TouchableOpacityProps["onPress"];
  icon?: ReactNode;
  variant?: "solid" | "outline";
  uppercase?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  text,
  color,
  onPress,
  icon,
  variant = "solid",
  uppercase = false,
  style,
}: ButtonProps) {
  const outline = variant === "outline";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        outline
          ? { borderWidth: 1, borderColor: color, backgroundColor: "transparent" }
          : { backgroundColor: color },
        style,
      ]}
      onPress={onPress}
    >
      {icon}
      <Text
        style={[
          styles.text,
          outline && { color },
          uppercase && styles.uppercase,
        ]}
      >
        {uppercase ? text.toUpperCase() : text}
      </Text>
    </TouchableOpacity>
  );
}
