// src/DayOfTheWeek.js

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { getDayWeek } from "../../helpers/getDayWeek";
import "./style.css";

const DayOfTheWeek = () => {
  const [date, setDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [userFeedback, setUserFeedback] = useState({
    open: false,
    message: "",
    type: "",
  });

  const handleChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 4) {
      value =
        value.slice(0, 2) + "-" + value.slice(2, 4) + "-" + value.slice(4);
    } else if (value.length > 2) {
      value = value.slice(0, 2) + "-" + value.slice(2);
    }

    setDate(value);
  };

  const handleSubmit = () => {
    const day = getDayWeek(date);

    if (day.error) {

      setDayOfWeek('');
      setUserFeedback({
        open: true,
        message: day.error,
        type: "error",
      });

    } else {

      setUserFeedback({
        open: true,
        message: `Fecha encontrada con exito`,
        type: "success",
      });

      setDayOfWeek(day.dayOfWeek);

    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUserFeedback({
      open: false,
      message: "",
      type: "",
    });
  };

  return (
    <>
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
      <Snackbar
        open={userFeedback.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={userFeedback.type === "success" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {userFeedback.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DayOfTheWeek;
