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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./style.css";

const steps = [
  {
    label: "Primer equipo",
    description: `Seleccione el número de jugadores para el primer equipo. Este número también determinará la cantidad de jugadores en el segundo equipo. Los valores atribuidos a cada jugador se generarán aleatoriamente entre 1 y 10.`,
  },
  {
    label: "Segundo equipo",
    description:
      "La cantidad de jugadores del segundo equipo está sujeta al primer equipo, los valores atribuidos a cada jugador se generarán aleatoriamente entre 1 y 10. ",
  },
  {
    label: "Verificar Equipos",
    description: `Revise los equipos generados antes de comenzar a jugar.`,
  },
];

function maxPoints(team1, team2) {
  const sortedTeam1 = [...team1].sort((a, b) => a - b);
  const sortedTeam2 = [...team2].sort((a, b) => a - b);

  let points = 0;
  let j = 0;

  for (let i = 0; i < sortedTeam1.length; i++) {
    if (sortedTeam1[i] > sortedTeam2[j]) {
      points++;
      j++;
    }
  }

  return { points, sortedTeam1 };
}

function calculateScore(team1, team2) {
  let points = 0;
  for (let i = 0; i < team1.length; i++) {
    if (team1[i] > team2[i]) {
      points++;
    }
  }
  return points;
}

function generateTeam(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 10) + 1);
}

export default function TeamPointsTask() {
  const [activeStep, setActiveStep] = useState(0);
  const [teamSize, setTeamSize] = useState(3);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [initialScore, setInitialScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [reorganizedTeam1, setReorganizedTeam1] = useState([]);

  const handleChange = (event) => {
    setTeamSize(event.target.value);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      const newTeam1 = generateTeam(teamSize);
      setTeam1(newTeam1);
      const newTeam2 = generateTeam(teamSize);
      setTeam2(newTeam2);
    } else if (activeStep === steps.length - 1) {
      const initialPoints = calculateScore(team1, team2);
      const { points: maxPointsPossible, sortedTeam1 } = maxPoints([...team1], [...team2]);
      setInitialScore(initialPoints);
      setMaxScore(maxPointsPossible);
      setReorganizedTeam1(sortedTeam1);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setTeam1([]);
    setTeam2([]);
    setInitialScore(0);
    setMaxScore(0);
    setReorganizedTeam1([]);
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
                  value={teamSize}
                  label="Número de jugadores"
                  onChange={handleChange}
                >
                  {[3, 4, 5, 6, 7].map((size) => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </Select>
              ) : null}
              <Typography>{step.description}</Typography>
              {index === 2 && (
                <>
                  <Typography>Equipo 1: {team1.join(", ")}</Typography>
                  <Typography>Equipo 2: {team2.join(", ")}</Typography>
                </>
              )}
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
                    Atrás
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>¡Resultados!</Typography>
          <br/>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ p: 2 }}>Equipos Iniciales</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Equipo 1</TableCell>
                  <TableCell>Equipo 2</TableCell>
                  <TableCell>Puntaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team1.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player}</TableCell>
                    <TableCell>{team2[index]}</TableCell>
                    <TableCell>{player > team2[index] ? 1 : 0}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>Puntuación inicial</TableCell>
                  <TableCell>{initialScore}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>Equipos Reorganizados</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Equipo 1</TableCell>
                  <TableCell>Equipo 2</TableCell>
                  <TableCell>Puntaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reorganizedTeam1.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player}</TableCell>
                    <TableCell>{team2[index]}</TableCell>
                    <TableCell>{player > team2[index] ? 1 : 0}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>Puntuación máxima posible</TableCell>
                  <TableCell>{maxScore}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reiniciar
          </Button>
        </Paper>
      )}
    </Box>
  );
}
