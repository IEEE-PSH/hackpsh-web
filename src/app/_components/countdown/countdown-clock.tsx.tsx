"use client";

function millisecondsToUnits(totalTime: number) {
  const seconds = Math.floor((totalTime / 1000) % 60).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  const minutes = Math.floor((totalTime / 60000) % 60).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  const hours = Math.floor((totalTime / 3600000) % 24).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  const days = Math.floor(totalTime / 86400000).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  return { days, hours, minutes, seconds };
}

export default function CountdownClock({ timeRem }: { timeRem: number }) {
  const { days, hours, minutes, seconds } = millisecondsToUnits(timeRem);
  return (
    <div className="grid grid-cols-7 place-items-center items-start text-white">
      <div className="flex flex-col items-center">
        <p className="text-5xl">{days}</p>
        <p>Days</p>
      </div>
      <p className="text-5xl">:</p>
      <div className="flex flex-col items-center">
        <p className="text-5xl">{hours}</p>
        <p>Hours</p>
      </div>
      <p className="text-5xl">:</p>
      <div className="flex flex-col items-center">
        <p className="text-5xl">{minutes}</p>
        <p>Minutes</p>
      </div>
      <p className="text-5xl">:</p>
      <div className="flex flex-col items-center">
        <p className="text-5xl">{seconds}</p>
        <p>Seconds</p>
      </div>
    </div>
  );
}
