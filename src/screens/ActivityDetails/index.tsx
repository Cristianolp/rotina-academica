/**
 * Tela "Detalhes da Atividade" — mostra tudo sobre uma atividade e permite
 * concluir, reabrir, mudar para em andamento, editar ou excluir.
 */
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { errorMessage, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import { getStudyTip, priorityColor, priorityLabel, statusLabel } from "@/utils/activityStatus";
import { formatDueDate } from "@/utils/date";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

const statusStyle = {
  pendente: { color: colors.text.secondary, backgroundColor: colors.background.gray, icon: "ellipse-outline" },
  em_andamento: { color: colors.primary, backgroundColor: colors.primaryLight, icon: "play-circle-outline" },
  concluida: { color: colors.green, backgroundColor: colors.background.green, icon: "checkmark-circle-outline" },
} as const;

/** Volta para a tela anterior (ou para a lista, se abriu direto) */
function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace("/activities");
}

export default function ActivityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { activities, disciplines, setActivityStatus, removeActivity } = useAppStore();

  const activity = activities.find((item) => item.id === id);

  if (!activity) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.description}>Atividade não encontrada.</Text>
        <Button text="Voltar" color={colors.primary} onPress={goBack} style={styles.backButton} />
      </View>
    );
  }

  const current = activity;
  const discipline = disciplines.find((d) => d.id === current.disciplineId);
  const done = current.status === "concluida";
  const status = statusStyle[current.status];
  const priority = priorityColor[current.priority];

  /** Muda o status da atividade na API e avisa se der erro */
  async function changeStatus(status: typeof current.status) {
    try {
      await setActivityStatus(current.id, status);
    } catch (error) {
      Alert.alert("Erro", errorMessage(error));
    }
  }

  /** Pede confirmação e exclui a atividade */
  function confirmRemove() {
    Alert.alert("Excluir atividade", `Deseja excluir "${current.title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await removeActivity(current.id);
            goBack();
          } catch (error) {
            Alert.alert("Erro", errorMessage(error));
          }
        },
      },
    ]);
  }

  /** Menu do botão ⋮: em andamento / pendente / excluir */
  function openMenu() {
    Alert.alert("Opções", undefined, [
      current.status === "em_andamento"
        ? { text: "Marcar como pendente", onPress: () => changeStatus("pendente") }
        : { text: "Marcar em andamento", onPress: () => changeStatus("em_andamento") },
      { text: "Excluir atividade", style: "destructive", onPress: confirmRemove },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity hitSlop={12} onPress={goBack}>
          <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <TouchableOpacity hitSlop={12} onPress={openMenu}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.badges}>
          <Badge
            text={statusLabel[current.status]}
            color={status.color}
            backgroundColor={status.backgroundColor}
            icon={<Ionicons name={status.icon} size={11} color={status.color} />}
          />
          <Badge
            text={`${priorityLabel[current.priority]} Prioridade`}
            color={priority.color}
            backgroundColor={priority.backgroundColor}
            icon={<Ionicons name="alert" size={11} color={priority.color} />}
          />
        </View>

        <Text style={styles.title}>{current.title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <View style={styles.infoLabelRow}>
              <MaterialCommunityIcons name="book-open-variant" size={14} color={colors.primary} />
              <Text style={styles.infoLabel}>DISCIPLINA</Text>
            </View>
            <Text style={styles.infoValue}>{discipline?.name ?? "Sem disciplina"}</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoLabelRow}>
              <Ionicons name="calendar" size={14} color={colors.red} />
              <Text style={styles.infoLabel}>ENTREGA</Text>
            </View>
            <Text style={[styles.infoValue, { color: done ? colors.text.primary : colors.red }]}>
              {formatDueDate(current.dueDate)}
            </Text>
          </View>
        </View>

        <View style={styles.tip}>
          <Ionicons name="bulb" size={20} color={colors.white} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Dica de Estudo</Text>
            <Text style={styles.tipText}>{getStudyTip(current)}</Text>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <View style={styles.descriptionHeader}>
            <MaterialCommunityIcons name="text-box-outline" size={18} color={colors.primary} />
            <Text style={styles.descriptionTitle}>Descrição da Tarefa</Text>
          </View>
          <Text style={styles.description}>
            {current.description || "Nenhuma descrição adicionada."}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        {done ? (
          <Button
            text="Marcar como pendente"
            uppercase
            color={colors.primary}
            onPress={() => changeStatus("pendente")}
            icon={<Ionicons name="refresh" size={18} color={colors.white} />}
          />
        ) : (
          <Button
            text="Marcar como concluída"
            uppercase
            color={colors.green}
            onPress={() => changeStatus("concluida")}
            icon={<Ionicons name="checkmark-circle" size={18} color={colors.white} />}
          />
        )}
        <Button
          text="Editar atividade"
          uppercase
          variant="outline"
          color={colors.text.secondary}
          onPress={() => router.push({ pathname: "/edit/[id]", params: { id: current.id } })}
          icon={<Ionicons name="pencil" size={16} color={colors.text.secondary} />}
        />
      </View>
    </View>
  );
}
