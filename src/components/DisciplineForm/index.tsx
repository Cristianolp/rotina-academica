/**
 * DisciplineForm — formulário para cadastrar uma disciplina
 * (nome, professor, horário, sala e ícone). Salva na API e volta.
 */
import { Button } from "@/components/Button";
import { disciplineIcons } from "@/components/DisciplineCard";
import { errorMessage, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import type { DisciplineIcon } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

/** Opções de ícone, com o nome que aparece embaixo de cada um */
const iconOptions: { value: DisciplineIcon; label: string }[] = [
  { value: "book", label: "Geral" },
  { value: "code", label: "Programação" },
  { value: "database", label: "Banco de dados" },
  { value: "cpu", label: "Computação" },
  { value: "chart", label: "Exatas" },
  { value: "brain", label: "Humanas" },
];

export function DisciplineForm() {
  const { addDiscipline } = useAppStore();

  const [name, setName] = useState("");
  const [professor, setProfessor] = useState("");
  const [schedule, setSchedule] = useState("");
  const [room, setRoom] = useState("");
  const [icon, setIcon] = useState<DisciplineIcon>("book");
  const [saving, setSaving] = useState(false);

  const fields = [
    { label: "Nome da Disciplina", value: name, onChange: setName, placeholder: "Ex: Engenharia de Software" },
    { label: "Professor", value: professor, onChange: setProfessor, placeholder: "Ex: Prof. Ana Santos" },
    { label: "Horário", value: schedule, onChange: setSchedule, placeholder: "Ex: Seg / Qua - 10:00" },
    { label: "Sala", value: room, onChange: setRoom, placeholder: "Ex: Laboratório 401" },
  ];

  /** Valida os campos e cadastra na API */
  async function handleSave() {
    if (saving) return;
    const missing = fields.find((field) => !field.value.trim());
    if (missing) {
      return Alert.alert("Atenção", `Preencha o campo "${missing.label}".`);
    }

    setSaving(true);
    try {
      await addDiscipline({
        name: name.trim(),
        professor: professor.trim(),
        schedule: schedule.trim(),
        room: room.trim(),
        icon,
      });
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
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Nova Disciplina</Text>

        <View style={styles.card}>
          {fields.map((field) => (
            <View key={field.label} style={styles.field}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={field.placeholder}
                placeholderTextColor={colors.text.tertiary}
                style={styles.input}
              />
            </View>
          ))}

          <View style={styles.field}>
            <Text style={styles.label}>Ícone</Text>
            <View style={styles.icons}>
              {iconOptions.map((option) => {
                const selected = option.value === icon;
                return (
                  <TouchableOpacity
                    key={option.value}
                    activeOpacity={0.8}
                    onPress={() => setIcon(option.value)}
                    style={[styles.iconOption, selected && styles.iconOptionSelected]}
                    accessibilityLabel={option.label}
                    accessibilityState={{ selected }}
                  >
                    <MaterialCommunityIcons
                      name={disciplineIcons[option.value]}
                      size={22}
                      color={selected ? colors.primary : colors.text.secondary}
                    />
                    <Text style={[styles.iconLabel, selected && styles.iconLabelSelected]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <Button
            text={saving ? "Salvando..." : "Salvar disciplina"}
            color={colors.primary}
            onPress={handleSave}
            icon={<Ionicons name="save" size={18} color={colors.white} />}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
