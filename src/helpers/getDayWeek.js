import { isValidDate, isValidFormat } from './dateValidator';

export function getDayWeek(date) {
  if (!isValidFormat(date)) {
    alert('La fecha debe tener el formato DD-MM-AAAA');
    return null;
  }

  let [day, month, year] = date.split('-').map(Number);

  if (year < 1 || year > 99) {
    alert('El año debe estar entre 1 y 99');
    return null;
  }

  if (!isValidDate(day, month, year)) {
    alert('Fecha no válida');
    return null;
  }

  // Asegurar que el año tenga cuatro dígitos
  year = year + 2000;

  const formattedDate = new Date(year, month - 1, day);
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return daysOfWeek[formattedDate.getDay()];
}
