// Rota "/" — só redireciona para as abas (tela Início).
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
