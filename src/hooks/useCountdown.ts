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

function calculate(): TimeDiff {
  const now = new Date();

  // ── Date-only diff (Y/M/D) ───────────────────────────────────────────────
  // Strip the time component so the day flips at midnight, not at 20:00.
  // This avoids "27 days 19h" showing on the anniversary day before 20:00.
  let years  = now.getFullYear() - TARGET.getFullYear();
  let months = now.getMonth()    - TARGET.getMonth();
  let days   = now.getDate()     - TARGET.getDate();

  if (days < 0) {
    // Borrow from the month that contains the last anniversary, not from
    // the current month — prevents wrong values when Feb is involved.
    const prevMonthDays = new Date(
      now.getFullYear(),
      now.getMonth(),   // month index → day 0 = last day of previous month
      0
    ).getDate();
    days   += prevMonthDays;
    months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }

  // ── Time diff (H/M/S) ────────────────────────────────────────────────────
  // Calculated independently: how far into the current day past 20:00 we are.
  let hours   = now.getHours()   - TARGET.getHours();
  let minutes = now.getMinutes() - TARGET.getMinutes();
  let seconds = now.getSeconds() - TARGET.getSeconds();

  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours   -= 1; }
  if (hours   < 0) { hours   += 24; }

  return { years, months, days, hours, minutes, seconds };
}

export function useCountdown(): TimeDiff {
  const [diff, setDiff] = useState<TimeDiff>(calculate);

  useEffect(() => {
    const id = setInterval(() => setDiff(calculate()), 1000);
    return () => clearInterval(id);
  }, []);

  return diff;
}
