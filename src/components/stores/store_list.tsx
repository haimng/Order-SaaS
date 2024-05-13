'use client';

import { useState } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function StoreList(props) {
  const [stores, setStores] = useState(props.stores);
  
  async function test(id) {
    setStores(stores.filter(store => store.id != id));
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {stores?.map((store) => (
              <div
                key={store.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">                      
                      <p>{store.name}</p>
                    </div>                    
                    <button onClick={() => { test(store.id) }}>
                      <TrashIcon className="w-5" />
                    </button>
                  </div>                  
                </div>                
              </div>
            ))}
          </div>          
        </div>
      </div>
    </div>
  );
}
