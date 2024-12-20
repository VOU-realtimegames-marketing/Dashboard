import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

import { columns } from '@/app/(app)/partner/stores/_components/columns';
import { DataTable } from '@/app/(app)/partner/stores/_components/data-table';
import { storeSchema } from './_data/schema';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AddStoreDialog from './_components/add-store-dialog';

export const metadata = {
  title: 'VOU | Stores'
};

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/(app)/partner/stores/_data/stores.json')
  );

  const stores = JSON.parse(data.toString());

  return z.array(storeSchema).parse(stores);
}

export default async function StoresPage() {
  const data = await getData();

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Stores`} description="Manage stores" />

          <AddStoreDialog />
        </div>
        <Separator />
        <DataTable columns={columns} data={data} />
      </div>
    </PageContainer>
  );
}
