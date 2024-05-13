import { findById } from 'models/store_model';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Store',
// };

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [store] = await Promise.all([
    findById(id),    
  ]);

  if (!store) {
    notFound();
  }
  
  return (
    <main>
      <h2>{store.name}</h2>
    </main>
  );
}