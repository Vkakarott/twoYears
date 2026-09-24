import { useState, useEffect } from 'react';

export interface TimeDiff {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET = new Date('2022-09-24T20:00:00');

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR   = 60 * MS_PER_MINUTE;
const MS_PER_DAY    = 24 * MS_PER_HOUR;

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(date.getMonth() + months);
  return result;
}

// Whole months elapsed since TARGET, counting a month only once its
// anniversary (day 24 at 20:00) has actually passed.
function completedMonths(now: Date): number {
  const months =
    (now.getFullYear() - TARGET.getFullYear()) * 12 +
    (now.getMonth() - TARGET.getMonth());
  return addMonths(TARGET, months) > now ? months - 1 : months;
}

function calculate(): TimeDiff {
  const now = new Date();
  const totalMonths = completedMonths(now);

  // Remaining time since the last monthly anniversary, split into D/H/M/S.
  let rest = now.getTime() - addMonths(TARGET, totalMonths).getTime();
  const days    = Math.floor(rest / MS_PER_DAY);    rest %= MS_PER_DAY;
  const hours   = Math.floor(rest / MS_PER_HOUR);   rest %= MS_PER_HOUR;
  const minutes = Math.floor(rest / MS_PER_MINUTE); rest %= MS_PER_MINUTE;
  const seconds = Math.floor(rest / MS_PER_SECOND);

  return {
    years:  Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days, hours, minutes, seconds,
  };
}

export function useCountdown(): TimeDiff {
  const [diff, setDiff] = useState<TimeDiff>(calculate);

  useEffect(() => {
    const id = setInterval(() => setDiff(calculate()), 1000);
    return () => clearInterval(id);
  }, []);

  return diff;
}
