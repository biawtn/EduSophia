import AsyncStorage from '@react-native-async-storage/async-storage';

export type Materia = {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
};

const CHAVE = '@edusophia:materias';


const MATERIAS_INICIAIS: Materia[] = [
  { id: '1', titulo: 'Matemática', descricao: 'Em andamento', concluida: false },
  { id: '2', titulo: 'Português', descricao: '5 resumos salvos', concluida: false },
  { id: '3', titulo: 'História', descricao: 'Não iniciado', concluida: false },
];

export async function salvarMaterias(materias: Materia[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(materias));
}

export async function carregarMaterias(): Promise<Materia[]> {
  try {
    const json = await AsyncStorage.getItem(CHAVE);

    if (json === null) {
      await salvarMaterias(MATERIAS_INICIAIS);
      return MATERIAS_INICIAIS;
    }

    return JSON.parse(json) as Materia[];
  } catch {
    return [];
  }
}

export async function adicionarMateria(titulo: string, descricao: string): Promise<void> {
  const materias = await carregarMaterias();
  const nova: Materia = {
    id: Date.now().toString(),
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    concluida: false,
  };
  await salvarMaterias([...materias, nova]);
}

export async function alternarConclusao(id: string): Promise<void> {
  const materias = await carregarMaterias();
  const atualizadas = materias.map((m) =>
    m.id === id ? { ...m, concluida: !m.concluida } : m
  );
  await salvarMaterias(atualizadas);
}