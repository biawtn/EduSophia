
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

export async function initDb(): Promise<void> {
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
    return db.getAllAsync<Materia>('SELECT * FROM materias ORDER BY id DESC');
  }
  return db.getAllAsync<Materia>(
    'SELECT * FROM materias WHERE status = ? ORDER BY id DESC',
    [filtro]
  );
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