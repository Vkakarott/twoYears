import React, { useState, useEffect, use } from "react";

const targetDate = new Date("2022-09-24T20:00:00");

interface TimeDiff {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Footer() {
  const [message, setMessage] = useState(false);
  const [declaration, setDeclaration] = useState(0);
  const declarations = ['Pode partir meu coração mil vezes se desejar, sempre foi seu para fazer o que quiser. Amarei você até meu último suspiro, não quero morrer sem que você saiba disso.', 'Seja qual for a matéria de que as nossas almas são feitas, a minha e a dele são iguais.']

  useEffect(() => {
    const interval = setInterval(() => {
      setDeclaration((declaration + 1) % declarations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [message]);

  const [timeDiff, setTimeDiff] = useState<TimeDiff>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeDifference = () => {
      const currentDate = new Date();
      let diffMs = currentDate.getTime() - targetDate.getTime();

      const past = diffMs < 0;
      if (past) {
        diffMs = Math.abs(diffMs);
      }


      const diffYears = currentDate.getFullYear() - targetDate.getFullYear();
      const diffMonths = currentDate.getMonth() - targetDate.getMonth();
      const diffDays = currentDate.getDate() - targetDate.getDate();
      const diffHours = currentDate.getHours() - targetDate.getHours();
      const diffMinutes = currentDate.getMinutes() - targetDate.getMinutes();
      const diffSeconds = currentDate.getSeconds() - targetDate.getSeconds();

      let years = diffYears;
      let months = diffMonths;
      let days = diffDays;
      let hours = diffHours;
      let minutes = diffMinutes;
      let seconds = diffSeconds;

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonthDate.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeDiff({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    };

    const interval = setInterval(calculateTimeDifference, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex flex-col justify-center items-center h-28 text-sm gap-2">
      <button onClick={() => setMessage(!message)}>
        {message ? (
          <>
            <p className="text-xl">👑💍</p>
            <p>{declarations[declaration]}</p>
          </>
        ) : (
          <>
            <p className="text-xl">&#128536;&#10084;&#65039;&#65039;</p>
            <p>
              {timeDiff.years > 0 && timeDiff.years < 2 && `${timeDiff.years} ano`}
              {timeDiff.years > 1 && `${timeDiff.years} anos`}
              {timeDiff.months > 0 && `, ${timeDiff.months} meses`}
              {timeDiff.days > 0 && `, ${timeDiff.days} dias`}
              {timeDiff.hours > 0 && `, ${timeDiff.hours} horas`}
              {timeDiff.minutes > 0 && `, ${timeDiff.minutes} minutos`}
              {timeDiff.seconds > 0 && `, ${timeDiff.seconds} segundos`}
            </p>
          </>
        )}
      </button>
    </footer>
  );
}