/**
 * ActivityForm — formulário de atividade (título, disciplina, data,
 * prioridade e descrição). Serve para criar e para editar.
 */
import { Button } from "@/components/Button";
import { errorMessage, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import type { Activity, Priority } from "@/types";
import { priorityLabel } from "@/utils/activityStatus";
import { maskInputDate, parseInputDate, toInputDate } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

const priorities: Priority[] = ["baixa", "media", "alta"];

type ActivityFormProps = {
  /** Atividade a editar; sem ela o formulário cria uma nova */
  activity?: Activity;
};

export function ActivityForm({ activity }: ActivityFormProps) {
  const { disciplines, addActivity, updateActivity } = useAppStore();
  const initialDate = activity ? toInputDate(activity.dueDate) : "";

  const [title, setTitle] = useState(activity?.title ?? "");
  const [disciplineId, setDisciplineId] = useState(activity?.disciplineId ?? "");
  const [date, setDate] = useState(initialDate);
  const [priority, setPriority] = useState<Priority>(activity?.priority ?? "media");
  const [description, setDescription] = useState(activity?.description ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const activeDisciplines = disciplines.filter((discipline) => discipline.active);
  const selectedDiscipline = disciplines.find((d) => d.id === disciplineId);

  /** Valida os campos e salva na API (cria ou edita) */
  async function handleSave() {
    if (saving) return;
    if (!title.trim()) {
      return Alert.alert("Atenção", "Informe o título da atividade.");
    }
    if (!disciplineId) {
      return Alert.alert("Atenção", "Selecione uma disciplina.");
    }
    // Mantém o horário original se a data não foi alterada na edição
    const dueDate =
      activity && date === initialDate ? activity.dueDate : parseInputDate(date);
    if (!dueDate) {
      return Alert.alert("Atenção", "Informe uma data de entrega válida (dd/mm/aaaa).");
    }

    const data = {
      title: title.trim(),
      disciplineId,
      dueDate,
      priority,
      description: description.trim(),
    };

    setSaving(true);
    try {
      if (activity) {
        await updateActivity(activity.id, data);
      } else {
        await addActivity(data);
      }
      router.back();
    } catch (error) {
      Alert.alert("Erro ao salvar", errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {activity ? "Editar Atividade" : "Nova Atividade"}
        </Text>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Título da Atividade</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Lista de Exercícios 3"
              placeholderTextColor={colors.text.tertiary}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Disciplina</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPickerOpen(true)}
              style={[styles.input, styles.inputRow]}
            >
              <Text
                style={[
                  styles.inputText,
                  !selectedDiscipline && styles.placeholder,
                ]}
                numberOfLines={1}
              >
                {selectedDiscipline?.name ?? "Selecione uma disciplina"}
              </Text>
              <Ionicons name="chevron-down" size={18} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Data de entrega</Text>
            <View style={[styles.input, styles.inputRow]}>
              <TextInput
                value={date}
                onChangeText={(text) => setDate(maskInputDate(text))}
                placeholder="dd/mm/aaaa"
                placeholderTextColor={colors.text.tertiary}
                keyboardType="number-pad"
                maxLength={10}
                style={styles.inputInner}
              />
              <Ionicons name="calendar-outline" size={18} color={colors.text.primary} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.priorities}>
              {priorities.map((item) => {
                const selected = item === priority;
                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.8}
                    onPress={() => setPriority(item)}
                    style={[styles.priority, selected && styles.prioritySelected]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        selected && styles.priorityTextSelected,
                      ]}
                    >
                      {priorityLabel[item]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Descrição (Opcional)</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Adicione detalhes, links ou observações importantes sobre esta atividade..."
              placeholderTextColor={colors.text.tertiary}
              multiline
              textAlignVertical="top"
              style={[styles.input, styles.textArea]}
            />
          </View>

          <Button
            text={saving ? "Salvando..." : "Salvar atividade"}
            color={colors.primary}
            onPress={handleSave}
            icon={<Ionicons name="save" size={18} color={colors.white} />}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>

      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setPickerOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Selecione uma disciplina</Text>
            {activeDisciplines.map((discipline) => (
              <TouchableOpacity
                key={discipline.id}
                style={styles.option}
                onPress={() => {
                  setDisciplineId(discipline.id);
                  setPickerOpen(false);
                }}
              >
                <Text style={styles.optionText}>{discipline.name}</Text>
                {discipline.id === disciplineId && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}
