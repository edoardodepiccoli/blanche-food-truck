import { format, parseISO } from "date-fns";

import { it } from "date-fns/locale";

export function formatDateItalian(isoDate: string): string {
  const dateObj = parseISO(isoDate);
  return format(dateObj, "EEEE dd MMMM", { locale: it });
}
