/**
 * TabBar — barra de abas inferior personalizada (ícone + nome, com fundo
 * azul claro na aba ativa).
 */
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type TabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];

type IconName = ComponentProps<typeof Ionicons>["name"];

const tabs: Record<string, { label: string; icon: IconName; activeIcon: IconName }> = {
  index: { label: "Início", icon: "home-outline", activeIcon: "home" },
  discipline: { label: "Disciplinas", icon: "book-outline", activeIcon: "book" },
  activities: {
    label: "Atividades",
    icon: "clipboard-outline",
    activeIcon: "clipboard",
  },
  profile: { label: "Perfil", icon: "person-outline", activeIcon: "person" },
};

export function TabBar({ state, navigation, insets }: TabBarProps) {
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const tab = tabs[route.name];
        if (!tab) return null;

        const focused = state.index === index;
        const color = focused ? colors.primary : colors.text.secondary;

        /** Troca de aba (o mesmo que a barra padrão faz) */
        function onPress() {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={tab.label}
            style={styles.tab}
          >
            <View style={[styles.item, focused && styles.itemActive]}>
              <Ionicons
                name={focused ? tab.activeIcon : tab.icon}
                size={20}
                color={color}
              />
              <Text style={[styles.label, { color }]}>{tab.label}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
