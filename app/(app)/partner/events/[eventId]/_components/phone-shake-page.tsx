import { EventValue } from '../../_data/schema';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import phoneshakebg from '@/public/shake-phone.png';

export default async function PhoneShakePage({ event }: { event: EventValue }) {
  return (
    <div className="container mx-auto grid h-[calc(100vh-100px)] grid-cols-5 gap-6 py-6">
      {/* Left side - Image */}
      <div className="relative col-span-3 overflow-hidden rounded-lg">
        <Image
          src={phoneshakebg}
          placeholder="blur"
          alt="Phone Shake Event"
          fill
          quality={80}
        />
      </div>

      {/* Right side - Event details */}
      <Card className="col-span-2 flex h-full flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
            <Badge
              variant={event.status === 'active' ? 'default' : 'secondary'}
              className="px-3 text-sm"
            >
              {event.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-center space-y-8">
          <div>
            <h3 className="mb-2 text-lg font-medium text-muted-foreground">
              Voucher Quantity
            </h3>
            <p className="text-3xl font-semibold">{event.voucher_quantity}</p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-muted-foreground">
              Event Period
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">From:</span>
                <span className="text-lg">
                  {format(new Date(event.start_time), 'PPP')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">To:</span>
                <span className="text-lg">
                  {format(new Date(event.end_time), 'PPP')}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
