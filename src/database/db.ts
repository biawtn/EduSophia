
import * as SQLite from 'expo-sqlite';

export type Status = 'pendente' | 'concluido';
export type Filtro = 'todos' | Status;

export interface Materia {
  id: number;
  titulo: string;
  descricao: string;
  status: Status;
  criado_em: string;
}

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDb() {
  if (!dbPromise) dbPromise = SQLite.openDatabaseAsync('edusophia.db');
  return dbPromise;
}

const MATERIAS_INICIAIS = [
  { titulo: 'Matemática', descricao: 'Em andamento' },
  { titulo: 'Português', descricao: '5 resumos salvos' },
  { titulo: 'História', descricao: 'Não iniciado' },
];

let initPromise: Promise<void> | null = null;

export function initDb(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      const db = await getDb();
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS materias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT NOT NULL,
          descricao TEXT,
          status TEXT NOT NULL DEFAULT 'pendente',
          criado_em TEXT NOT NULL
        );
      `);
      // Popula as matérias iniciais só na primeira vez
      const info = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
      if (!info || info.user_version === 0) {
        for (const m of MATERIAS_INICIAIS) {
          await db.runAsync(
            'INSERT INTO materias (titulo, descricao, status, criado_em) VALUES (?, ?, ?, ?)',
            [m.titulo, m.descricao, 'pendente', new Date().toISOString()]
          );
        }
        await db.execAsync('PRAGMA user_version = 1');
      }
    })().catch((e) => {
      initPromise = null;
      throw e;
    });
  }
  return initPromise;
}

export async function inserirMateria(titulo: string, descricao: string): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'INSERT INTO materias (titulo, descricao, status, criado_em) VALUES (?, ?, ?, ?)',
    [titulo, descricao, 'pendente', new Date().toISOString()]
  );
}

export async function listarMaterias(filtro: Filtro = 'todos'): Promise<Materia[]> {
  const db = await getDb();
  if (filtro === 'todos') {
    return db.getAllAsync<Materia>('SELECT * FROM materias ORDER BY id ASC');
  }
  return db.getAllAsync<Materia>(
    'SELECT * FROM materias WHERE status = ? ORDER BY id ASC',
    [filtro]
  );
}

export async function buscarMateriaPorId(id: number): Promise<Materia | null> {
  const db = await getDb();
  const linha = await db.getFirstAsync<Materia>('SELECT * FROM materias WHERE id = ?', [id]);
  return linha ?? null;
}

export async function atualizarMateria(id: number, titulo: string, descricao: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE materias SET titulo = ?, descricao = ? WHERE id = ?', [titulo, descricao, id]);
}

export async function alterarStatus(id: number, status: Status): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE materias SET status = ? WHERE id = ?', [status, id]);
}

export async function excluirMateria(id: number): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM materias WHERE id = ?', [id]);
}