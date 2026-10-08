import {
    Text,
    TouchableOpacity,
    type TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";

type ButtonProps = {
  text: string;
  color: string;
  onPress?: TouchableOpacityProps["onPress"];
};

export function Button({ text, color, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
