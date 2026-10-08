import { SummaryCard } from "@/components/SummaryCard";
import { styles } from "@/screens/index-style";
import { colors } from "@/styles/colors";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Minha Rotina</Text>
        <View style={styles.titleContent}>
          <Text style={styles.title}>Olá, estudante!</Text>
          <Text style={styles.subtitle}>Organize sua rotina acadêmica</Text>
        </View>

        <SummaryCard
          total={3}
          title="Pendências"
          subtitle="Para esta semana"
          textColor={colors.orange}
          icon={
            <MaterialCommunityIcons
              name="alert"
              size={24}
              color={colors.orange}
            />
          }
        />

        <View style={styles.cardContent}>
          <View style={styles.card}>
            <SummaryCard
              total={2}
              title="Provas"
              subtitle="Hoje"
              textColor={colors.orange}
              icon={
                <FontAwesome6
                  name="clipboard-question"
                  size={24}
                  color={colors.orange}
                />
              }
            />
          </View>
          <View style={styles.card}>
            <SummaryCard
              total={4}
              title="Disciplinas"
              subtitle="Para esta semana"
              textColor={colors.primary}
              icon={
                <FontAwesome6
                  name="graduation-cap"
                  size={24}
                  color={colors.primary}
                />
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}
