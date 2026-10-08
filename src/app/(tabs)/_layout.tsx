/**
 * Layout das abas — define as 4 abas (Início, Disciplinas, Atividades, Perfil)
 * e usa a barra de abas personalizada (components/TabBar).
 */
import { TabBar } from "@/components/TabBar";
import { colors } from "@/styles/colors";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen name="discipline" options={{ title: "Disciplinas" }} />
      <Tabs.Screen name="activities" options={{ title: "Atividades" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
