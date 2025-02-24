import type { QueryResult } from "pg";
import { getPool } from "./pool.js";


export async function getAnimalById(id: number): Promise<QueryResult> {
  const pool = getPool();
  const queryText = 'SELECT * FROM "Tier" WHERE id = $1';
  const values = [id];

  const result: QueryResult = await pool.query(queryText, values);

  if (!result || result.rowCount === undefined) {
    throw new Error("No rows returned");
  }

  return result;
}

export async function updateAnimalCompound(
  animalId: number,
  compoundId: number
): Promise<QueryResult> {
  const pool = getPool();
  const queryText =
    'UPDATE "Tier" SET gehege_id = $1 WHERE id = $2 RETURNING *';
  const values = [compoundId, animalId];

  const result: QueryResult = await pool.query(queryText, values);

  if (!result || result.rowCount === undefined) {
    throw new Error("No rows returned");
  }

  return result;
}
