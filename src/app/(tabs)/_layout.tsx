import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="discipline"
        options={{
          title: "Disciplinas",
          tabBarIcon: ({ color }) => (
            <AntDesign size={24} name="book" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "Atividades",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="clipboard-list-outline"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="account-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
