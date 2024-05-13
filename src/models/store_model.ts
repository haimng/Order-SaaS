'use server';

// import { unstable_noStore as noStore } from 'next/cache';
import { pgSql } from 'utils/pg';
import { notEmpty } from 'utils';

export async function list({ limit = 100 }) {
  try {
    // noStore();
    const sql = await pgSql();  
    const data = await sql`
      SELECT * FROM store      
      LIMIT ${limit}
    `;
    return data.rows;
  } 
  catch (err) {
    console.error('model.list:', err);    
    throw err;
  }
}

export async function findById(id: string) {
  try {    
    const sql = await pgSql();
    const data = await sql`SELECT * FROM store WHERE id = ${id}`;
    return notEmpty(data.rows) ? data.rows[0] : null;
  } 
  catch (err) {
    console.error('model.findById:', err);
    throw err;
  }
}
