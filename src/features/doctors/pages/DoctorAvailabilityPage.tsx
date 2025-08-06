import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  MenuItem,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthFetch } from "../../../shared/hooks/useAuthFetch";

const weekdays = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const timezones = [
  "UTC",
  "Asia/Calcutta",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
];

export default function DoctorAvailabilityPage() {
  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    weekday: 1,
    startTime: "09:00",
    endTime: "17:00",
    timezone: "Asia/Calcutta",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const authFetch = useAuthFetch();

  // Fetch current availabilities
  const fetchAvailabilities = () => {
    setLoading(true);
    authFetch("/api/doctor-availability")
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("Failed to fetch availability");
        const data = await res.json();
        setAvailabilities(data || []);
      })
      .catch(() => setAvailabilities([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await authFetch("/api/doctor-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add availability");
      setSuccess("Availability added");
      setForm({ ...form, startTime: "09:00", endTime: "17:00" });
      fetchAvailabilities();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await authFetch(`/api/doctor-availability/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete availability");
      setSuccess("Availability deleted");
      fetchAvailabilities();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <Paper elevation={2} className="w-full max-w-2xl p-6" sx={{ borderRadius: 4, background: "#fff" }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Doctor Availability Setup
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box className="flex flex-col gap-4 mb-6">
          <TextField
            select
            label="Weekday"
            name="weekday"
            value={form.weekday}
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            {weekdays.map((w) => (
              <MenuItem key={w.value} value={w.value}>
                {w.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Start Time"
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={handleChange}
            sx={{ width: "100%" }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />
          <TextField
            label="End Time"
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={handleChange}
            sx={{ width: "100%" }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />
          <TextField
            select
            label="Timezone"
            name="timezone"
            value={form.timezone}
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            {timezones.map((tz) => (
              <MenuItem key={tz} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : "Add Availability"}
          </Button>
        </Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Current Availabilities
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            {availabilities.length === 0 ? (
              <Typography>No availabilities set.</Typography>
            ) : (
              availabilities.map((a) => (
                <Box
                  key={a.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <Typography>
                    {weekdays.find((w) => w.value === a.weekday)?.label || a.weekday},{" "}
                    {a.startTime} - {a.endTime} ({a.timezone})
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(a.id)}
                    disabled={submitting}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}