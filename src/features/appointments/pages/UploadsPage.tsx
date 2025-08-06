import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Link,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const fileTypes = [
  { value: "", label: "All" },
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "pdf", label: "PDF" },
];

const UPLOADS_QUERY = gql`
  query Uploads($fileType: UploadFileType) {
    uploads(fileType: $fileType) {
      id
      fileName
      fileType
      fileUrl
      uploadedAt
      appointment {
        id
      }
    }
  }
`;

export default function UploadsPage() {
  const [fileType, setFileType] = useState("");
  const { data, loading, error, refetch } = useQuery(UPLOADS_QUERY, {
    variables: fileType ? { fileType: fileType.toUpperCase() } : {},
    fetchPolicy: "cache-and-network",
  });

  // Refetch when fileType changes
  React.useEffect(() => {
    refetch(fileType ? { fileType: fileType.toUpperCase() } : {});
    // eslint-disable-next-line
  }, [fileType]);

  const uploads = data?.uploads || [];

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <Paper elevation={2} className="w-full max-w-4xl p-6" sx={{ borderRadius: 4, background: "#fff" }}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Uploaded Files
        </Typography>
        <Box className="flex gap-4 mb-4">
          <TextField
            select
            label="File Type"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            {fileTypes.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Failed to load uploads.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Appointment</TableCell>
                  <TableCell>Uploaded At</TableCell>
                  <TableCell>Download/View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>No uploads found.</TableCell>
                  </TableRow>
                ) : (
                  uploads.map((u: any) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.fileName}</TableCell>
                      <TableCell>{u.fileType}</TableCell>
                      <TableCell>{u.appointment?.id || "-"}</TableCell>
                      <TableCell>
                        {u.uploadedAt
                          ? new Date(u.uploadedAt).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Link href={u.fileUrl} target="_blank" rel="noopener">
                          View
                        </Link>
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