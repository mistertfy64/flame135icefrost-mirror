export default function getDifferenceInDays(a: string, b: string) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const difference = Math.floor(new Date(a).getTime() - new Date(b).getTime());
  return Math.round(Math.abs(difference / ONE_DAY));
}
