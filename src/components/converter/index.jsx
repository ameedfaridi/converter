import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";

const API_KEY = "2fde966c023c92e5aa1a4cb8";

export default function ControllableStates() {
  const [base, setBase] = useState("INR");
  const [target, setTarget] = useState("USD");
  const [enteredAmout, setEnteredAmount] = useState("1");
  const [resultedAmount, setResultedAmout] = useState("");
  const [date, setDate] = useState("");

  const currency = [
    "USD",
    "INR",
    "AED",
    "GBP",
    "CAD",
    "SGD",
    "EUR",
    "JPY",
    "PKR",
    "ZAR",
    "ALL",
  ];

  useEffect(() => {
    calculator();
  }, [base, target, enteredAmout]);

  const calculator = async () => {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
    );
    const result = await res.json();
    const date = result.time_last_update_utc?.split("+");
    const rate = result.conversion_rates[target];
    console.log("base:", base, "target:", target);
    console.log(rate);
    const total = (enteredAmout * rate).toFixed(4);
    setResultedAmout(total);
    setDate(date);
  };

  return (
    <div style={{ padding: "20px", width: "35vw" }}>
      <Paper elevation={3}>
        <Box padding="20px">
          <Box display="grid" justifyContent="center">
            <Box>
              <Typography variant="h4" color="textSecondary">
                {enteredAmout || 0} {base} is equals
              </Typography>
              <Typography variant="h4" color="textSecondary">
                to {resultedAmount != NaN ? resultedAmount : 0}
                {resultedAmount != NaN ? target : 0}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {date}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <TextField
              required
              id="outlined-required"
              label="Amount"
              variant="outlined"
              autoComplete="off"
              type="number"
              onChange={(e) => setEnteredAmount(e.target.value)}
              value={enteredAmout}
              style={{ margin: "1rem 0" }}
            />
            <FormControl
              variant="outlined"
              style={{ marginLeft: "1rem", width: "100px" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Currency
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                label="Age"
              >
                {currency.map((cur) => {
                  return (
                    <MenuItem value={cur} key={cur}>
                      {cur}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <TextField
              required
              type="number"
              id="outlined-required"
              label="Amount"
              variant="outlined"
              autoComplete="off"
              disabled={true}
            />
            <FormControl
              variant="outlined"
              style={{ marginLeft: "1rem", width: "100px" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Currency
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                label="Age"
              >
                {currency.map((cur) => {
                  return (
                    <MenuItem value={cur} key={cur}>
                      {cur}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
