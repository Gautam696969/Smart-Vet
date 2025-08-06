import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../../shared/hooks/useAuthFetch";
import dayjs from "dayjs";

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authFetch = useAuthFetch();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    authFetch(`/api/appointments/${id}`)
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("Failed to fetch appointment");
        const data = await res.json();
        setAppointment(data);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <Paper elevation={2} className="w-full max-w-2xl p-6" sx={{ borderRadius: 4, background: "#fff" }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Appointment Details
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !appointment ? (
          <Typography>No appointment found.</Typography>
        ) : (
          <Box className="flex flex-col gap-4">
            <Typography>
              <b>Service:</b> {appointment.service}
            </Typography>
            <Typography>
              <b>Date/Time:</b>{" "}
              {appointment.scheduledAt
                ? dayjs(appointment.scheduledAt).format("YYYY-MM-DD HH:mm")
                : "-"}
            </Typography>
            <Typography>
              <b>Status:</b> {appointment.status}
            </Typography>
            <Typography>
              <b>Doctor:</b> {appointment.doctor?.name || appointment.doctor?.email || "-"}
            </Typography>
            <Typography>
              <b>Patient:</b> {appointment.patient?.name || appointment.patient?.email || "-"}
            </Typography>
            <Typography>
              <b>Timezone:</b> {appointment.timezone}
            </Typography>
            {/* Intake answers (if available) */}
            {appointment.intakeAnswers && (
              <Box>
                <Typography fontWeight={600}>Intake Answers:</Typography>
                <ul>
                  {Object.entries(appointment.intakeAnswers).map(([q, a]) => (
                    <li key={q}>
                      <b>{q}:</b>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
            {/* Uploaded files */}
            <Box>
              <Typography fontWeight={600}>Uploaded Files:</Typography>
              {appointment.uploads && appointment.uploads.length > 0 ? (
                <ul>
                  {appointment.uploads.map((file: any) => (
                    <li key={file.id}>
                      <Link href={file.fileUrl} target="_blank" rel="noopener">
                        {file.fileName}
                      </Link>{" "}
                      ({file.fileType})
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No files uploaded.</Typography>
              )}
            </Box>
            <Button variant="outlined" color="primary" href="/appointments/history">
              Back to History
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}