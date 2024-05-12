'use server';

import { Client } from 'pg';
import { createClient, sql } from '@vercel/postgres';
import { isDevelopmentEnv } from './env';

export async function pgClient() {  
  return isDevelopmentEnv() ? await localClient() : createClient();  
}

let _sql: any;
export async function pgSql() {  
  if (!isDevelopmentEnv())  return sql;
  if (_sql)  return _sql;

  const client = await pgClient();  
  await client.connect();
  _sql = client.sql;
  return _sql;
}

interface ClientSql extends Client {
  sql?: any
}

async function localClient(): Promise<ClientSql> {
  const client: ClientSql = new Client({ connectionString: process.env.POSTGRES_URL });    
  
  const values = (values: any, { columns = Object.keys(values) } = {}) => {
    if (!Array.isArray(values)) {
      values = columns.map(column => values[column]);
    }
    const length = Object.keys(values).length;
    return (valuePosition: any) => ({
      text: Array.apply(null, Array(length)).map(() => '$' + (++valuePosition)).join(', '),
      values
    })
  };
  
  client.sql = (textFragments: any[], ...valueFragments: any[]) => {
    const query = {
      text: textFragments[0],
      values: []
    };
    valueFragments.forEach((valueFragment, i) => {
      if (typeof valueFragment !== 'function') {
        valueFragment = values([valueFragment]);
      }
      valueFragment = valueFragment(query.values.length);
      query.text += valueFragment.text + textFragments[i + 1];
      query.values = query.values.concat(valueFragment.values);
    });
    return client.query(query.text, query.values);
  };

  return client;
}