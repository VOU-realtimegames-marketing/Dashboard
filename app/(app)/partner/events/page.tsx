import { columns } from '@/app/(app)/partner/events/_components/columns';
import { DataTable } from '@/app/(app)/partner/events/_components/data-table';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';

import { Separator } from '@/components/ui/separator';
import AddEventDialog from './_components/add-event-dialog';
import { getEventsOfOwner } from '@/lib/event';
import { getStoresOfOwner } from '@/lib/store';
import { auth } from '@/lib/auth';
import { EventDateProvider } from '@/contexts/EventDateContext';

export const metadata = {
  title: 'VOU | Events'
};

export default async function EventsPage() {
  const session = await auth();
  const [{ events = [] }, { stores = [] }] = await Promise.all([
    getEventsOfOwner(session.user.username),
    getStoresOfOwner()
  ]);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Events`} description="Manage events" />
          <AddEventDialog stores={stores} />
        </div>
        <Separator />
        <DataTable columns={columns} data={events} />
      </div>
    </PageContainer>
  );
}
