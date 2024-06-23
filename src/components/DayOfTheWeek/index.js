// src/DayOfTheWeek.js

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './style.css';
function getDayWeek(date) {
  // Validar formato de fecha
  const datePattern = /^\d{1,2}-\d{1,2}-\d{4}$/;
  if (!datePattern.test(date) || !date.length) {
    alert('La fecha debe tener el formato DD-MM-AAAA');
    return null;
  }

  // Separar la fecha en día, mes y año
  let [day, month, year] = date.split('-').map(Number);

  if (year < 1000) {
    year += 2000;
  }

  month = String(month).padStart(2, '0');
  day = String(day).padStart(2, '0');

  const formattedDate = new Date(year, month - 1, day);
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return daysOfWeek[formattedDate.getDay()];
}

const DayOfTheWeek = () => {
  const [date, setDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = () => {
    const day = getDayWeek(date);
    setDayOfWeek(day);
  };

  return (
    <Box className="container">
      <Paper elevation={3} className="paper">
        <Typography variant="h6" gutterBottom>
          Introduzca una fecha en el formato DD-MM-AAAA
        </Typography>
        <TextField
          label="Fecha"
          variant="outlined"
          value={date}
          onChange={handleChange}
          fullWidth
          className="textField"
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Obtener día de la semana
        </Button>
        {dayOfWeek && (
          <Typography variant="h6" className="result">
            Día de la semana: {dayOfWeek}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DayOfTheWeek;
