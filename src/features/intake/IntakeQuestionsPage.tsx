import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthFetch } from "../../shared/hooks/useAuthFetch";

const questionTypes = [
  { value: "text", label: "Text" },
  { value: "select", label: "Select" },
  { value: "file", label: "File Upload" },
];

export default function IntakeQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    service: "",
    question: "",
    type: "text",
    options: "",
    isRequired: false,
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const authFetch = useAuthFetch();

  const fetchQuestions = () => {
    setLoading(true);
    authFetch("/api/intake-questions")
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setQuestions(data || []);
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handleAdd = async () => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await authFetch("/api/intake-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add question");
      setSuccess("Question added");
      setForm({
        service: "",
        question: "",
        type: "text",
        options: "",
        isRequired: false,
        order: 0,
      });
      fetchQuestions();
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
      const res = await authFetch(`/api/intake-questions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete question");
      setSuccess("Question deleted");
      fetchQuestions();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <Paper elevation={2} className="w-full max-w-3xl p-6" sx={{ borderRadius: 4, background: "#fff" }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Intake Questions Management
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box className="flex flex-col gap-4 mb-6">
          <TextField
            label="Service"
            name="service"
            value={form.service}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <TextField
            label="Question"
            name="question"
            value={form.question}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <TextField
            select
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            {questionTypes.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>
          {form.type === "select" && (
            <TextField
              label="Options (comma separated)"
              name="options"
              value={form.options}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={form.isRequired}
                onChange={handleSwitch}
                name="isRequired"
                color="primary"
              />
            }
            label="Required"
          />
          <TextField
            label="Order"
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : "Add Question"}
          </Button>
        </Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Current Intake Questions
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Options</TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>No questions found.</TableCell>
                  </TableRow>
                ) : (
                  questions.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell>{q.service}</TableCell>
                      <TableCell>{q.question}</TableCell>
                      <TableCell>{q.type}</TableCell>
                      <TableCell>{q.options}</TableCell>
                      <TableCell>{q.isRequired ? "Yes" : "No"}</TableCell>
                      <TableCell>{q.order}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(q.id)}
                          disabled={submitting}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}