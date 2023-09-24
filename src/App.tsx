import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import GuestForm from "./components/GuestForm";
import GuestTable from "./components/GuestTable";
import Header from "./components/Header";
import { Guest } from "./types";

const LOCAL_STORAGE_KEY = "guests";
const INITIAL_GUEST_ID = 1;

const App: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestIdCounter, setGuestIdCounter] = useState(INITIAL_GUEST_ID);
  const [uniqueEmails, setUniqueEmails] = useState(new Set<string>());

  useEffect(() => {
    try {
      const savedGuests = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      ) as Guest[];
      if (savedGuests) {
        setGuests(savedGuests);
        setUniqueEmails(new Set(savedGuests.map((guest) => guest.email)));
      }
    } catch (error) {
      console.error("Error parsing saved guests:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guests));
  }, [guests]);

  const addGuest = (guest: Guest) => {
    const newGuest = { ...guest, id: guestIdCounter };
    setGuests((prevGuests) => [...prevGuests, newGuest]);
    setGuestIdCounter((prevId) => prevId + 1);
    setUniqueEmails((prevEmails) => new Set([...prevEmails, guest.email]));
  };

  const removeGuest = (id: number) => {
    const updatedGuests = guests.filter((guest) => guest.id !== id);
    const removedGuest = guests.find((guest) => guest.id === id);

    if (removedGuest) {
      setUniqueEmails((prevUniqueEmails) => {
        prevUniqueEmails.delete(removedGuest.email);
        return new Set(prevUniqueEmails);
      });

      setGuests(updatedGuests);
    }
  };

  return (
    <Stack>
      <Header />
      <Stack
        sx={{ flexDirection: { md: "row" }, padding: "26px 24px", gap: "24px" }}
      >
        <GuestForm addGuest={addGuest} uniqueEmails={uniqueEmails} />
        <GuestTable guests={guests} removeGuest={removeGuest} />
      </Stack>
    </Stack>
  );
};

export default App;
