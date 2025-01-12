import { columns } from '@/app/(app)/admin/events/_components/columns';
import { DataTable } from '@/app/(app)/admin/events/_components/data-table';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';

import { Separator } from '@/components/ui/separator';
import { getAllEvents } from '@/lib/event';

export const metadata = {
  title: 'VOU | Events'
};

export default async function EventsPage() {
  const { events = [] } = await getAllEvents();

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Events`} description="Manage events" />
        </div>
        <Separator />
        <DataTable columns={columns} data={events} />
      </div>
    </PageContainer>
  );
}
