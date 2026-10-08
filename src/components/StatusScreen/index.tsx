/**
 * StatusScreen — tela cheia de "carregando" ou de erro.
 * Usada pelo layout raiz enquanto as fontes e os dados da API não chegam.
 */
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { colors } from "@/styles/colors";
import { Text, View } from "react-native";
import { styles } from "./styles";

type StatusScreenProps = {
  /** Mensagem de erro; sem ela a tela mostra o carregamento */
  error?: string | null;
  /** Ação do botão "Tentar novamente" (só aparece com erro) */
  onRetry?: () => void;
};

export function StatusScreen({ error, onRetry }: StatusScreenProps) {
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{error}</Text>
        {onRetry && (
          <View style={styles.button}>
            <Button text="Tentar novamente" color={colors.primary} onPress={onRetry} />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Loading />
      <Text style={styles.message}>Carregando dados...</Text>
    </View>
  );
}
