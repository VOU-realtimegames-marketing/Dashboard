import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { testCaseSchema } from './_data/schema';

export const metadata = {
  title: 'Black-box testing'
};

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/(app)/partner/stores/_data/test-case.json')
  );

  const testCases = JSON.parse(data.toString());

  return z.array(testCaseSchema).parse(testCases);
}

const BlackBoxTestPage = async () => {
  const data = await getData();

  return (
    <div className="mb-8">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default BlackBoxTestPage;
