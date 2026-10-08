/**
 * SummaryCard — card de resumo com número grande (Pendências, Provas,
 * Disciplinas) usado no Início.
 */
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type SummaryCardProps = {
  total: number;
  title: string;
  subtitle: string;
  icon: ReactNode;
  textColor: string;
  decorationColor?: string;
  onPress?: () => void;
};

export function SummaryCard({
  total,
  title,
  subtitle,
  icon,
  textColor,
  decorationColor,
  onPress,
}: SummaryCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!onPress}
      onPress={onPress}
      style={styles.container}
    >
      {decorationColor && (
        <View style={[styles.decoration, { backgroundColor: decorationColor }]} />
      )}
      <View style={styles.row}>
        {icon}
        <Text
          style={[
            styles.textRow,
            {
              color: textColor,
            },
          ]}
        >
          {total}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.titleContent}>{title}</Text>
        <Text style={styles.subtitleContent}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
