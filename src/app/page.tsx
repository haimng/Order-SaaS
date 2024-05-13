import MainLogo from 'components/main-logo';
import { list } from 'models/store_model';
import StoreList from 'components/stores/store_list';

// export const dynamic = 'force-dynamic'
// export const revalidate = 0;

export default async function Page() {
  const stores = await list({});
  console.log({stores});

  return (
    <main className="flex min-h-screen flex-col p-6">            
      <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
        <div className="w-32 text-white md:w-36">
          <MainLogo />
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">          
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Orders SaaS</strong><br/>
            Your tailored solution for small retailers order management needs. Simplify order processing, tracking, inventory management, and fulfillment. Ideal for small-scale retail businesses looking to streamline operations.
          </p>          
        </div>
      </div>
      <h2>Store List</h2>
      <StoreList stores={stores} />
    </main>
  );
}
