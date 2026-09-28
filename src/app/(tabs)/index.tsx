import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { carregarMaterias, type Materia } from '@/storage/materias';

export default function ListaScreen() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarMaterias().then(setMaterias);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus estudos</Text>

      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma matéria cadastrada ainda.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: '/detalhe/[id]',
                params: { id: item.id },
              })
            }>
            <View style={styles.itemTexto}>
              <Text style={styles.itemTitulo}>{item.titulo}</Text>
              {item.descricao !== '' && (
                <Text style={styles.itemDescricao}>{item.descricao}</Text>
              )}
            </View>

            <View style={[styles.badge, item.concluida ? styles.badgeOk : styles.badgePendente]}>
              <Text
                style={[
                  styles.badgeTexto,
                  item.concluida ? styles.badgeTextoOk : styles.badgeTextoPendente,
                ]}>
                {item.concluida ? '✓ Concluída' : 'Pendente'}
              </Text>
            </View>
          </Pressable>
        )}
      />

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
  listContent: {
    gap: 10,
  },
  vazio: {
    textAlign: 'center',
    color: '#5B7291',
    fontSize: 13,
    marginTop: 20,
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