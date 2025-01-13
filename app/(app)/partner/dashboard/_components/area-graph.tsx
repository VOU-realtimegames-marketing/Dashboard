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
import { formatNumber } from '@/lib/utils';

// const chartData = [
//   { month: 'January', quizGame: 186, shakeGame: 80 },
//   { month: 'February', quizGame: 305, shakeGame: 200 },
//   { month: 'March', quizGame: 237, shakeGame: 120 },
//   { month: 'April', quizGame: 73, shakeGame: 190 },
//   { month: 'May', quizGame: 209, shakeGame: 130 },
//   { month: 'June', quizGame: 214, shakeGame: 140 }
// ];

const chartConfig = {
  quizGame: {
    label: 'Quiz game',
    color: 'hsl(var(--chart-1))'
  },
  shakeGame: {
    label: 'Shake game',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

type GraphProps = {
  chartData: any[]; // Kiểu mảng bất kỳ
};

export function AreaGraph({ chartData }: GraphProps) {
  const totalVoucherThisMonth =
    chartData[chartData.length - 1].quizGame +
    chartData[chartData.length - 1].shakeGame;

  const totalVoucherLastMonth =
    chartData[chartData.length - 2].quizGame +
    chartData[chartData.length - 2].shakeGame;

  const percentTrending =
    (totalVoucherThisMonth / totalVoucherLastMonth - 1) * 100;
  const currentYear = new Date().getFullYear();
  const timeRange = `${chartData[0].month} - ${
    chartData[chartData.length - 1].month
  } ${currentYear}`;
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
              dataKey="shakeGame"
              type="natural"
              fill="var(--color-shakeGame)"
              fillOpacity={0.4}
              stroke="var(--color-shakeGame)"
              stackId="a"
            />
            <Area
              dataKey="quizGame"
              type="natural"
              fill="var(--color-quizGame)"
              fillOpacity={0.4}
              stroke="var(--color-quizGame)"
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
