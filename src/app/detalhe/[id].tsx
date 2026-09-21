import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Bloco = {
  titulo: string;
  topicos: string[];
};

const BLOCOS_MATEMATICA: Bloco[] = [
  { titulo: 'Matemática Básica', topicos: ['Aritmética', 'Frações', 'Porcentagem', 'Geometria', 'Equação 1º grau'] },
  { titulo: 'Funções', topicos: ['Função Afim', 'Função Quadrática', 'Função Exponencial', 'Função Logarítima', 'Função Modular'] },
  { titulo: 'Trigonometria', topicos: ['Seno...'] },
];

export default function DetalheScreen() {
  const { id, titulo } = useLocalSearchParams<{ id: string; titulo: string }>();

  const blocos = id === '1' ? BLOCOS_MATEMATICA : [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus estudos</Text>

      <Text style={styles.materiaTitle}>Matéria: {titulo}</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {blocos.length === 0 ? (
          <Text style={styles.textSecondary}>
            Ainda não há conteúdo cadastrado para esta matéria.
          </Text>
        ) : (
          blocos.map((bloco) => (
            <View key={bloco.titulo} style={styles.bloco}>
              <Text style={styles.blocoTitulo}>{bloco.titulo}</Text>
              {bloco.topicos.map((topico) => (
                <Text key={topico} style={styles.topico}>
                  • {topico}
                </Text>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#F9FCFF',
  },
  header: {
    marginBottom: 16,
    textAlign: 'center',
    color: 'rgba(30, 79, 160, 0.8)',
    fontSize: 20,
    fontWeight: '600',
  },
  materiaTitle: {
    marginBottom: 14,
    color: '#173A66',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 12,
  },
  textSecondary: {
    color: '#5B7291',
    fontSize: 13,
  },
  bloco: {
    borderWidth: 1,
    borderColor: '#DCE9F5',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FFFFFF',
  },
  blocoTitulo: {
    marginBottom: 8,
    color: '#173A66',
    fontWeight: '600',
    fontSize: 15,
  },
  topico: {
    marginBottom: 4,
    color: '#5B7291',
    fontSize: 13,
  },
  backButton: {
    borderWidth: 1.5,
    borderColor: '#C9DFF5',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  backButtonText: {
    fontWeight: '600',
    color: '#173A66',
  },
});