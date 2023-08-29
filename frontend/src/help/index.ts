export const enum LS_Keys {
  rating = "rating",
  telegram = "telegram",
  email = "email",
  passportDetails = "passportDetails",
}

// Склонение числительных
export default function declOfNum(num: number, titles: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
}

export const creditScoring = {
  Высокий: { initialFee: 0.1, rate: 0.06 },
  Средний: { initialFee: 0.2, rate: 0.1 },
  Низкий: { initialFee: 0.3, rate: 0.15 },
};
