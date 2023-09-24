import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Typography,
  Chip,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Guest } from "../types";

interface GuestTableProps {
  guests: Guest[];
  removeGuest: (id: number) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, removeGuest }) => {
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);

  const isAllSelected = selectedGuests.length === guests.length;

  const toggleSelectAll = () => {
    setSelectedGuests(isAllSelected ? [] : guests.map((guest) => guest.id));
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedGuests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((guestId) => guestId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemoveSelectedGuests = () => {
    selectedGuests.forEach((id) => removeGuest(id));
    setSelectedGuests([]);
  };

  return (
    <Stack sx={{ width: { md: "70%" } }}>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Visitor management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
              <TableCell>
                <Checkbox
                  indeterminate={!isAllSelected && selectedGuests.length > 0}
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRemoveSelectedGuests}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={!isAllSelected && selectedGuests.length > 0}
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedGuests.includes(guest.id)}
                    onChange={() => handleCheckboxChange(guest.id)}
                  />
                </TableCell>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>
                  <Chip
                    label={guest.department}
                    color="default"
                    size="medium"
                    variant="filled"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default GuestTable;
