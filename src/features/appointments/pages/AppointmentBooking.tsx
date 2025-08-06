import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  Typography,
  LinearProgress,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useAuthFetch } from "../../../shared/hooks/useAuthFetch";

const steps = [
  "Select Date & Time",
  "Doctor & Slot",
  "Intake Questions",
  "Upload Documents",
  "Review & Confirm",
];

const timezones = [
  "UTC",
  "Asia/Calcutta",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
];

export default function AppointmentBooking() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [timezone, setTimezone] = useState("Asia/Calcutta");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [intakeQuestions, setIntakeQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [intakeAnswers, setIntakeAnswers] = useState<{ [key: number]: any }>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const authFetch = useAuthFetch();

  // Fetch doctors on mount
  useEffect(() => {
    setLoadingDoctors(true);
    authFetch("/api/users?role=doctor")
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        setDoctors(data.data || []);
      })
      .catch(() => setDoctors([]))
      .finally(() => setLoadingDoctors(false));
  }, []);

  // Fetch intake questions when doctor or service changes
  useEffect(() => {
    if (selectedDoctor) {
      setLoadingQuestions(true);
      // For demo, using a generic service name. Replace with actual service if needed.
      authFetch(`/api/intake-questions?service=general`)
        .then(async (res: Response) => {
          if (!res.ok) throw new Error("Failed to fetch intake questions");
          const data = await res.json();
          setIntakeQuestions(data || []);
        })
        .catch(() => setIntakeQuestions([]))
        .finally(() => setLoadingQuestions(false));
      // Fetch slots for the selected doctor
      authFetch(`/api/doctor-availability?doctorId=${selectedDoctor}`)
        .then(async (res: Response) => {
          if (!res.ok) throw new Error("Failed to fetch slots");
          const data = await res.json();
          // Map slots to time strings
          const slotList = (data || []).map(
            (a: any) => `${a.startTime} - ${a.endTime} (${a.weekday})`
          );
          setSlots(slotList);
        })
        .catch(() => setSlots([]));
    }
  }, [selectedDoctor]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleIntakeChange = (id: number, value: any) => {
    setIntakeAnswers({ ...intakeAnswers, [id]: value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      // 1. Create appointment
      const appointmentRes = await authFetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          service: "general", // Replace with actual service if needed
          scheduledAt: selectedDate?.toISOString(),
          timezone,
        }),
      });
      if (!appointmentRes.ok) throw new Error("Failed to book appointment");
      const appointment = await appointmentRes.json();

      // 2. Upload files (if any)
      for (const file of uploadedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("appointmentId", appointment.id);
        formData.append("fileType", file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "pdf");
        await authFetch("/api/uploads", {
          method: "POST",
          body: formData,
        });
      }

      // 3. Optionally, submit intake answers (if backend supports)
      // Skipped for now; can be added if API is available

      setSubmitSuccess(true);
      setActiveStep(steps.length - 1);
    } catch (err: any) {
      setSubmitError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <Paper elevation={2} className="w-full max-w-2xl p-6" sx={{ borderRadius: 4, background: "#fff" }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Book Appointment
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={((activeStep + 1) / steps.length) * 100}
            sx={{ height: 8, borderRadius: 4, background: "#e0e7ef" }}
          />
        </Box>
        {submitError && <Alert severity="error">{submitError}</Alert>}
        {submitSuccess && <Alert severity="success">Appointment booked successfully!</Alert>}
        {/* Step Content */}
        {activeStep === 0 && (
          <Box className="flex flex-col gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={setSelectedDate}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
            <TextField
              select
              label="Timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              sx={{ width: "100%" }}
            >
              {timezones.map((tz) => (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        {activeStep === 1 && (
          <Box className="flex flex-col gap-4">
            {loadingDoctors ? (
              <CircularProgress />
            ) : (
              <TextField
                select
                label="Select Doctor"
                value={selectedDoctor ?? ""}
                onChange={(e) => {
                  setSelectedDoctor(Number(e.target.value));
                  setSelectedSlot(null);
                }}
                sx={{ width: "100%" }}
              >
                {doctors.map((doc) => (
                  <MenuItem key={doc.id} value={doc.id}>
                    {doc.name || doc.email}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {selectedDoctor && (
              <TextField
                select
                label="Available Slots"
                value={selectedSlot ?? ""}
                onChange={(e) => setSelectedSlot(e.target.value)}
                sx={{ width: "100%" }}
              >
                {slots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Box>
        )}
        {activeStep === 2 && (
          <Box className="flex flex-col gap-4">
            {loadingQuestions ? (
              <CircularProgress />
            ) : (
              intakeQuestions.map((q) =>
                q.type === "file" ? (
                  <Box key={q.id}>
                    <Typography fontWeight={500}>{q.label || q.question}</Typography>
                    <input
                      type="file"
                      accept="image/*,application/pdf,video/*"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </Box>
                ) : (
                  <TextField
                    key={q.id}
                    label={q.label || q.question}
                    value={intakeAnswers[q.id] || ""}
                    onChange={(e) => handleIntakeChange(q.id, e.target.value)}
                    fullWidth
                  />
                )
              )
            )}
          </Box>
        )}
        {activeStep === 3 && (
          <Box className="flex flex-col gap-4">
            <Typography fontWeight={500}>Upload Additional Documents</Typography>
            <input
              type="file"
              accept="image/*,application/pdf,video/*"
              multiple
              onChange={handleFileUpload}
            />
            <Box>
              {uploadedFiles.length > 0 && (
                <ul>
                  {uploadedFiles.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </Box>
          </Box>
        )}
        {activeStep === 4 && (
          <Box className="flex flex-col gap-4">
            <Typography fontWeight={600} color="primary">
              Review your booking details and submit.
            </Typography>
            <Typography>Date: {selectedDate?.format("YYYY-MM-DD")}</Typography>
            <Typography>Timezone: {timezone}</Typography>
            <Typography>
              Doctor: {doctors.find((d) => d.id === selectedDoctor)?.name || "-"}
            </Typography>
            <Typography>Slot: {selectedSlot || "-"}</Typography>
            <Typography>
              Intake Answers:
              <ul>
                {intakeQuestions
                  .filter((q) => q.type !== "file")
                  .map((q) => (
                    <li key={q.id}>
                      {q.label || q.question}: {intakeAnswers[q.id] || "-"}
                    </li>
                  ))}
              </ul>
            </Typography>
            <Typography>
              Uploaded Files: {uploadedFiles.length > 0 ? uploadedFiles.map((f) => f.name).join(", ") : "-"}
            </Typography>
          </Box>
        )}
        {/* Navigation Buttons */}
        <Box className="flex justify-between mt-6">
          <Button
            disabled={activeStep === 0 || submitting}
            onClick={handleBack}
            variant="outlined"
            color="primary"
          >
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="contained" color="primary" disabled={submitting}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
