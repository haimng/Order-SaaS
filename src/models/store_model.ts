'use server';

// import { unstable_noStore as noStore } from 'next/cache';
import { pgSql } from 'utils/pg';

export async function list({ limit = 100 }) {
  try {
    // noStore();
    const sql = await pgSql();    
    const data = await sql`SELECT * FROM store LIMIT ${limit}`;
    return data.rows;
  } 
  catch (err) {
    console.error('model.list:', err);    
    throw new Error('Failed to fetch data.');
  }
}
