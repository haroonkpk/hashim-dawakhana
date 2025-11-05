// dateFormatter.ts
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short", // short: Jan, Feb | long: January, February
    year: "numeric",
  };
  return date.toLocaleDateString("ur-PK", options); // ur-PK for Urdu locale
};
