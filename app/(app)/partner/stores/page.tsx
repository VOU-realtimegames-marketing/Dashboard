import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

import { columns } from '@/components/ui/data-table/columns';
import { DataTable } from '@/components/ui/data-table/data-table';
import { testCaseSchema } from './_data/schema';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'VOU | Stores'
};

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/(app)/partner/stores/_data/test-case.json')
  );

  const testCases = JSON.parse(data.toString());

  return z.array(testCaseSchema).parse(testCases);
}

export default async function StoresPage() {
  const data = await getData();

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Stores`} description="Manage stores" />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add new store
          </Link>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} />
      </div>
    </PageContainer>
  );
}
