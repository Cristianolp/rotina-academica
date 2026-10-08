/**
 * Funções de data: formatação ("Hoje, 23:59", "24 Out"), máscara dd/mm/aaaa
 * e conversão entre o texto digitado e a data salva.
 */
const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const DAY_MS = 24 * 60 * 60 * 1000;

/** Mesma data, à meia-noite */
function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Quantos dias faltam (negativo = já passou; 0 = hoje) */
export function daysFromToday(iso: string) {
  const diff = startOfDay(new Date(iso)).getTime() - startOfDay(new Date()).getTime();
  return Math.round(diff / DAY_MS);
}

/** Completa com zero à esquerda: 5 -> "05" */
function pad(value: number) {
  return String(value).padStart(2, "0");
}

/** "23:59" */
export function formatTime(iso: string) {
  const date = new Date(iso);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** "24 Out" */
export function formatShortDate(iso: string) {
  const date = new Date(iso);
  return `${pad(date.getDate())} ${MONTHS[date.getMonth()]}`;
}

/** "Hoje, 23:59", "Amanhã, 10:00", "Ontem" ou "25 Out" */
export function formatRelativeDate(iso: string) {
  const days = daysFromToday(iso);
  if (days === 0) return `Hoje, ${formatTime(iso)}`;
  if (days === 1) return `Amanhã, ${formatTime(iso)}`;
  if (days === -1) return "Ontem";
  return formatShortDate(iso);
}

/** "24 Out, 23:59" */
export function formatDueDate(iso: string) {
  return `${formatShortDate(iso)}, ${formatTime(iso)}`;
}

/** "dd/mm/aaaa" -> ISO (23:59 do dia) ou null se inválida */
export function parseInputDate(text: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!match) return null;
  const [, d, m, y] = match.map(Number);
  const date = new Date(y, m - 1, d, 23, 59);
  if (date.getDate() !== d || date.getMonth() !== m - 1) return null;
  return date.toISOString();
}

/** Data salva -> texto "dd/mm/aaaa" para o formulário */
export function toInputDate(iso: string) {
  const date = new Date(iso);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/** Aplica a máscara dd/mm/aaaa enquanto o usuário digita */
export function maskInputDate(text: string) {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/** Data relativa a hoje, no horário informado */
export function dateFromToday(days: number, hours = 23, minutes = 59) {
  const date = startOfDay(new Date());
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes);
  return date.toISOString();
}
