
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    alterarStatus,
    atualizarMateria,
    excluirMateria,
    Filtro,
    initDb,
    inserirMateria,
    listarMaterias,
    Materia,
} from '../database/db';

const FILTROS: { chave: Filtro; rotulo: string }[] = [
  { chave: 'todos', rotulo: 'Todos' },
  { chave: 'pendente', rotulo: 'Pendentes' },
  { chave: 'concluido', rotulo: 'Concluídos' },
];

export default function MateriasScreen() {
  const [itens, setItens] = useState<Materia[]>([]);
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [carregando, setCarregando] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setItens(await listarMaterias(filtro));
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as matérias.');
    } finally {
      setCarregando(false);
    }
  }, [filtro]);

  useEffect(() => {
    initDb().then(carregar).catch(() =>
      Alert.alert('Erro', 'Não foi possível iniciar o banco de dados.')
    );
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function salvar() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Informe o título da matéria.');
      return;
    }
    try {
      if (editandoId === null) {
        await inserirMateria(titulo.trim(), descricao.trim());
      } else {
        await atualizarMateria(editandoId, titulo.trim(), descricao.trim());
      }
      setTitulo('');
      setDescricao('');
      setEditandoId(null);
      await carregar();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    }
  }

  function editar(item: Materia) {
    setEditandoId(item.id);
    setTitulo(item.titulo);
    setDescricao(item.descricao ?? '');
  }

  async function alternarStatus(item: Materia) {
    try {
      await alterarStatus(item.id, item.status === 'pendente' ? 'concluido' : 'pendente');
      await carregar();
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o status.');
    }
  }

  function confirmarExclusao(item: Materia) {
    Alert.alert('Excluir matéria', `Deseja excluir "${item.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirMateria(item.id);
            await carregar();
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título (ex.: Matemática)"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>
          {editandoId === null ? 'Adicionar' : 'Salvar alterações'}
        </Text>
      </TouchableOpacity>

      <View style={styles.filtros}>
        {FILTROS.map((f) => (
          <TouchableOpacity
            key={f.chave}
            style={[styles.filtro, filtro === f.chave && styles.filtroAtivo]}
            onPress={() => setFiltro(f.chave)}
          >
            <Text style={filtro === f.chave ? styles.filtroTextoAtivo : styles.filtroTexto}>
              {f.rotulo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {carregando ? (
        <ActivityIndicator size="large" style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(i) => String(i.id)}
          ListEmptyComponent={
            <Text style={styles.vazio}>📚 Nenhuma matéria por aqui. Adicione a primeira acima.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => alternarStatus(item)}>
                <Text style={[styles.cardTitulo, item.status === 'concluido' && styles.riscado]}>
                  {item.status === 'concluido' ? '✅ ' : '⏳ '}
                  {item.titulo}
                </Text>
                {!!item.descricao && <Text style={styles.cardDesc}>{item.descricao}</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editar(item)}>
                <Text style={styles.acao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarExclusao(item)}>
                <Text style={[styles.acao, { color: '#c0392b' }]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 8 },
  botao: { backgroundColor: '#3b5bdb', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  botaoTexto: { color: '#fff', fontWeight: '600' },
  filtros: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filtro: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#3b5bdb' },
  filtroAtivo: { backgroundColor: '#3b5bdb' },
  filtroTexto: { color: '#3b5bdb' },
  filtroTextoAtivo: { color: '#fff' },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 },
  cardTitulo: { fontSize: 16, fontWeight: '600' },
  cardDesc: { color: '#666', marginTop: 2 },
  riscado: { textDecorationLine: 'line-through', color: '#888' },
  acao: { color: '#3b5bdb', fontWeight: '600' },
  vazio: { textAlign: 'center', marginTop: 32, color: '#666' },
});