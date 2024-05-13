'use server';

import { pgSql } from 'utils/pg';

export async function list({ name, limit = 100 }) {
  try {
    const sql = await pgSql();
    const query = `SELECT * FROM ${name} LIMIT ${limit}`;
    console.debug({query});
    const data = await sql([query]);
    return data.rows;
  } 
  catch (err) {
    console.error('model.list:', err);
    return [];
  }
}
