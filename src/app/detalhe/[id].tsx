import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { alternarConclusao, carregarMaterias, type Materia } from '@/storage/materias';

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
  const { id } = useLocalSearchParams<{ id: string }>();
  const [materia, setMateria] = useState<Materia | null>(null);


  useFocusEffect(
    useCallback(() => {
      carregarMaterias().then((lista) => {
        setMateria(lista.find((m) => m.id === id) ?? null);
      });
    }, [id])
  );

  async function marcarStatus() {
    await alternarConclusao(id);
    voltar(); 
  }

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  const blocos = id === '1' ? BLOCOS_MATEMATICA : [];

  if (materia === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Meus estudos</Text>
        <Text style={styles.textSecondary}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus estudos</Text>

      <Text style={styles.materiaTitle}>Matéria: {materia.titulo}</Text>

      <View style={[styles.badge, materia.concluida ? styles.badgeOk : styles.badgePendente]}>
        <Text
          style={[
            styles.badgeTexto,
            materia.concluida ? styles.badgeTextoOk : styles.badgeTextoPendente,
          ]}>
          {materia.concluida ? '✓ Concluída' : 'Pendente'}
        </Text>
      </View>

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

      <Pressable style={styles.statusButton} onPress={marcarStatus}>
        <Text style={styles.statusButtonText}>
          {materia.concluida ? 'Desmarcar como concluída' : 'Marcar como concluída'}
        </Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={voltar}>
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
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  badgeOk: {
    backgroundColor: '#E3F6EA',
  },
  badgePendente: {
    backgroundColor: '#FFF1DC',
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextoOk: {
    color: '#1E8449',
  },
  badgeTextoPendente: {
    color: '#B9770E',
  },
  statusButton: {
    backgroundColor: '#2E7CE0',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
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