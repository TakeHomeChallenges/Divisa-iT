import { isValidDate, isValidFormat } from './dateValidator';

export function getDayWeek(date) {
  if (!isValidFormat(date)) {
    return { error: 'La fecha debe tener el formato DD-MM-AAAA' };
  }

  let [day, month, year] = date.split('-').map(Number);

  if (year < 1 || year > 99) {
    return { error: 'El año debe estar entre 1 y 99' };
  }

  if (!isValidDate(day, month, year)) {
    return { error: 'Fecha no válida' };
  }

  // Asegurar que el año tenga cuatro dígitos
  year += 2000;

  const formattedDate = new Date(year, month - 1, day);
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return { dayOfWeek: daysOfWeek[formattedDate.getDay()] };
}
