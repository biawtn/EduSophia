import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Materia = {
  id: string;
  titulo: string;
  status: string;
};

const MATERIAS: Materia[] = [
  { id: '1', titulo: 'Matemática', status: 'Em andamento' },
  { id: '2', titulo: 'Português', status: '5 resumos salvos' },
  { id: '3', titulo: 'História', status: 'Não iniciado' },
];

export default function ListaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus estudos</Text>

      <FlatList
        data={MATERIAS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: '/detalhe/[id]',
                params: { id: item.id, titulo: item.titulo, status: item.status },
              })
            }>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={styles.itemStatus}>{item.status}</Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.addButton} onPress={() => alert('Em breve')}>
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
  item: {
    borderWidth: 1,
    borderColor: '#DCE9F5',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FFFFFF',
  },
  itemTitulo: {
    color: '#173A66',
    fontWeight: '600',
    fontSize: 15,
  },
  itemStatus: {
    color: '#5B7291',
    fontSize: 12,
    marginTop: 3,
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