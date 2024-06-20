import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import "./style.css";

const steps = [
  {
    label: "Primer equipo",
    description: `Seleccione el número de jugadores para el primer equipo. Este número también determinará la cantidad de jugadores en el segundo equipo. Los valores atribuidos a cada jugador se generarán aleatoriamente entre 1 y 10.`,
  },
  {
    label: "Segundo equipo",
    description:
      "La cantidad de jugadores del segundo equipo esta sujeta al primer equipo, los valores atribuidos a cada jugador se generarán aleatoriamente entre 1 y 10. ",
  },
  {
    label: "Verificar Equipos",
    description: ``,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const [equipos, setEquipos] = useState("Tres");

  const handleChange = (event) => {
    setEquipos(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className="stepper-container">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {index === 0 ? (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={equipos}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"Tres"}>Tres</MenuItem>
                  <MenuItem value={"Cuatro"}>Cuatro</MenuItem>
                  <MenuItem value={"Cinco"}>Cinco</MenuItem>
                  <MenuItem value={"Seis"}>Seis</MenuItem>
                  <MenuItem value={"Siete"}>Siete</MenuItem>
                </Select>
              ) : null}
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Jugar!" : "Continuar"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Atras
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
