/**
 * Layout raiz — primeiro arquivo que o Expo Router carrega.
 * - Disponibiliza o AppStore (dados da API) para o app inteiro
 * - Carrega as fontes Manrope
 * - Mostra "carregando" ou erro até os dados chegarem
 * - Declara as telas fora das abas (detalhes, edição, configurações)
 */
import { StatusScreen } from "@/components/StatusScreen";
import { AppStoreProvider, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import {
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/** Decide o que mostrar: carregando, erro ou as telas do app */
function RootNavigator() {
  const { loaded, error, reload } = useAppStore();
  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  // O botão da tela de erro usa a fonte Manrope, então espera as fontes
  if (fontsLoaded && error) {
    return <StatusScreen error={error} onRetry={reload} />;
  }

  if (!fontsLoaded || !loaded) {
    return <StatusScreen />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.primary },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="details/[id]" />
        <Stack.Screen name="edit/[id]" />
        <Stack.Screen name="disciplines/new" />
        <Stack.Screen name="disciplines/[id]" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppStoreProvider>
      <RootNavigator />
    </AppStoreProvider>
  );
}
