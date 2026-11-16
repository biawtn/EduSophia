
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { initDb, listarMaterias, type Filtro, type Materia } from '@/database/db';

const FILTROS: { chave: Filtro; rotulo: string }[] = [
  { chave: 'todos', rotulo: 'Todos' },
  { chave: 'pendente', rotulo: 'Pendentes' },
  { chave: 'concluido', rotulo: 'Concluídos' },
];

export default function ListaScreen() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregar() {
        try {
          setCarregando(true);
          await initDb();
          const lista = await listarMaterias(filtro);
          if (ativo) setMaterias(lista);
        } catch {
          Alert.alert('Erro', 'Não foi possível carregar as matérias. Tente novamente.');
        } finally {
          if (ativo) setCarregando(false);
        }
      }

      carregar();
      return () => {
        ativo = false;
      };
    }, [filtro])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus estudos</Text>

      <View style={styles.filtros}>
        {FILTROS.map((f) => (
          <Pressable
            key={f.chave}
            style={[styles.filtro, filtro === f.chave && styles.filtroAtivo]}
            onPress={() => setFiltro(f.chave)}>
            <Text style={filtro === f.chave ? styles.filtroTextoAtivo : styles.filtroTexto}>
              {f.rotulo}
            </Text>
          </Pressable>
        ))}
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#2E7CE0" style={styles.loading} />
      ) : (
        <FlatList
          data={materias}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.vazioBox}>
              <Text style={styles.vazioEmoji}>📚</Text>
              <Text style={styles.vazio}>Nenhuma matéria por aqui ainda.</Text>
              <Text style={styles.vazio}>Toque em "+ Adicionar" para começar.</Text>
            </View>
          }
          renderItem={({ item }) => {
            const concluida = item.status === 'concluido';
            return (
              <Pressable
                style={styles.item}
                onPress={() =>
                  router.push({
                    pathname: '/detalhe/[id]',
                    params: { id: String(item.id) },
                  })
                }>
                <View style={styles.itemTexto}>
                  <Text style={styles.itemTitulo}>{item.titulo}</Text>
                  {!!item.descricao && <Text style={styles.itemDescricao}>{item.descricao}</Text>}
                </View>

                <View style={[styles.badge, concluida ? styles.badgeOk : styles.badgePendente]}>
                  <Text
                    style={[
                      styles.badgeTexto,
                      concluida ? styles.badgeTextoOk : styles.badgeTextoPendente,
                    ]}>
                    {concluida ? '✓ Concluída' : 'Pendente'}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}

      <Pressable style={styles.addButton} onPress={() => router.push('/adicionar')}>
        <Text style={styles.addButtonText}>+ Adicionar</Text>
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
  filtros: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filtro: {
    borderWidth: 1,
    borderColor: '#2E7CE0',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filtroAtivo: {
    backgroundColor: '#2E7CE0',
  },
  filtroTexto: {
    color: '#2E7CE0',
    fontSize: 12,
    fontWeight: '600',
  },
  filtroTextoAtivo: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  loading: {
    marginTop: 30,
  },
  listContent: {
    gap: 10,
  },
  vazioBox: {
    alignItems: 'center',
    marginTop: 30,
    gap: 4,
  },
  vazioEmoji: {
    fontSize: 40,
    marginBottom: 6,
  },
  vazio: {
    textAlign: 'center',
    color: '#5B7291',
    fontSize: 13,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DCE9F5',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FFFFFF',
  },
  itemTexto: {
    flex: 1,
    marginRight: 10,
  },
  itemTitulo: {
    color: '#173A66',
    fontWeight: '600',
    fontSize: 15,
  },
  itemDescricao: {
    color: '#5B7291',
    fontSize: 12,
    marginTop: 3,
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeOk: {
    backgroundColor: '#E3F6EA',
  },
  badgePendente: {
    backgroundColor: '#FFF1DC',
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextoOk: {
    color: '#1E8449',
  },
  badgeTextoPendente: {
    color: '#B9770E',
  },
  addButton: {
    backgroundColor: '#2E7CE0',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});