import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from './recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DateRangePicker from '@/components/DateRangePicker';
import { getOverview } from '@/lib/cms';
import { formatNumber, parseNumberStr } from '@/lib/utils';

export default async function Dashboard() {
  const data = await getOverview(false);
  const {
    total_partner = 0,
    total_partner_last_month = 0,
    total_user = 0,
    total_user_last_month = 0,
    total_branch = 0,
    total_branch_last_month = 0,
    total_earning = 0,
    total_earning_last_month = 0,
    bar_chart = [],
    area_chart = [],
    pie_chart = [],
    list_recent = []
  } = data;

  const increasePartner = total_partner - total_partner_last_month;
  const increaseUser = total_user - total_user_last_month;

  const increaseBranch = total_branch - total_branch_last_month;
  const increaseEarning = total_earning - total_earning_last_month;

  console.log('___data:', total_partner, total_partner_last_month);

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2> */}
          <div className="hidden items-center space-x-2 md:flex">
            <DateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList> */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Partner
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(total_partner)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {parseNumberStr(increasePartner)} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total users
                  </CardTitle>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(total_user)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {parseNumberStr(increaseUser)} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Branch</CardTitle>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(total_branch)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {parseNumberStr(increaseBranch)} from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Earning
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatNumber(total_earning)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {parseNumberStr(increaseEarning)} since last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph chartData={bar_chart} />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Partners</CardTitle>
                  <CardDescription>
                    You have {list_recent.length} new partner this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales list_recent={list_recent} />
                </CardContent>
              </Card>
              <div className="col-span-4">
                <AreaGraph chartData={area_chart} />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph chartData={pie_chart} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
