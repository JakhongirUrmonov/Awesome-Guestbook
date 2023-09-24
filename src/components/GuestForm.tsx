import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Guest } from "../types";

interface GuestFormProps {
  addGuest: (guest: Guest) => void;
  uniqueEmails: Set<string>;
}

const GuestForm: React.FC<GuestFormProps> = ({ addGuest, uniqueEmails }) => {
  const initialGuest = { id: 0, name: "", email: "", department: "Marketing" };
  const departmentOptions = ["Marketing", "IT", "Sales", "Management"];
  const [guest, setGuest] = useState(initialGuest);
  const [agree, setAgree] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the email is already in use
    if (uniqueEmails.has(guest.email)) {
      setEmailError(true);
      return;
    }
    if (!guest.name || !guest.email || !agree) return;

    // Add the guest and update the set of unique emails
    addGuest(guest);
    uniqueEmails.add(guest.email);

    resetForm();
  };
  const resetForm = () => {
    setGuest(initialGuest);
    setAgree(false);
    setEmailError(false);
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    const { name, value } = e.target;
    setGuest((prevGuest) => ({ ...prevGuest, [name]: value }));
  };
  return (
    <Stack
      component={"form"}
      onSubmit={handleSubmit}
      sx={{ width: { md: "30%" }, gap: "24px" }}
    >
      <Typography variant="h6">Add new visitor</Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        required
        name="name"
        value={guest.name}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        required
        type="email"
        name="email"
        value={guest.email}
        onChange={(e) => handleChange(e)}
        error={emailError}
        helperText={emailError ? "Email must be unique" : ""}
      />
      <FormControl fullWidth variant="outlined" required>
        <InputLabel>Department</InputLabel>
        <Select
          value={guest.department}
          onChange={(e) => handleChange(e)}
          label="Department"
          name="department"
        >
          {departmentOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
        }
        label="I agree to be added to the table"
      />
      <Stack sx={{ flexDirection: "row", gap: "24px" }}>
        <Button
          onClick={resetForm}
          variant="outlined"
          sx={{ flex: "0 0 auto" }}
        >
          Reset Form
        </Button>
        <Button type="submit" variant="contained" sx={{ flex: 1 }}>
          Add new visitor
        </Button>
      </Stack>
    </Stack>
  );
};

export default GuestForm;
