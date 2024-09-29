export default function calculateTotalTime(time1, time2) {
  if (time1 === "" || time2 === "") {
    return;
  }
  
  const parsedTime1 = parseTime(time1);
  const parsedTime2 = parseTime(time2);

  const totalMinutes = getTimeInMinutes(parsedTime1) + getTimeInMinutes(parsedTime2);

  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  }

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }

  return parts.join(" ");
}

function parseTime(timeStr) {
  const [value, unit] = timeStr.split(" ");
  return { value: Number(value), unit };
}

function getTimeInMinutes({ value, unit }) {
  const timeInMinutes = {
    minutes: (value) => value,
    hours: (value) => value * 60,
    days: (value) => value * 24 * 60,
  };

  return timeInMinutes[unit](value);
}
