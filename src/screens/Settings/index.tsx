/**
 * Tela "Configurações" — edita nome, curso e semestre do estudante.
 */
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { errorMessage, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

export default function Settings() {
  const { profile, updateProfile } = useAppStore();
  const [name, setName] = useState(profile.name);
  const [course, setCourse] = useState(profile.course);
  const [semester, setSemester] = useState(profile.semester);

  /** Valida e salva o perfil na API */
  async function handleSave() {
    if (!name.trim() || !course.trim() || !semester.trim()) {
      return Alert.alert("Atenção", "Preencha todos os campos.");
    }
    try {
      await updateProfile({
        name: name.trim(),
        course: course.trim(),
        semester: semester.trim(),
      });
      router.back();
    } catch (error) {
      Alert.alert("Erro ao salvar", errorMessage(error));
    }
  }

  const fields = [
    { label: "Nome", value: name, onChange: setName, placeholder: "Seu nome" },
    { label: "Curso", value: course, onChange: setCourse, placeholder: "Ex: Sistemas de Informação" },
    { label: "Semestre", value: semester, onChange: setSemester, placeholder: "Ex: 2º/2026" },
  ];

  return (
    <View style={styles.container}>
      <Header showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Configurações</Text>
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
          <Button text="Salvar" color={colors.primary} onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
}
