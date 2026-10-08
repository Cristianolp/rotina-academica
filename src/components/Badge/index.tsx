/**
 * Badge — etiqueta colorida pequena (ex.: "Urgente", "2 Pendentes", "Em dia").
 */
import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type BadgeProps = {
  text: string;
  color: string;
  backgroundColor: string;
  icon?: ReactNode;
  uppercase?: boolean;
};

export function Badge({
  text,
  color,
  backgroundColor,
  icon,
  uppercase = false,
}: BadgeProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {icon}
      <Text style={[styles.text, { color }]}>
        {uppercase ? text.toUpperCase() : text}
      </Text>
    </View>
  );
}
