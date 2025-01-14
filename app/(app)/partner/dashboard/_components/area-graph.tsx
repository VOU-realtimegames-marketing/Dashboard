'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { formatNumber, getRangeTime } from '@/lib/utils';

// const chartData = [
//   { month: 'January', quiz_game: 186, shake_game: 80 },
//   { month: 'February', quiz_game: 305, shake_game: 200 },
//   { month: 'March', quiz_game: 237, shake_game: 120 },
//   { month: 'April', quiz_game: 73, shake_game: 190 },
//   { month: 'May', quiz_game: 209, shake_game: 130 },
//   { month: 'June', quiz_game: 214, shake_game: 140 }
// ];

const chartConfig = {
  quiz_game: {
    label: 'Quiz game',
    color: 'hsl(var(--chart-1))'
  },
  shake_game: {
    label: 'Shake game',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

type GraphProps = {
  chartData: any[]; // Kiểu mảng bất kỳ
};

export function AreaGraph({ chartData = [] }: GraphProps) {
  const totalVoucherThisMonth =
    chartData[chartData.length - 1]?.quiz_game +
      chartData[chartData.length - 1]?.shake_game || 0;

  const totalVoucherLastMonth =
    chartData[chartData.length - 2]?.quiz_game +
      chartData[chartData.length - 2]?.shake_game || 0;

  const percentTrending =
    (totalVoucherThisMonth / totalVoucherLastMonth - 1) * 100;

  const timeRange = getRangeTime();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voucher statistic</CardTitle>
        <CardDescription>
          Total voucher release for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="shake_game"
              type="natural"
              fill="var(--color-shake_game)"
              fillOpacity={0.4}
              stroke="var(--color-shake_game)"
              stackId="a"
            />
            <Area
              dataKey="quiz_game"
              type="natural"
              fill="var(--color-quiz_game)"
              fillOpacity={0.4}
              stroke="var(--color-quiz_game)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {percentTrending > 0 ? (
                <>
                  Trending up by {formatNumber(percentTrending, 2)}% this month{' '}
                  <TrendingUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Trending down by {formatNumber(percentTrending, 2)}% this
                  month <TrendingDown className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {timeRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
