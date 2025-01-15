import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Active, DataRef, Over } from '@dnd-kit/core';
import { format, subMonths } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}

export const formatNumber = (value = 0, precision = 3) =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: precision
  }).format(value);
export const randomColor = () => {
  const isColorReadable = (r, g, b) => {
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 40 && luminance < 220; // Tránh quá tối hoặc quá sáng
  };

  let color;

  do {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    if (isColorReadable(r, g, b)) {
      color = `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)}`;
    }
  } while (!color);

  return color;
};

export function getRangeTime() {
  const today = new Date();

  // Tính ngày của 6 tháng trước
  const last6MonthsDate = subMonths(today, 6);

  // Format tháng và năm bằng date-fns
  const last6Month = format(last6MonthsDate, 'MMMM'); // Tên tháng (vd: "July")
  const yearOfLast6Month = format(last6MonthsDate, 'yyyy'); // Năm của 6 tháng trước
  const currentMonth = format(today, 'MMMM'); // Tháng hiện tại
  const yearOfCurrentMonth = format(today, 'yyyy'); // Năm hiện tại

  return `${last6Month} ${yearOfLast6Month} - ${currentMonth} ${yearOfCurrentMonth}`;
}

export const getSign = (value: number) => (value >= 0 ? '+' : '-');

export const parseNumberStr = (value: number) => {
  const sign = getSign(value);
  return `${sign}${formatNumber(Math.abs(value))}`;
};
